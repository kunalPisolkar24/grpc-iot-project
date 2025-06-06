import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';
import * as path from 'path';
import { DeviceManagementServiceClient } from './proto_gen/iot_service_grpc_pb';
import {
    DeviceStatusRequest,
    DeviceStatusResponse,
    DeviceCommandRequest,
    CommandAcknowledgement
} from './proto_gen/iot_service_pb';

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || 'py-server:50051';
const CA_CERT_PATH = path.join(__dirname, '..', 'certs', 'server.crt');

let clientCredentials;
try {
    const rootCa = fs.readFileSync(CA_CERT_PATH);
    clientCredentials = grpc.credentials.createSsl(rootCa);
    console.log(`NODE_CLIENT_TS (MgmtConsole): Loaded CA certificate from ${CA_CERT_PATH} for secure connection.`);
} catch (error) {
    const err = error as Error;
    console.error(`NODE_CLIENT_TS (MgmtConsole): Failed to load CA certificate at ${CA_CERT_PATH}. Error: ${err.message}. Falling back to insecure (NOT RECOMMENDED).`);
    clientCredentials = grpc.credentials.createInsecure();
}

const client = new DeviceManagementServiceClient(
    SERVER_ADDRESS,
    clientCredentials
);

function getDeviceStatus(deviceId: string): void {
    console.log(`NODE_CLIENT_TS (MgmtConsole): Requesting status for device: ${deviceId}`);
    const request = new DeviceStatusRequest();
    request.setDeviceId(deviceId);

    client.getDeviceStatus(request, { deadline: getDeadline(5) }, (error: grpc.ServiceError | null, response: DeviceStatusResponse) => {
        if (error) {
            console.error(`NODE_CLIENT_TS (MgmtConsole): GetDeviceStatus Error for ${deviceId}: ${error.details || error.message}`);
            return;
        }
        console.log(`NODE_CLIENT_TS (MgmtConsole): GetDeviceStatus Response for ${deviceId}: Status - ${response.getStatus()}, Uptime - ${response.getUptimeSeconds()}s`);
    });
}

function sendCommand(deviceId: string, commandName: string, payload: object): void {
    console.log(`NODE_CLIENT_TS (MgmtConsole): Sending command '${commandName}' to device: ${deviceId} with payload:`, payload);
    const request = new DeviceCommandRequest();
    request.setDeviceId(deviceId);
    request.setCommandName(commandName);
    request.setPayloadJson(JSON.stringify(payload));

    client.sendCommandToDevice(request, { deadline: getDeadline(5) }, (error: grpc.ServiceError | null, response: CommandAcknowledgement) => {
        if (error) {
            console.error(`NODE_CLIENT_TS (MgmtConsole): SendCommand Error for ${deviceId}, command ${commandName}: ${error.details || error.message}`);
            return;
        }
        console.log(`NODE_CLIENT_TS (MgmtConsole): SendCommand Response for ${deviceId}, command ${commandName}: Received - ${response.getReceived()}, Message - "${response.getMessage()}"`);
    });
}

function getDeadline(seconds: number = 5): Date {
    return new Date(Date.now() + seconds * 1000);
}

function mainManagementConsole(): void {
    const targetDeviceId = process.argv[2] || (process.env.TARGET_DEVICE_ID || "fixed-ts-device-001");
    const action = process.argv[3] || "status";
    const commandName = process.argv[4] || "SECURE_REBOOT";
    const commandPayload = { reason: "Secure scheduled maintenance", initiated_by: "mgmt_console_ts_secure" };

    console.log(`NODE_CLIENT_TS (MgmtConsole): SECURE Console targeting device: ${targetDeviceId}. Connecting to server at ${SERVER_ADDRESS}`);

    if (action === "status") {
        getDeviceStatus(targetDeviceId);
    } else if (action === "command") {
        sendCommand(targetDeviceId, commandName, commandPayload);
    } else {
        console.log(`NODE_CLIENT_TS (MgmtConsole): Unknown action '${action}'. Use 'status' or 'command <commandName>'.`);
    }
}

console.log(`NODE_CLIENT_TS (MgmtConsole): Initializing SECURE client...`);
setTimeout(mainManagementConsole, 2500);
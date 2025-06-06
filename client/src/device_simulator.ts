import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';
import * as path from 'path';
import { DeviceManagementServiceClient } from './proto_gen/iot_service_grpc_pb';
import {
    DeviceRegistrationRequest,
    DeviceRegistrationResponse,
    DeviceStatusRequest,
    DeviceStatusResponse,
    TelemetryDataPoint,
    BulkUploadSummary
} from './proto_gen/iot_service_pb';

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || 'py-server:50051';
const CA_CERT_PATH = path.join(__dirname, '..', 'certs', 'server.crt');

let clientCredentials;
try {
    const rootCa = fs.readFileSync(CA_CERT_PATH);
    clientCredentials = grpc.credentials.createSsl(rootCa);
    console.log(`NODE_CLIENT_TS (DeviceSim): Loaded CA certificate from ${CA_CERT_PATH} for secure connection.`);
} catch (error) {
    const err = error as Error;
    console.error(`NODE_CLIENT_TS (DeviceSim): Failed to load CA certificate at ${CA_CERT_PATH}. Error: ${err.message}. Falling back to insecure (NOT RECOMMENDED).`);
    clientCredentials = grpc.credentials.createInsecure();
}

const client = new DeviceManagementServiceClient(
    SERVER_ADDRESS,
    clientCredentials
);

function registerDevice(deviceId: string, deviceType: string, callback?: () => void): void {
    console.log(`NODE_CLIENT_TS (DeviceSim): Attempting to register device: ${deviceId} of type ${deviceType}`);
    const request = new DeviceRegistrationRequest();
    request.setDeviceId(deviceId);
    request.setDeviceType(deviceType);

    client.registerDevice(request, { deadline: getDeadline(10) }, (error: grpc.ServiceError | null, response: DeviceRegistrationResponse) => {
        if (error) {
            console.error(`NODE_CLIENT_TS (DeviceSim): RegisterDevice Error for ${deviceId}: ${error.details || error.message} (Code: ${error.code})`);
            if (error.code === grpc.status.UNAVAILABLE || error.code === grpc.status.DEADLINE_EXCEEDED) {
                console.log(`NODE_CLIENT_TS (DeviceSim): Server unavailable or deadline exceeded, retrying registration for ${deviceId} in 5s...`);
                setTimeout(() => registerDevice(deviceId, deviceType, callback), 5000);
            }
            return;
        }
        console.log(`NODE_CLIENT_TS (DeviceSim): RegisterDevice Response for ${deviceId}: Success - ${response.getSuccess()}, Message - "${response.getMessage()}"`);

        if (response.getSuccess()) {
            console.log(`NODE_CLIENT_TS (DeviceSim): Successfully registered. Token: ${response.getServerAssignedToken()}`);
            if (callback) {
                callback();
            }
        }
    });
}

function getOwnStatus(deviceId: string): void {
    console.log(`NODE_CLIENT_TS (DeviceSim): Requesting own status for device: ${deviceId}`);
    const request = new DeviceStatusRequest();
    request.setDeviceId(deviceId);

    client.getDeviceStatus(request, { deadline: getDeadline(5) }, (error: grpc.ServiceError | null, response: DeviceStatusResponse) => {
        if (error) {
            console.error(`NODE_CLIENT_TS (DeviceSim): GetOwnStatus Error for ${deviceId}: ${error.details || error.message}`);
            return;
        }
        console.log(`NODE_CLIENT_TS (DeviceSim): GetOwnStatus Response for ${deviceId}: Status - ${response.getStatus()}, Uptime - ${response.getUptimeSeconds()}s`);
    });
}

function getDeadline(seconds: number = 5): Date {
    return new Date(Date.now() + seconds * 1000);
}

function uploadBulkTelemetryData(deviceId: string): void {
    console.log(`NODE_CLIENT_TS (DeviceSim): Starting bulk telemetry upload for device: ${deviceId}`);

    const call = client.uploadBulkTelemetry((error: grpc.ServiceError | null, summary: BulkUploadSummary) => {
        if (error) {
            console.error(`NODE_CLIENT_TS (DeviceSim): Bulk Telemetry Upload Error for ${deviceId}: ${error.message}`);
            return;
        }
        console.log(`NODE_CLIENT_TS (DeviceSim): Bulk Telemetry Upload Summary for ${deviceId}:`);
        console.log(`  Points Received: ${summary.getPointsReceived()}`);
        console.log(`  Points Failed: ${summary.getPointsFailed()}`);
        console.log(`  Message: "${summary.getMessage()}"`);
    });

    const dataPointsToSend = [
        { sensor_id: "internal_temp", value: 35.5, metadata: {"location": "cpu_socket"} },
        { sensor_id: "fan_speed", value: 1200.0, metadata: {"unit": "rpm"} },
        { sensor_id: "voltage_rail", value: 12.1, metadata: {"rail_id": "vcore"} }
    ];

    dataPointsToSend.forEach((dp, index) => {
        setTimeout(() => {
            const telemetryPoint = new TelemetryDataPoint();
            telemetryPoint.setDeviceId(deviceId);
            telemetryPoint.setTimestampMs(Date.now());
            telemetryPoint.setSensorId(dp.sensor_id);
            telemetryPoint.setValue(dp.value);
            
            const metadataMap = telemetryPoint.getMetadataMap();
            for (const key in dp.metadata) {
                metadataMap.set(key, (dp.metadata as any)[key]);
            }

            console.log(`NODE_CLIENT_TS (DeviceSim): Sending bulk data point ${index + 1}/${dataPointsToSend.length} for ${deviceId}: ${dp.sensor_id}`);
            call.write(telemetryPoint);

            if (index === dataPointsToSend.length - 1) {
                console.log(`NODE_CLIENT_TS (DeviceSim): Finished sending all bulk data points for ${deviceId}. Closing stream.`);
                call.end();
            }
        }, index * 500);
    });
}

function mainDeviceSimulator(): void {
    const deviceId = process.env.DEVICE_ID || `node-ts-secure-sim-${Math.floor(Math.random() * 1000)}`;
    const deviceType = "NodeJSTSSensorV3_Secure_Bulk";

    console.log(`NODE_CLIENT_TS (DeviceSim): Starting SECURE device simulator with ID: ${deviceId}. Connecting to server at ${SERVER_ADDRESS}`);
    
    registerDevice(deviceId, deviceType, () => {
        setTimeout(() => getOwnStatus(deviceId), 1000);
        setTimeout(() => uploadBulkTelemetryData(deviceId), 3000);
    });
}

console.log(`NODE_CLIENT_TS (DeviceSim): Initializing SECURE client...`);
setTimeout(mainDeviceSimulator, 2000);
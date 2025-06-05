import * as grpc from "@grpc/grpc-js";
import { DeviceManagementServiceClient } from "./proto_gen/iot_service_grpc_pb";
import {
  DeviceStatusRequest,
  DeviceStatusResponse,
  DeviceCommandRequest,
  CommandAcknowledgement,
} from "./proto_gen/iot_service_pb";

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "localhost:50051";

const client = new DeviceManagementServiceClient(
  SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);

function getDeviceStatus(deviceId: string): void {
  console.log(
    `NODE_CLIENT_TS (MgmtConsole): Requesting status for device: ${deviceId}`
  );
  const request = new DeviceStatusRequest();
  request.setDeviceId(deviceId);

  client.getDeviceStatus(
    request,
    { deadline: getDeadline(5) },
    (error: grpc.ServiceError | null, response: DeviceStatusResponse) => {
      if (error) {
        console.error(
          `NODE_CLIENT_TS (MgmtConsole): GetDeviceStatus Error for ${deviceId}: ${
            error.details || error.message
          }`
        );
        return;
      }
      console.log(
        `NODE_CLIENT_TS (MgmtConsole): GetDeviceStatus Response for ${deviceId}: Status - ${response.getStatus()}, Uptime - ${response.getUptimeSeconds()}s`
      );
    }
  );
}

function sendCommand(
  deviceId: string,
  commandName: string,
  payload: object
): void {
  console.log(
    `NODE_CLIENT_TS (MgmtConsole): Sending command '${commandName}' to device: ${deviceId} with payload:`,
    payload
  );
  const request = new DeviceCommandRequest();
  request.setDeviceId(deviceId);
  request.setCommandName(commandName);
  request.setPayloadJson(JSON.stringify(payload));

  client.sendCommandToDevice(
    request,
    { deadline: getDeadline(5) },
    (error: grpc.ServiceError | null, response: CommandAcknowledgement) => {
      if (error) {
        console.error(
          `NODE_CLIENT_TS (MgmtConsole): SendCommand Error for ${deviceId}, command ${commandName}: ${
            error.details || error.message
          }`
        );
        return;
      }
      console.log(
        `NODE_CLIENT_TS (MgmtConsole): SendCommand Response for ${deviceId}, command ${commandName}: Received - ${response.getReceived()}, Message - "${response.getMessage()}"`
      );
    }
  );
}

function getDeadline(seconds: number = 5): Date {
  return new Date(Date.now() + seconds * 1000);
}

function mainManagementConsole(): void {
  const targetDeviceId =
    process.argv[2] ||
    process.env.TARGET_DEVICE_ID ||
    "node-ts-sim-device-fixed";
  const action = process.argv[3] || "status";
  const commandName = process.argv[4] || "REBOOT_TS";
  const commandPayload = {
    reason: "Scheduled TS maintenance",
    initiated_by: "mgmt_console_ts",
  };

  console.log(
    `NODE_CLIENT_TS (MgmtConsole): Console targeting device: ${targetDeviceId}. Connecting to server at ${SERVER_ADDRESS}`
  );

  if (action === "status") {
    getDeviceStatus(targetDeviceId);
  } else if (action === "command") {
    sendCommand(targetDeviceId, commandName, commandPayload);
  } else {
    console.log(
      `NODE_CLIENT_TS (MgmtConsole): Unknown action '${action}'. Use 'status' or 'command <commandName>'.`
    );
  }
}

console.log(`NODE_CLIENT_TS (MgmtConsole): Initializing...`);
setTimeout(mainManagementConsole, 2500);

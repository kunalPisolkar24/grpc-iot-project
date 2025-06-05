import * as grpc from "@grpc/grpc-js";
import { DeviceManagementServiceClient } from "./proto_gen/iot_service_grpc_pb";
import {
  DeviceRegistrationRequest,
  DeviceRegistrationResponse,
  DeviceStatusRequest,
  DeviceStatusResponse,
} from "./proto_gen/iot_service_pb";

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "localhost:50051";

const client = new DeviceManagementServiceClient(
  SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);

function registerDevice(deviceId: string, deviceType: string): void {
  console.log(
    `NODE_CLIENT_TS (DeviceSim): Attempting to register device: ${deviceId} of type ${deviceType}`
  );
  const request = new DeviceRegistrationRequest();
  request.setDeviceId(deviceId);
  request.setDeviceType(deviceType);

  client.registerDevice(
    request,
    { deadline: getDeadline(5) },
    (error: grpc.ServiceError | null, response: DeviceRegistrationResponse) => {
      if (error) {
        console.error(
          `NODE_CLIENT_TS (DeviceSim): RegisterDevice Error for ${deviceId}: ${
            error.details || error.message
          } (Code: ${error.code})`
        );
        if (
          error.code === grpc.status.UNAVAILABLE ||
          error.code === grpc.status.DEADLINE_EXCEEDED
        ) {
          console.log(
            `NODE_CLIENT_TS (DeviceSim): Server unavailable or deadline exceeded, retrying registration for ${deviceId} in 5s...`
          );
          setTimeout(() => registerDevice(deviceId, deviceType), 5000);
        }
        return;
      }
      console.log(
        `NODE_CLIENT_TS (DeviceSim): RegisterDevice Response for ${deviceId}: Success - ${response.getSuccess()}, Message - "${response.getMessage()}"`
      );

      if (response.getSuccess()) {
        console.log(
          `NODE_CLIENT_TS (DeviceSim): Successfully registered. Token: ${response.getServerAssignedToken()}`
        );
        setTimeout(() => getOwnStatus(deviceId), 1000);
      }
    }
  );
}

function getOwnStatus(deviceId: string): void {
  console.log(
    `NODE_CLIENT_TS (DeviceSim): Requesting own status for device: ${deviceId}`
  );
  const request = new DeviceStatusRequest();
  request.setDeviceId(deviceId);

  client.getDeviceStatus(
    request,
    { deadline: getDeadline(5) },
    (error: grpc.ServiceError | null, response: DeviceStatusResponse) => {
      if (error) {
        console.error(
          `NODE_CLIENT_TS (DeviceSim): GetOwnStatus Error for ${deviceId}: ${
            error.details || error.message
          }`
        );
        return;
      }
      console.log(
        `NODE_CLIENT_TS (DeviceSim): GetOwnStatus Response for ${deviceId}: Status - ${response.getStatus()}, Uptime - ${response.getUptimeSeconds()}s`
      );
    }
  );
}

function getDeadline(seconds: number = 5): Date {
  return new Date(Date.now() + seconds * 1000);
}

function mainDeviceSimulator(): void {
  const deviceId =
    process.env.DEVICE_ID ||
    `node-ts-sim-device-${Math.floor(Math.random() * 1000)}`;
  const deviceType = "NodeJSTSSensorV3";

  console.log(
    `NODE_CLIENT_TS (DeviceSim): Starting device simulator with ID: ${deviceId}. Connecting to server at ${SERVER_ADDRESS}`
  );
  registerDevice(deviceId, deviceType);
}

console.log(`NODE_CLIENT_TS (DeviceSim): Initializing...`);
setTimeout(mainDeviceSimulator, 2000);

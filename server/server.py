import grpc
from concurrent import futures
import time

import iot_service_pb2 # type: ignore
import iot_service_pb2_grpc # type: ignore

registered_devices = {}

class DeviceManagementServiceImpl(iot_service_pb2_grpc.DeviceManagementServiceServicer):
    def RegisterDevice(self, request, context):
        print(f"PY_SERVER: Received RegisterDevice request for device_id: {request.device_id}")
        if not request.device_id:
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            context.set_details("Device ID cannot be empty.")
            print(f"PY_SERVER: Invalid argument - Device ID empty.")
            return iot_service_pb2.DeviceRegistrationResponse()

        if request.device_id in registered_devices:
            message = f"Device {request.device_id} already registered."
            print(f"PY_SERVER: {message}")
            return iot_service_pb2.DeviceRegistrationResponse(
                success=False,
                message=message
            )

        registered_devices[request.device_id] = {
            "type": request.device_type,
            "status": "ONLINE",
            "registered_at": time.time()
        }
        token = f"token_{request.device_id}_{int(time.time())}"
        message = f"Device {request.device_id} registered successfully with token {token}."
        print(f"PY_SERVER: {message}")
        return iot_service_pb2.DeviceRegistrationResponse(
            success=True,
            message=message,
            server_assigned_token=token
        )

    def GetDeviceStatus(self, request, context):
        print(f"PY_SERVER: Received GetDeviceStatus request for: {request.device_id}")
        if not request.device_id:
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            context.set_details("Device ID cannot be empty.")
            print(f"PY_SERVER: Invalid argument - Device ID empty.")
            return iot_service_pb2.DeviceStatusResponse()

        device_info = registered_devices.get(request.device_id)
        if device_info:
            uptime = int(time.time() - device_info.get("registered_at", time.time()))
            status_message = f"Status for {request.device_id}: {device_info.get('status', 'UNKNOWN')}, Uptime: {uptime}s."
            print(f"PY_SERVER: {status_message}")
            return iot_service_pb2.DeviceStatusResponse(
                device_id=request.device_id,
                status=device_info.get("status", "UNKNOWN"),
                uptime_seconds=uptime
            )
        else:
            message = f"Device {request.device_id} not found."
            print(f"PY_SERVER: {message}")
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(message)
            return iot_service_pb2.DeviceStatusResponse()

    def SendCommandToDevice(self, request, context):
        print(f"PY_SERVER: Received SendCommandToDevice for {request.device_id}, Command: {request.command_name}")
        if not request.device_id:
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            context.set_details("Device ID cannot be empty.")
            print(f"PY_SERVER: Invalid argument - Device ID empty.")
            return iot_service_pb2.CommandAcknowledgement()

        if request.device_id not in registered_devices:
            message = f"Device {request.device_id} not found to send command."
            print(f"PY_SERVER: {message}")
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(message)
            return iot_service_pb2.CommandAcknowledgement(received=False, message=message)

        ack_message = f"Command '{request.command_name}' acknowledged by server for device {request.device_id}. Payload: {request.payload_json}"
        print(f"PY_SERVER: {ack_message}")
        return iot_service_pb2.CommandAcknowledgement(
            received=True,
            message=ack_message
        )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    iot_service_pb2_grpc.add_DeviceManagementServiceServicer_to_server(
        DeviceManagementServiceImpl(), server
    )
    server.add_insecure_port('[::]:50051')
    print("PY_SERVER: Python gRPC server started on port 50051...")
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
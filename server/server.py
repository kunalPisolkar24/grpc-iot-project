import grpc
from concurrent import futures
import time
import random

import iot_service_pb2 # type: ignore
import iot_service_pb2_grpc # type: ignore

SERVER_CERTIFICATE_PATH = '/app/certs/server.crt'
SERVER_PRIVATE_KEY_PATH = '/app/certs/server.key'

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
            "registered_at": time.time(),
            "telemetry_subscribers": []
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

    def SubscribeToDeviceTelemetry(self, request, context):
        device_id = request.device_id
        print(f"PY_SERVER: Client subscribed to telemetry for device: {device_id}")

        if device_id not in registered_devices:
            print(f"PY_SERVER: Device {device_id} not found for telemetry subscription.")
            context.set_code(grpc.StatusCode.NOT_FOUND)
            context.set_details(f"Device {device_id} not found for telemetry.")
            return iot_service_pb2.TelemetryDataPoint()

        try:
            for i in range(10):
                if not context.is_active():
                    print(f"PY_SERVER: Client for {device_id} telemetry disconnected.")
                    break

                temperature = 20 + random.uniform(-2, 2) + i * 0.5
                humidity = 50 + random.uniform(-5, 5) - i * 0.3

                temp_point = iot_service_pb2.TelemetryDataPoint(
                    device_id=device_id,
                    timestamp_ms=int(time.time() * 1000),
                    sensor_id="temperature_sensor_01",
                    value=round(temperature, 2),
                    metadata={"unit": "celsius", "location": "server_room"}
                )
                print(f"PY_SERVER: Streaming temp: {temp_point.value} for {device_id}")
                yield temp_point
                time.sleep(0.5)

                if not context.is_active():
                    print(f"PY_SERVER: Client for {device_id} telemetry disconnected.")
                    break

                humidity_point = iot_service_pb2.TelemetryDataPoint(
                    device_id=device_id,
                    timestamp_ms=int(time.time() * 1000),
                    sensor_id="humidity_sensor_01",
                    value=round(humidity, 2),
                    metadata={"unit": "%", "location": "server_room"}
                )
                print(f"PY_SERVER: Streaming humidity: {humidity_point.value} for {device_id}")
                yield humidity_point
                time.sleep(1.5)

            print(f"PY_SERVER: Finished streaming telemetry for {device_id}")
        except grpc.RpcError as e:
            print(f"PY_SERVER: RPC error during telemetry streaming for {device_id}: {e}")
        except Exception as e:
            print(f"PY_SERVER: Unexpected error during telemetry streaming for {device_id}: {e}")
            context.abort(grpc.StatusCode.INTERNAL, "Unexpected error during telemetry streaming.")
        finally:
            print(f"PY_SERVER: Telemetry stream for {device_id} concluded.")

    def UploadBulkTelemetry(self, request_iterator, context):
        print("PY_SERVER: Received call for UploadBulkTelemetry.")
        points_received_count = 0
        points_failed_count = 0
        processed_device_ids = set()

        for data_point in request_iterator:
            if not data_point.device_id or not data_point.sensor_id:
                print(f"PY_SERVER: Invalid data point received (missing device_id or sensor_id), skipping.")
                points_failed_count += 1
                continue

            print(f"PY_SERVER: Processing bulk telemetry for {data_point.device_id} - Sensor: {data_point.sensor_id}, Value: {data_point.value}")
            points_received_count += 1
            processed_device_ids.add(data_point.device_id)

        summary_message = f"Processed bulk telemetry for devices: {', '.join(list(processed_device_ids)) if processed_device_ids else 'None'}."
        print(f"PY_SERVER: Bulk upload finished. {summary_message} Received: {points_received_count}, Failed: {points_failed_count}")
        return iot_service_pb2.BulkUploadSummary(
            points_received=points_received_count,
            points_failed=points_failed_count,
            message=summary_message
        )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    iot_service_pb2_grpc.add_DeviceManagementServiceServicer_to_server(
        DeviceManagementServiceImpl(), server
    )

    try:
        with open(SERVER_PRIVATE_KEY_PATH, 'rb') as f:
            private_key = f.read()
        with open(SERVER_CERTIFICATE_PATH, 'rb') as f:
            certificate_chain = f.read()
    except FileNotFoundError as e:
        print(f"Fatal Error: SSL certificate files not found. {e}")
        print(f"Ensure '{SERVER_PRIVATE_KEY_PATH}' and '{SERVER_CERTIFICATE_PATH}' are correctly copied into the container.")
        return

    server_credentials = grpc.ssl_server_credentials(
        ((private_key, certificate_chain),)
    )

    server.add_secure_port('[::]:50051', server_credentials)
    print("PY_SERVER: Python gRPC server started securely on port 50051...")
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
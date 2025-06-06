FROM python:3.9-slim as builder

WORKDIR /app_build

RUN pip install grpcio grpcio-tools

COPY proto/iot_service.proto ./proto/

RUN python -m grpc_tools.protoc -I./proto --python_out=. --grpc_python_out=. ./proto/iot_service.proto

FROM python:3.9-slim

WORKDIR /app

COPY server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --from=builder /app_build/iot_service_pb2.py .
COPY --from=builder /app_build/iot_service_pb2_grpc.py .

COPY server/server.py .
COPY certs ./certs/

EXPOSE 50051

CMD ["python", "server.py"]
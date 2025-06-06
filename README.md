# gRPC IoT Platform 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive demonstration project showcasing all four gRPC communication patterns (Unary, Server Streaming, Client Streaming, Bidirectional Streaming) using a Python server and TypeScript (Node.js) clients. The entire setup is containerized with Docker and orchestrated with Docker Compose, featuring secure communication via TLS.

This project serves as an excellent learning resource for understanding practical gRPC implementation, cross-language service development, and secure microservice communication.

## ✨ Features

*   **All 4 gRPC Communication Patterns:**
    *   **Unary:** Device Registration, Status Checks, Simple Commands.
    *   **Server Streaming:** Real-time Telemetry Subscription.
    *   **Client Streaming:** Bulk Telemetry Upload from devices.
    *   **Bidirectional Streaming:** Interactive Device Sessions (real-time commands and status updates).
*   **Secure Communication:** Implements TLS for encrypted client-server communication using self-signed certificates.
*   **Cross-Language:**
    *   Python gRPC Server
    *   TypeScript (Node.js) gRPC Clients
*   **Containerized:** Fully Dockerized services for consistent environments and easy setup.
*   **Orchestrated:** Uses Docker Compose to manage and run the multi-container application.
*   **Modern Tooling:** Utilizes Protocol Buffers for service definition and type generation.

## 🛠️ Tech Stack

*   **gRPC:** Core communication framework.
*   **Protocol Buffers:** Interface Definition Language.
*   **Python:** For the gRPC server.
    *   `grpcio`, `grpcio-tools`
*   **Node.js & TypeScript:** For the gRPC clients.
    *   `@grpc/grpc-js`, `@grpc/proto-loader`, `google-protobuf`
    *   `typescript`, `ts-node`, `grpc-tools`, `grpc_tools_node_protoc_ts`
*   **Docker & Docker Compose:** For containerization and orchestration.
*   **OpenSSL:** For generating self-signed TLS certificates.

## 📁 Project Structure

```
grpc-iot-project/
├── certs/                  # SSL/TLS certificates
│   ├── server.crt
│   ├── server.csr
│   ├── server.key
│   └── openssl.cnf         # Config for cert generation
├── client/                 # Node.js/TypeScript gRPC clients
│   ├── src/
│   │   ├── proto_gen/      # Auto-generated client stubs & types
│   │   ├── device_simulator.ts
│   │   └── management_console.ts
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── proto/                  # Protocol Buffer definitions
│   └── iot_service.proto
├── server/                 # Python gRPC server
│   ├── Dockerfile
│   ├── requirements.txt
│   └── server.py
├── .gitignore
├── docker-compose.yml
├── LICENSE                 # Project's license file
└── README.md
```

## ⚙️ Prerequisites

*   [Git](https://git-scm.com/)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop) (includes Docker Engine and Docker Compose)
*   [OpenSSL](https://www.openssl.org/) (usually pre-installed on Linux/macOS; available for Windows)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kunalPisolkar24/grpc-iot-project.git
cd grpc-iot-project
```

### 2. Generate TLS Certificates

Secure communication requires TLS certificates. These steps generate self-signed certificates for development.

```bash
mkdir -p certs
cd certs

cat <<EOL > openssl.cnf
[ req ]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[ req_distinguished_name ]
C = US
ST = YourState
L = YourCity
O = YourOrganization
OU = Development
CN = py-server

[ v3_req ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = py-server
EOL

openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -config openssl.cnf
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt -extensions v3_req -extfile openssl.cnf

cd ..
```
**Note:** The `CN` (Common Name) and `DNS.1` in `openssl.cnf` are set to `py-server`.

### 3. Build and Run with Docker Compose

From the project root directory (`grpc-iot-project/`):

```bash
docker-compose build
docker-compose up -d
```

To view the logs:
```bash
docker-compose logs -f
```
Or for specific services:
```bash
docker-compose logs -f py-server
docker-compose logs -f node-device-simulator-ts
docker-compose logs -f node-management-console-ts
```

### 4. Testing the gRPC Patterns

*   **Unary & Client Streaming & Bidirectional Streaming:** The `node-device-simulator-ts` client automatically demonstrates these.
*   **Server Streaming:** The `node-management-console-ts` client (as configured in `docker-compose.yml`) demonstrates this.

Observe the interleaved logs to see the patterns in action.

### 5. Stopping the Services

```bash
docker-compose down
```

## 📖 gRPC Patterns Demonstrated

*   **Unary RPC:** `RegisterDevice`, `GetDeviceStatus`, `SendCommandToDevice`.
*   **Server Streaming RPC:** `SubscribeToDeviceTelemetry`.
*   **Client Streaming RPC:** `UploadBulkTelemetry`.
*   **Bidirectional Streaming RPC:** `EstablishInteractiveSession`.

## 🔒 Security

*   Communication is secured using **TLS (Transport Layer Security)**.
*   Uses self-signed certificates with `py-server` as the CN/SAN for hostname verification.


## 🤝 Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

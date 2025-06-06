// package: iotdevice
// file: iot_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as iot_service_pb from "./iot_service_pb";

interface IDeviceManagementServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    registerDevice: IDeviceManagementServiceService_IRegisterDevice;
    getDeviceStatus: IDeviceManagementServiceService_IGetDeviceStatus;
    sendCommandToDevice: IDeviceManagementServiceService_ISendCommandToDevice;
    subscribeToDeviceTelemetry: IDeviceManagementServiceService_ISubscribeToDeviceTelemetry;
}

interface IDeviceManagementServiceService_IRegisterDevice extends grpc.MethodDefinition<iot_service_pb.DeviceRegistrationRequest, iot_service_pb.DeviceRegistrationResponse> {
    path: "/iotdevice.DeviceManagementService/RegisterDevice";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iot_service_pb.DeviceRegistrationRequest>;
    requestDeserialize: grpc.deserialize<iot_service_pb.DeviceRegistrationRequest>;
    responseSerialize: grpc.serialize<iot_service_pb.DeviceRegistrationResponse>;
    responseDeserialize: grpc.deserialize<iot_service_pb.DeviceRegistrationResponse>;
}
interface IDeviceManagementServiceService_IGetDeviceStatus extends grpc.MethodDefinition<iot_service_pb.DeviceStatusRequest, iot_service_pb.DeviceStatusResponse> {
    path: "/iotdevice.DeviceManagementService/GetDeviceStatus";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iot_service_pb.DeviceStatusRequest>;
    requestDeserialize: grpc.deserialize<iot_service_pb.DeviceStatusRequest>;
    responseSerialize: grpc.serialize<iot_service_pb.DeviceStatusResponse>;
    responseDeserialize: grpc.deserialize<iot_service_pb.DeviceStatusResponse>;
}
interface IDeviceManagementServiceService_ISendCommandToDevice extends grpc.MethodDefinition<iot_service_pb.DeviceCommandRequest, iot_service_pb.CommandAcknowledgement> {
    path: "/iotdevice.DeviceManagementService/SendCommandToDevice";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iot_service_pb.DeviceCommandRequest>;
    requestDeserialize: grpc.deserialize<iot_service_pb.DeviceCommandRequest>;
    responseSerialize: grpc.serialize<iot_service_pb.CommandAcknowledgement>;
    responseDeserialize: grpc.deserialize<iot_service_pb.CommandAcknowledgement>;
}
interface IDeviceManagementServiceService_ISubscribeToDeviceTelemetry extends grpc.MethodDefinition<iot_service_pb.TelemetrySubscriptionRequest, iot_service_pb.TelemetryDataPoint> {
    path: "/iotdevice.DeviceManagementService/SubscribeToDeviceTelemetry";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<iot_service_pb.TelemetrySubscriptionRequest>;
    requestDeserialize: grpc.deserialize<iot_service_pb.TelemetrySubscriptionRequest>;
    responseSerialize: grpc.serialize<iot_service_pb.TelemetryDataPoint>;
    responseDeserialize: grpc.deserialize<iot_service_pb.TelemetryDataPoint>;
}

export const DeviceManagementServiceService: IDeviceManagementServiceService;

export interface IDeviceManagementServiceServer {
    registerDevice: grpc.handleUnaryCall<iot_service_pb.DeviceRegistrationRequest, iot_service_pb.DeviceRegistrationResponse>;
    getDeviceStatus: grpc.handleUnaryCall<iot_service_pb.DeviceStatusRequest, iot_service_pb.DeviceStatusResponse>;
    sendCommandToDevice: grpc.handleUnaryCall<iot_service_pb.DeviceCommandRequest, iot_service_pb.CommandAcknowledgement>;
    subscribeToDeviceTelemetry: grpc.handleServerStreamingCall<iot_service_pb.TelemetrySubscriptionRequest, iot_service_pb.TelemetryDataPoint>;
}

export interface IDeviceManagementServiceClient {
    registerDevice(request: iot_service_pb.DeviceRegistrationRequest, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceRegistrationResponse) => void): grpc.ClientUnaryCall;
    registerDevice(request: iot_service_pb.DeviceRegistrationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceRegistrationResponse) => void): grpc.ClientUnaryCall;
    registerDevice(request: iot_service_pb.DeviceRegistrationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceRegistrationResponse) => void): grpc.ClientUnaryCall;
    getDeviceStatus(request: iot_service_pb.DeviceStatusRequest, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceStatusResponse) => void): grpc.ClientUnaryCall;
    getDeviceStatus(request: iot_service_pb.DeviceStatusRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceStatusResponse) => void): grpc.ClientUnaryCall;
    getDeviceStatus(request: iot_service_pb.DeviceStatusRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceStatusResponse) => void): grpc.ClientUnaryCall;
    sendCommandToDevice(request: iot_service_pb.DeviceCommandRequest, callback: (error: grpc.ServiceError | null, response: iot_service_pb.CommandAcknowledgement) => void): grpc.ClientUnaryCall;
    sendCommandToDevice(request: iot_service_pb.DeviceCommandRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iot_service_pb.CommandAcknowledgement) => void): grpc.ClientUnaryCall;
    sendCommandToDevice(request: iot_service_pb.DeviceCommandRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iot_service_pb.CommandAcknowledgement) => void): grpc.ClientUnaryCall;
    subscribeToDeviceTelemetry(request: iot_service_pb.TelemetrySubscriptionRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<iot_service_pb.TelemetryDataPoint>;
    subscribeToDeviceTelemetry(request: iot_service_pb.TelemetrySubscriptionRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<iot_service_pb.TelemetryDataPoint>;
}

export class DeviceManagementServiceClient extends grpc.Client implements IDeviceManagementServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public registerDevice(request: iot_service_pb.DeviceRegistrationRequest, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceRegistrationResponse) => void): grpc.ClientUnaryCall;
    public registerDevice(request: iot_service_pb.DeviceRegistrationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceRegistrationResponse) => void): grpc.ClientUnaryCall;
    public registerDevice(request: iot_service_pb.DeviceRegistrationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceRegistrationResponse) => void): grpc.ClientUnaryCall;
    public getDeviceStatus(request: iot_service_pb.DeviceStatusRequest, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceStatusResponse) => void): grpc.ClientUnaryCall;
    public getDeviceStatus(request: iot_service_pb.DeviceStatusRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceStatusResponse) => void): grpc.ClientUnaryCall;
    public getDeviceStatus(request: iot_service_pb.DeviceStatusRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iot_service_pb.DeviceStatusResponse) => void): grpc.ClientUnaryCall;
    public sendCommandToDevice(request: iot_service_pb.DeviceCommandRequest, callback: (error: grpc.ServiceError | null, response: iot_service_pb.CommandAcknowledgement) => void): grpc.ClientUnaryCall;
    public sendCommandToDevice(request: iot_service_pb.DeviceCommandRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iot_service_pb.CommandAcknowledgement) => void): grpc.ClientUnaryCall;
    public sendCommandToDevice(request: iot_service_pb.DeviceCommandRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iot_service_pb.CommandAcknowledgement) => void): grpc.ClientUnaryCall;
    public subscribeToDeviceTelemetry(request: iot_service_pb.TelemetrySubscriptionRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<iot_service_pb.TelemetryDataPoint>;
    public subscribeToDeviceTelemetry(request: iot_service_pb.TelemetrySubscriptionRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<iot_service_pb.TelemetryDataPoint>;
}

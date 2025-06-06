// package: iotdevice
// file: iot_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class DeviceRegistrationRequest extends jspb.Message { 
    getDeviceId(): string;
    setDeviceId(value: string): DeviceRegistrationRequest;
    getDeviceType(): string;
    setDeviceType(value: string): DeviceRegistrationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceRegistrationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceRegistrationRequest): DeviceRegistrationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceRegistrationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceRegistrationRequest;
    static deserializeBinaryFromReader(message: DeviceRegistrationRequest, reader: jspb.BinaryReader): DeviceRegistrationRequest;
}

export namespace DeviceRegistrationRequest {
    export type AsObject = {
        deviceId: string,
        deviceType: string,
    }
}

export class DeviceRegistrationResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DeviceRegistrationResponse;
    getMessage(): string;
    setMessage(value: string): DeviceRegistrationResponse;
    getServerAssignedToken(): string;
    setServerAssignedToken(value: string): DeviceRegistrationResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceRegistrationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceRegistrationResponse): DeviceRegistrationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceRegistrationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceRegistrationResponse;
    static deserializeBinaryFromReader(message: DeviceRegistrationResponse, reader: jspb.BinaryReader): DeviceRegistrationResponse;
}

export namespace DeviceRegistrationResponse {
    export type AsObject = {
        success: boolean,
        message: string,
        serverAssignedToken: string,
    }
}

export class DeviceStatusRequest extends jspb.Message { 
    getDeviceId(): string;
    setDeviceId(value: string): DeviceStatusRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceStatusRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceStatusRequest): DeviceStatusRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceStatusRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceStatusRequest;
    static deserializeBinaryFromReader(message: DeviceStatusRequest, reader: jspb.BinaryReader): DeviceStatusRequest;
}

export namespace DeviceStatusRequest {
    export type AsObject = {
        deviceId: string,
    }
}

export class DeviceStatusResponse extends jspb.Message { 
    getDeviceId(): string;
    setDeviceId(value: string): DeviceStatusResponse;
    getStatus(): string;
    setStatus(value: string): DeviceStatusResponse;
    getUptimeSeconds(): number;
    setUptimeSeconds(value: number): DeviceStatusResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceStatusResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceStatusResponse): DeviceStatusResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceStatusResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceStatusResponse;
    static deserializeBinaryFromReader(message: DeviceStatusResponse, reader: jspb.BinaryReader): DeviceStatusResponse;
}

export namespace DeviceStatusResponse {
    export type AsObject = {
        deviceId: string,
        status: string,
        uptimeSeconds: number,
    }
}

export class DeviceCommandRequest extends jspb.Message { 
    getDeviceId(): string;
    setDeviceId(value: string): DeviceCommandRequest;
    getCommandName(): string;
    setCommandName(value: string): DeviceCommandRequest;
    getPayloadJson(): string;
    setPayloadJson(value: string): DeviceCommandRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceCommandRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceCommandRequest): DeviceCommandRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceCommandRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceCommandRequest;
    static deserializeBinaryFromReader(message: DeviceCommandRequest, reader: jspb.BinaryReader): DeviceCommandRequest;
}

export namespace DeviceCommandRequest {
    export type AsObject = {
        deviceId: string,
        commandName: string,
        payloadJson: string,
    }
}

export class CommandAcknowledgement extends jspb.Message { 
    getReceived(): boolean;
    setReceived(value: boolean): CommandAcknowledgement;
    getMessage(): string;
    setMessage(value: string): CommandAcknowledgement;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommandAcknowledgement.AsObject;
    static toObject(includeInstance: boolean, msg: CommandAcknowledgement): CommandAcknowledgement.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CommandAcknowledgement, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CommandAcknowledgement;
    static deserializeBinaryFromReader(message: CommandAcknowledgement, reader: jspb.BinaryReader): CommandAcknowledgement;
}

export namespace CommandAcknowledgement {
    export type AsObject = {
        received: boolean,
        message: string,
    }
}

export class TelemetrySubscriptionRequest extends jspb.Message { 
    getDeviceId(): string;
    setDeviceId(value: string): TelemetrySubscriptionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TelemetrySubscriptionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TelemetrySubscriptionRequest): TelemetrySubscriptionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TelemetrySubscriptionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TelemetrySubscriptionRequest;
    static deserializeBinaryFromReader(message: TelemetrySubscriptionRequest, reader: jspb.BinaryReader): TelemetrySubscriptionRequest;
}

export namespace TelemetrySubscriptionRequest {
    export type AsObject = {
        deviceId: string,
    }
}

export class TelemetryDataPoint extends jspb.Message { 
    getDeviceId(): string;
    setDeviceId(value: string): TelemetryDataPoint;
    getTimestampMs(): number;
    setTimestampMs(value: number): TelemetryDataPoint;
    getSensorId(): string;
    setSensorId(value: string): TelemetryDataPoint;
    getValue(): number;
    setValue(value: number): TelemetryDataPoint;

    getMetadataMap(): jspb.Map<string, string>;
    clearMetadataMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TelemetryDataPoint.AsObject;
    static toObject(includeInstance: boolean, msg: TelemetryDataPoint): TelemetryDataPoint.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TelemetryDataPoint, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TelemetryDataPoint;
    static deserializeBinaryFromReader(message: TelemetryDataPoint, reader: jspb.BinaryReader): TelemetryDataPoint;
}

export namespace TelemetryDataPoint {
    export type AsObject = {
        deviceId: string,
        timestampMs: number,
        sensorId: string,
        value: number,

        metadataMap: Array<[string, string]>,
    }
}

export class BulkUploadSummary extends jspb.Message { 
    getPointsReceived(): number;
    setPointsReceived(value: number): BulkUploadSummary;
    getPointsFailed(): number;
    setPointsFailed(value: number): BulkUploadSummary;
    getMessage(): string;
    setMessage(value: string): BulkUploadSummary;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BulkUploadSummary.AsObject;
    static toObject(includeInstance: boolean, msg: BulkUploadSummary): BulkUploadSummary.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BulkUploadSummary, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BulkUploadSummary;
    static deserializeBinaryFromReader(message: BulkUploadSummary, reader: jspb.BinaryReader): BulkUploadSummary;
}

export namespace BulkUploadSummary {
    export type AsObject = {
        pointsReceived: number,
        pointsFailed: number,
        message: string,
    }
}

export class DeviceToServerMessage extends jspb.Message { 
    getDeviceId(): string;
    setDeviceId(value: string): DeviceToServerMessage;

    hasLiveTelemetry(): boolean;
    clearLiveTelemetry(): void;
    getLiveTelemetry(): TelemetryDataPoint | undefined;
    setLiveTelemetry(value?: TelemetryDataPoint): DeviceToServerMessage;

    hasStatusUpdate(): boolean;
    clearStatusUpdate(): void;
    getStatusUpdate(): string;
    setStatusUpdate(value: string): DeviceToServerMessage;

    hasCommandResponsePayload(): boolean;
    clearCommandResponsePayload(): void;
    getCommandResponsePayload(): string;
    setCommandResponsePayload(value: string): DeviceToServerMessage;

    getEventCase(): DeviceToServerMessage.EventCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeviceToServerMessage.AsObject;
    static toObject(includeInstance: boolean, msg: DeviceToServerMessage): DeviceToServerMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeviceToServerMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeviceToServerMessage;
    static deserializeBinaryFromReader(message: DeviceToServerMessage, reader: jspb.BinaryReader): DeviceToServerMessage;
}

export namespace DeviceToServerMessage {
    export type AsObject = {
        deviceId: string,
        liveTelemetry?: TelemetryDataPoint.AsObject,
        statusUpdate: string,
        commandResponsePayload: string,
    }

    export enum EventCase {
        EVENT_NOT_SET = 0,
        LIVE_TELEMETRY = 2,
        STATUS_UPDATE = 3,
        COMMAND_RESPONSE_PAYLOAD = 4,
    }

}

export class ServerToDeviceMessage extends jspb.Message { 

    hasCommandRequest(): boolean;
    clearCommandRequest(): void;
    getCommandRequest(): DeviceCommandRequest | undefined;
    setCommandRequest(value?: DeviceCommandRequest): ServerToDeviceMessage;

    hasConfigUpdateJson(): boolean;
    clearConfigUpdateJson(): void;
    getConfigUpdateJson(): string;
    setConfigUpdateJson(value: string): ServerToDeviceMessage;

    hasAcknowledgementMessage(): boolean;
    clearAcknowledgementMessage(): void;
    getAcknowledgementMessage(): string;
    setAcknowledgementMessage(value: string): ServerToDeviceMessage;

    getActionCase(): ServerToDeviceMessage.ActionCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServerToDeviceMessage.AsObject;
    static toObject(includeInstance: boolean, msg: ServerToDeviceMessage): ServerToDeviceMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServerToDeviceMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServerToDeviceMessage;
    static deserializeBinaryFromReader(message: ServerToDeviceMessage, reader: jspb.BinaryReader): ServerToDeviceMessage;
}

export namespace ServerToDeviceMessage {
    export type AsObject = {
        commandRequest?: DeviceCommandRequest.AsObject,
        configUpdateJson: string,
        acknowledgementMessage: string,
    }

    export enum ActionCase {
        ACTION_NOT_SET = 0,
        COMMAND_REQUEST = 1,
        CONFIG_UPDATE_JSON = 2,
        ACKNOWLEDGEMENT_MESSAGE = 3,
    }

}

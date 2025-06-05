// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var iot_service_pb = require('./iot_service_pb.js');

function serialize_iotdevice_CommandAcknowledgement(arg) {
  if (!(arg instanceof iot_service_pb.CommandAcknowledgement)) {
    throw new Error('Expected argument of type iotdevice.CommandAcknowledgement');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iotdevice_CommandAcknowledgement(buffer_arg) {
  return iot_service_pb.CommandAcknowledgement.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iotdevice_DeviceCommandRequest(arg) {
  if (!(arg instanceof iot_service_pb.DeviceCommandRequest)) {
    throw new Error('Expected argument of type iotdevice.DeviceCommandRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iotdevice_DeviceCommandRequest(buffer_arg) {
  return iot_service_pb.DeviceCommandRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iotdevice_DeviceRegistrationRequest(arg) {
  if (!(arg instanceof iot_service_pb.DeviceRegistrationRequest)) {
    throw new Error('Expected argument of type iotdevice.DeviceRegistrationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iotdevice_DeviceRegistrationRequest(buffer_arg) {
  return iot_service_pb.DeviceRegistrationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iotdevice_DeviceRegistrationResponse(arg) {
  if (!(arg instanceof iot_service_pb.DeviceRegistrationResponse)) {
    throw new Error('Expected argument of type iotdevice.DeviceRegistrationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iotdevice_DeviceRegistrationResponse(buffer_arg) {
  return iot_service_pb.DeviceRegistrationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iotdevice_DeviceStatusRequest(arg) {
  if (!(arg instanceof iot_service_pb.DeviceStatusRequest)) {
    throw new Error('Expected argument of type iotdevice.DeviceStatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iotdevice_DeviceStatusRequest(buffer_arg) {
  return iot_service_pb.DeviceStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iotdevice_DeviceStatusResponse(arg) {
  if (!(arg instanceof iot_service_pb.DeviceStatusResponse)) {
    throw new Error('Expected argument of type iotdevice.DeviceStatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iotdevice_DeviceStatusResponse(buffer_arg) {
  return iot_service_pb.DeviceStatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DeviceManagementServiceService = exports.DeviceManagementServiceService = {
  registerDevice: {
    path: '/iotdevice.DeviceManagementService/RegisterDevice',
    requestStream: false,
    responseStream: false,
    requestType: iot_service_pb.DeviceRegistrationRequest,
    responseType: iot_service_pb.DeviceRegistrationResponse,
    requestSerialize: serialize_iotdevice_DeviceRegistrationRequest,
    requestDeserialize: deserialize_iotdevice_DeviceRegistrationRequest,
    responseSerialize: serialize_iotdevice_DeviceRegistrationResponse,
    responseDeserialize: deserialize_iotdevice_DeviceRegistrationResponse,
  },
  getDeviceStatus: {
    path: '/iotdevice.DeviceManagementService/GetDeviceStatus',
    requestStream: false,
    responseStream: false,
    requestType: iot_service_pb.DeviceStatusRequest,
    responseType: iot_service_pb.DeviceStatusResponse,
    requestSerialize: serialize_iotdevice_DeviceStatusRequest,
    requestDeserialize: deserialize_iotdevice_DeviceStatusRequest,
    responseSerialize: serialize_iotdevice_DeviceStatusResponse,
    responseDeserialize: deserialize_iotdevice_DeviceStatusResponse,
  },
  sendCommandToDevice: {
    path: '/iotdevice.DeviceManagementService/SendCommandToDevice',
    requestStream: false,
    responseStream: false,
    requestType: iot_service_pb.DeviceCommandRequest,
    responseType: iot_service_pb.CommandAcknowledgement,
    requestSerialize: serialize_iotdevice_DeviceCommandRequest,
    requestDeserialize: deserialize_iotdevice_DeviceCommandRequest,
    responseSerialize: serialize_iotdevice_CommandAcknowledgement,
    responseDeserialize: deserialize_iotdevice_CommandAcknowledgement,
  },
};

exports.DeviceManagementServiceClient = grpc.makeGenericClientConstructor(DeviceManagementServiceService, 'DeviceManagementService');

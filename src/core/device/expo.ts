let Device: any;
try {
  Device = require('expo-device');
} catch (error) {
  console.warn('Optional module expo-device is not available.');
}
let Application: any;
try {
  Application = require('expo-application');
} catch (error) {
  console.warn('Optional module expo-application is not available.');
}

import type { Metadata } from '../types';

const getDeviceType = (device: any) => {
  switch (device) {
    case Device.DeviceType.DESKTOP:
      return 'desktop';
    case Device.DeviceType.PHONE:
      return 'smartphone';
    case Device.DeviceType.TABLET:
      return 'tablet';
    case Device.DeviceType.TV:
      return 'tv';
    case Device.DeviceType.UNKNOWN:
      return undefined;
    default:
      return undefined;
  }
};

export const getDeviceInfo = async () => {
  return {
    os: {
      name: Device.osName,
      version: Device.osVersion,
    },
    client: {
      name: 'React Native',
      type: 'app',
      version: Application.nativeApplicationVersion,
      build: Application.nativeBuildVersion,
    },
    device: {
      type: getDeviceType(await Device.getDeviceTypeAsync()),
      brand: Device.brand,
      model: Device.modelName,
      deviceId: Device.modelId,
    },
  } as Metadata;
};

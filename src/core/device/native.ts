import { Platform } from 'react-native';

let DeviceInfo: any;

try {
  DeviceInfo = require('react-native-device-info');
} catch (error) {
  console.warn('Optional module react-native-device-info is not available.');
}

import type { Metadata } from '../types';

const getOSName = () => {
  switch (Platform.OS) {
    case 'ios':
      return 'iOS';
    case 'android':
      return 'Android';
    case 'windows':
      return 'Windows';
    case 'web':
      return 'Web';
    case 'macos':
      return 'MacOS';
  }
};

export const getDeviceInfo = async () => {
  return {
    os: {
      name: getOSName(),
      version: Platform.Version,
    },
    client: {
      name: 'React Native',
      type: 'app',
      version: await DeviceInfo.getVersion(),
      build: await DeviceInfo.getBuildNumber(),
    },
    device: {
      type: (await DeviceInfo.isTablet()) ? 'tablet' : 'smartphone',
      brand: await DeviceInfo.getManufacturer(),
      model: await DeviceInfo.getModel(),
      deviceId: await DeviceInfo.getDeviceId(),
    },
  } as Metadata;
};

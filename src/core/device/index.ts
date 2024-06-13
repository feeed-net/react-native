import { isExpo } from '../constants';

let deviceInfo;

if (isExpo) {
  const { getDeviceInfo } = require('./expo');
  deviceInfo = getDeviceInfo;
} else {
  const { getDeviceInfo } = require('./native');
  deviceInfo = getDeviceInfo;
}

export const getDeviceInfo = deviceInfo;

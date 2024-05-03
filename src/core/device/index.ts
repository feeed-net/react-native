import { isExpoGo } from '../constants';

let deviceInfo;

if (isExpoGo) {
  const { getDeviceInfo } = require('./expo');
  deviceInfo = getDeviceInfo;
} else {
  const { getDeviceInfo } = require('./native');
  deviceInfo = getDeviceInfo;
}

export const getDeviceInfo = deviceInfo;

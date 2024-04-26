import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';
const MessageIcon = (props: SvgProps) => (
  <Svg {...props} fill="none">
    <Path
      fill="currentColor"
      d="M9.5 0A9.519 9.519 0 0 0 0 9.5v8.009A1.492 1.492 0 0 0 1.492 19H9.5a9.5 9.5 0 1 0 0-19Zm2.66 12.16h-5.7a.76.76 0 0 1 0-1.52h5.7a.76.76 0 0 1 0 1.52Zm0-3.04h-5.7a.76.76 0 0 1 0-1.52h5.7a.76.76 0 1 1 0 1.52Z"
    />
  </Svg>
);
export default MessageIcon;

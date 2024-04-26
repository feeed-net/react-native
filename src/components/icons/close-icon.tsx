import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

const CloseIcon = (props: SvgProps) => (
  <Svg {...props} fill="none">
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M9.42 2.92a1.3 1.3 0 0 0-1.84-1.84L5.25 3.413 2.92 1.08a1.3 1.3 0 0 0-1.84 1.838L3.413 5.25 1.08 7.58a1.3 1.3 0 0 0 1.838 1.84L5.25 7.087 7.58 9.42a1.3 1.3 0 0 0 1.84-1.838L7.087 5.25 9.42 2.92Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CloseIcon;

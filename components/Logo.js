import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default function Logo({ size = 32, color = "#EF4444" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Location pin shape */}
      <Path
        d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 11 6 11s6-5.75 6-11c0-3.314-2.686-6-6-6z"
        fill={color}
      />
      {/* White inner area */}
      <Circle
        cx="12"
        cy="8"
        r="2.5"
        fill="white"
      />
      {/* Exclamation mark - vertical line */}
      <Path
        d="M12 6.5v2"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Exclamation mark - dot */}
      <Circle
        cx="12"
        cy="9.5"
        r="0.5"
        fill={color}
      />
    </Svg>
  );
}

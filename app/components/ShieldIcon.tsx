import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
};

export default function ShieldIcon({ size = 24, color = "#000" }: Props) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 2l7 4v5.5c0 4.6-3.1 8.5-7 9.5-3.9-1-7-4.9-7-9.5V6l7-4z"
				fill={color}
			/>
			{/* inner detail uses the same color with reduced opacity; stroke scales with size */}
			<Path
				d="M12 6v6"
				stroke={color}
				strokeOpacity={0.25}
				strokeWidth={Math.max(1, size * 0.05)}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

import Svg, { Path } from "react-native-svg"

interface ShieldIconProps {
  size?: number
  color?: string
}

export default function ShieldIcon({ size = 24, color = "#EF4444" }: ShieldIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" fill={color} />
    </Svg>
  )
}

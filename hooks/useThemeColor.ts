import { useColorScheme } from './useColorScheme';

type ColorMap = { [key: string]: string };

export function useThemeColor(light: ColorMap | string, dark?: ColorMap | string) {
  const theme = useColorScheme();
  // If light/dark are strings, return the appropriate one. If objects, return merged map.
  if (typeof light === 'string' && typeof dark === 'string') {
    return theme === 'dark' ? dark : light;
  }

  if (typeof light === 'object' && typeof dark === 'object') {
    return theme === 'dark' ? dark : light;
  }

  return theme === 'dark' && dark ? (dark as any) : (light as any);
}

export default useThemeColor;

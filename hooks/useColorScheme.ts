import { useColorScheme as _useColorScheme } from 'react-native';

// Return 'light' or 'dark' to match project expectations.
export function useColorScheme() {
  const scheme = _useColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}

export default useColorScheme;

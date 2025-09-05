// Web-specific fallback for color scheme; navigator prefers-color-scheme is used.
export function useColorScheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export default useColorScheme;

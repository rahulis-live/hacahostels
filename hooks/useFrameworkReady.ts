import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';

// declare global {
//   interface Window {
//     frameworkReady?: () => void;
//   }
// }

export function useFrameworkReady() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
}

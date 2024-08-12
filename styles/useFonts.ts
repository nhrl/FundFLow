import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function useAppFonts() {
  const [loaded, error] = useFonts({
    'InriaSerif': require('../assets/fonts/InriaSerif-Bold.ttf'),
    'Inter': require('../assets/fonts/Inter_28pt-Bold.ttf'),
    'InriaSerif-Regular': require('../assets/fonts/InriaSerif-Regular.ttf'),
    'Inter-medium': require('@/assets/fonts/Inter_28pt-Medium.ttf'),
    'Inter-semi': require('@/assets/fonts/Inter_28pt-SemiBold.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return { loaded, error };
}
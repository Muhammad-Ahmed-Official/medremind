import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css"
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {

  }, [])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DarkTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

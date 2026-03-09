import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css"
// import { useColorScheme } from '@/hooks/use-color-scheme';
// import { useEffect } from 'react';

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  // useEffect(() => {
  // }, [])
  {/* <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DarkTheme}> */}
  {/* </ThemeProvider> */}

  return (
    <>
      <Stack screenOptions={{ 
        headerShown: false, 
        contentStyle: { backgroundColor: "white"}, 
        animation: "slide_from_right", header: () => null, 
        navigationBarHidden: true, 
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name='medications/index' options={{ headerBackTitle: "", title: "" }} />
        <Stack.Screen name='history/index' options={{ headerBackTitle: "", title: "" }} />
        <Stack.Screen name='calendar/index' options={{ headerBackTitle: "", title: "" }} />
        <Stack.Screen name='refills/index' options={{ headerBackTitle: "", title: "" }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}

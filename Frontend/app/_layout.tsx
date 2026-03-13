// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css"
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Toast from 'react-native-toast-message';
// import { useColorScheme } from '@/hooks/use-color-scheme';
// import { useEffect } from 'react';
// const colorScheme = useColorScheme();
// useEffect(() => {
// }, [])
{/* <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DarkTheme}> */}
{/* </ThemeProvider> */}

export default function RootLayout() {
  return (
    <Provider store={store}>
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
      <Toast />
    </Provider>
  );
}
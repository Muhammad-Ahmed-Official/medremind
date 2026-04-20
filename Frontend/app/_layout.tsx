// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css"
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Toast from 'react-native-toast-message';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { setupNotifications } from '@/services/notificationService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    setupNotifications();

    responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {
      router.replace('/(main)/home');
    });

    return () => {
      responseListener.current?.remove();
    };
  }, []);

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
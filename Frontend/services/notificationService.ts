import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const NOTIF_IDS_KEY = 'medicine_notification_ids';

function parseTime(timeStr: string): { hour: number; minute: number } {
  const [time, period] = timeStr.split(' ');
  const [hoursStr, minutesStr] = time.split(':');
  let hour = parseInt(hoursStr, 10);
  const minute = parseInt(minutesStr, 10);
  if (period === 'PM' && hour !== 12) hour += 12;
  else if (period === 'AM' && hour === 12) hour = 0;
  return { hour, minute };
}

async function getStoredIds(): Promise<Record<string, string>> {
  const raw = await AsyncStorage.getItem(NOTIF_IDS_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function saveStoredIds(ids: Record<string, string>) {
  await AsyncStorage.setItem(NOTIF_IDS_KEY, JSON.stringify(ids));
}

export async function setupNotifications(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('medicine-reminders', {
      name: 'Medicine Reminders',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#1a8e2d',
      sound: 'default',
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
}

export async function scheduleMedicineNotifications(
  medicineId: string,
  medicineName: string,
  times: string[]
) {
  const ids = await getStoredIds();

  for (const timeStr of times) {
    const key = `${medicineId}_${timeStr}`;
    if (ids[key]) {
      await Notifications.cancelScheduledNotificationAsync(ids[key]).catch(() => {});
    }

    const { hour, minute } = parseTime(timeStr);
    const notifId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Medicine Reminder',
        body: `Time to take your ${medicineName}`,
        sound: 'default',
        data: { medicineId, time: timeStr },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
    ids[key] = notifId;
  }

  await saveStoredIds(ids);
}

export async function cancelMedicineTimeNotification(medicineId: string, time: string) {
  const ids = await getStoredIds();
  const key = `${medicineId}_${time}`;
  if (ids[key]) {
    await Notifications.cancelScheduledNotificationAsync(ids[key]).catch(() => {});
    delete ids[key];
    await saveStoredIds(ids);
  }
}

export async function cancelAllMedicineNotifications(medicineId: string) {
  const ids = await getStoredIds();
  const keysToRemove = Object.keys(ids).filter(k => k.startsWith(`${medicineId}_`));
  for (const key of keysToRemove) {
    await Notifications.cancelScheduledNotificationAsync(ids[key]).catch(() => {});
    delete ids[key];
  }
  await saveStoredIds(ids);
}

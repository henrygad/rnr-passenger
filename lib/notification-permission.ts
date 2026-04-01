import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device'; // <--- Add this import
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
    let token;

    // 1. Check if it's a physical device
    if (!Device.isDevice) {
        console.log('Push Notifications only work on physical devices.');
        return null;
    }

    // 2. Check current permission status
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // 3. If not granted, ask the user
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    // 4. If they still say no, we can't get a token
    if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return null;
    }

    // 5. Get the Expo Push Token
    // Note: Replace "your-project-id" with your actual Expo Project ID from app.json if required
    try {
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Token generated:", token);
    } catch (e) {
        console.log("Error fetching token:", e);
    }

    // 6. Android Specifics
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF6600', // RnR Brand Color
        });
    }

    return token;
}
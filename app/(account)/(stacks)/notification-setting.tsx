import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Switch,
    StyleSheet,
    Linking,
    Platform,
    Alert,
    AppState // To detect when user comes back from Settings
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { registerForPushNotificationsAsync } from '@/lib/notification-permission';

export default function NotificationSettings() {
    const { colors } = useTheme();
    const [isGranted, setIsGranted] = useState(false);

    // 1. Function to sync the switch with actual system status
    const checkPermissionStatus = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        setIsGranted(status === 'granted');
    };

    useEffect(() => {
        checkPermissionStatus();

        // Refresh status when user returns to the app from phone settings
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkPermissionStatus();
            }
        });
        return () => subscription.remove();
    }, []);

    const handleToggle = async (value: boolean) => {
        // If the user is trying to turn it ON
        if (value) {
            const { status: currentStatus } = await Notifications.getPermissionsAsync();

            if (currentStatus === 'undetermined') {
                // First time asking
                const token = await registerForPushNotificationsAsync();
                if (token) {
                    setIsGranted(true);
                    // TODO: Send token to MongoDB
                }
            } else if (currentStatus === 'denied') {
                // They previously said NO. We must explain and send to Settings.
                Alert.alert(
                    "Permissions Required",
                    "To enable notifications, you'll need to allow them in your phone settings.",
                    [
                        { text: "Cancel", style: "cancel", onPress: () => setIsGranted(false) },
                        {
                            text: "Open Settings",
                            onPress: () => {
                                if (Platform.OS === 'ios') {
                                    Linking.openURL('app-settings:');
                                } else {
                                    Linking.openSettings();
                                }
                            }
                        }
                    ]
                );
            } else {
                setIsGranted(true);
            }
        } else {
            // User is turning it OFF
            // Note: You can't "un-grant" system permission via code, 
            // but you can tell your MongoDB backend to stop sending pings to this token.
            setIsGranted(false);
            // TODO: Call your API to disable notifications in MongoDB
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.settingRow}>
                <View style={styles.info}>
                    <Text style={[typography.subheading, { color: colors.text }]}>
                        Push Notifications
                    </Text>
                    <Text style={[typography.caption, { color: colors.muted, marginTop: 4 }]}>
                        Stay updated on ride arrivals and booking status.
                    </Text>
                </View>

                <Switch
                    value={isGranted}
                    onValueChange={handleToggle}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={Platform.OS === 'android' ? '#FFFFFF' : ''}
                />
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: spacing.md },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    info: { flex: 1, paddingRight: spacing.lg },
    divider: { height: 1, marginTop: spacing.md, opacity: 0.2 }
});
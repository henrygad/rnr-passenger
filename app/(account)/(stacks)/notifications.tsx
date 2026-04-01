import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import Screen from '@/componants/screen';
import { Stack } from 'expo-router';
import CustomHeader from '@/componants/custom-header';
import NotificationCard from '@/componants/notifications/notification-card';
import NotificationModal from '@/componants/notifications/notification-modal';

const NOTIFS = [
    { id: '1', type: 'Rides', subType: 'Driver Arrived', title: 'Driver Arrived', msg: 'Samuel is at the pickup point in a Silver Toyota Corolla (KJA-123AA).', time: '2m', unread: true, detail: { driver: 'Samuel', car: 'Toyota Corolla', plate: 'KJA-123AA', location: 'Lekki Phase 1' } },
    { id: '2', type: 'Stays', subType: 'Booking Confirmed', title: 'Booking Confirmed', msg: 'Your suite at Eko Hotels is ready for check-in.', time: '1h', unread: true, detail: { hotel: 'Eko Hotels & Suites', room: 'Deluxe Suite', checkIn: '2:00 PM', ref: 'RNR-99201' } },
    { id: '3', type: 'Offers', subType: 'discount', title: '20% Off Next Ride', msg: 'Use code RNR-LEKKI for your next trip to the Island.', time: '5h', unread: false, detail: { code: 'RNR-LEKKI', expiry: 'Expires in 3 days' } },
    { id: '4', type: 'Rides', subType: 'Trip Completed', title: 'Trip Completed', msg: 'Thanks for riding! Rate your driver.', time: '1d', unread: false, detail: { driver: 'John Doe', car: 'Honda Civic', plate: 'KJA-456BB', location: 'Lekki Phase 1' } }
];

export default function NotificationScreen() {
    const { colors } = useTheme();

    const [activeTab, setActiveTab] = useState('All');
    const [notifications, setNotifications] = useState(NOTIFS);

    const [selectedNotif, setSelectedNotif] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // 1. Tab Functionality: Filter logic
    const filteredData = activeTab === 'All'
        ? notifications
        : notifications.filter(n => n.type === activeTab);

    // 2. Three Dots Menu: "Mark all as read" action
    const handleMenuPress = () => {
        Alert.alert("Notification Options", "What would you like to do?", [
            {
                text: "Mark all as read", onPress: () => {
                    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
                }
            },
            { text: "Clear all", style: "destructive", onPress: () => setNotifications([]) },
            { text: "Cancel", style: "cancel" }
        ]);
    };


    // 3. Open Modal with Details when a notification is tapped
    const openDetail = (notif: any) => {
        setSelectedNotif(notif);
        setModalVisible(true);
        // Mark the notification as read when opened
        setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
    };

    return (
        <Screen>
            <Stack.Screen
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'fade', // We handle the slide animation manually below for smoother control
                }}
            />
            {/* Header Area */}
            <CustomHeader Title="Notifications" showReturnBtn={true}>
                <View style={styles.menuBtnContainer}>
                    <TouchableOpacity onPress={handleMenuPress} style={styles.menuBtn}>
                        <Ionicons name="ellipsis-vertical" size={20} color={colors.text} />
                    </TouchableOpacity>
                </View>
            </CustomHeader>

            {/* Functional Filter Tabs */}
            <View style={styles.tabsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabList}>
                    {['All', 'Rides', 'Stays', 'Offers'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[
                                styles.tabPill,
                                { borderColor: colors.border },
                                activeTab === tab && { backgroundColor: colors.primary, borderColor: colors.primary }
                            ]}
                        >
                            <Text style={[
                                typography.button,
                                { color: activeTab === tab ? '#FFF' : colors.muted, fontSize: 13 }
                            ]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NotificationCard item={item} openDetail={openDetail} />}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={[typography.body, { color: colors.muted }]}>No notifications in {activeTab}</Text>
                    </View>
                }
            />

            {/* Notification Modal */}
            <NotificationModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                selectedNotif={selectedNotif}
            />
        </Screen>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1 },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingTop: spacing.lg,
        paddingBottom: spacing.sm,
    },
    menuBtnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    menuBtn: { position: 'absolute', right: -10, transform: [{ translateY: '-50%' }] },
    tabsContainer: { marginVertical: spacing.md },
    tabList: { width: '100%', gap: 10, justifyContent: 'space-between' },
    tabPill: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 25,
        borderWidth: 1,
    },
    listContainer: { paddingBottom: 50 },
    emptyState: {
        marginTop: 100,
        alignItems: 'center'
    }
});

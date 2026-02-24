import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import Screen from '@/componants/screen';
import ProfileMenuItem from '@/componants/profile/Profile-menu-item';
import LogoutButton from '@/componants/profile/logout-button';

export default function Profile() {
    const { colors, } = useTheme();

    return (
        <Screen>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Avatar Section */}
                <Animated.View
                    entering={FadeInDown.delay(100).springify()}
                    style={styles.avatarContainer}
                >
                    <View style={[
                        styles.imageWrapper,
                        { backgroundColor: colors.light, borderColor: colors.primary }
                    ]}>
                        <Image
                            source={require('@/assets/images/profile-avatar.png')} // Replace with your local asset
                            style={styles.avatar}
                            contentFit="cover"
                        />
                        <TouchableOpacity style={[styles.editBadge, { backgroundColor: colors.primary }]}>
                            <Ionicons name="pencil" size={14} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.userName, { color: colors.primary }]}>Test Userrrrrrrr</Text>
                    <Text style={[styles.userEmail, { color: colors.muted }]}>testuser@testuser.com</Text>
                </Animated.View>

                {/* Settings List */}
                <View style={styles.listSection}>
                    <ProfileMenuItem
                        index={1}
                        icon="person-outline"
                        label="Personal"
                        iconBg="#FFF1F0"
                        iconColor="#FF8A65"
                    />
                    <ProfileMenuItem
                        index={2}
                        icon="notifications-outline"
                        label="Notifications"
                        iconBg="#FFF1F0"
                        iconColor="#FF8A65"
                    />
                    <ProfileMenuItem
                        index={3}
                        icon="shield-checkmark-outline"
                        label="Security and Logins"
                        iconBg="#FFF1F0"
                        iconColor="#FF8A65"
                    />
                </View>

                {/* Logout Button */}
                <LogoutButton />
            </ScrollView>
        </Screen>
    );
}



const styles = StyleSheet.create({
    scrollContent: {
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 40,
    },

    // Avatar Section
    avatarContainer: {
        alignItems: 'center', marginTop: 10, marginBottom: 30
    },
    imageWrapper: {
        borderRadius: 60,
        borderWidth: 2,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: 120, height: 120,
    },
    avatar: { width: 120, height: 120, },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: [{ translateX: -14 }],
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userName: { ...typography.heading, marginTop: 15, fontSize: 22 },
    userEmail: { ...typography.body, fontSize: 14, marginTop: 4 },

    // List Section
    listSection: { width: '100%', gap: 16 },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
    },
    menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuLabel: { ...typography.subheading, fontSize: 16, fontWeight: '600' },
});



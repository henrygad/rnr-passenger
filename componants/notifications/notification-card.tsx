import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/constants/theme';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

type Props = {
    item: any;
    openDetail: (notif: any) => void;
}

export default function NotificationCard({ item, openDetail }: Props) {
    const { colors, isDark } = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                styles.card,
                { backgroundColor: item.unread ? (isDark ? '#161616' : '#FFF9F5') : colors.background }
            ]}
            onPress={() => openDetail(item)}
        >

            {/* Unread Indicator */}
            {item.unread && <View style={[styles.unreadStrip, { backgroundColor: colors.primary }]} />}

            {/* Notification Icon */}

            <View style={[styles.iconCircle, { backgroundColor: isDark ? '#27272A' : '#F3F4F6' }]}>
                {item.type === 'Rides' ? <Ionicons name="car-sport" size={20} color={colors.primary} /> :
                    item.type === 'Stays' ? <MaterialCommunityIcons name="office-building" size={20} color={colors.primary} /> :
                        <MaterialIcons name="local-offer" size={20} color={colors.primary} />}
            </View>

            <View style={styles.textStack}>
                <View style={styles.cardHeader}>
                    <Text style={[typography.subheading, { color: colors.text }]}>{item.title}</Text>
                    <Text style={[typography.caption, { color: colors.muted }]}>{item.time}</Text>
                </View>
                <Text numberOfLines={2} style={[typography.body, { color: colors.muted, fontSize: 14, marginTop: 2 }]}>
                    {item.msg}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
    },
    unreadStrip: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStack: { flex: 1, marginLeft: spacing.md },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});
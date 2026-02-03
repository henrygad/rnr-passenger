import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


import { useTheme } from '@/constants/theme';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import Screen from '@/componants/screen';

export default function BookingModal() {
    const { colors } = useTheme();

    return (
        <Screen style={styles.container}>
            <View style={[styles.header, { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
                <Text style={typography.heading}>
                    Booking.
                </Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    closeBtn: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#00000010', // Subtle overlay
    },
    content: { padding: spacing.lg },
    tileContainer: { flexDirection: 'row', gap: spacing.md },
    tile: { flex: 1 },
    card: { height: 180, justifyContent: 'center', alignItems: 'center', borderWidth: 0 },
    menuContainer: { marginTop: spacing.xxl },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.lg,
        borderBottomWidth: 1,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF660015', // Light brand primary tint
        justifyContent: 'center',
        alignItems: 'center',
    }
});
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { shadow } from '@/constants/shadow';
import { colors } from '@/constants/colors';

export default function Headertop({ onSearchFocus }: { onSearchFocus: () => void }) {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Hotels</Text>
            </View>
            <View style={[styles.inputWrapper, { backgroundColor: colors.background, ...shadow }]}>
                <Ionicons name="search" size={20} color={colors.muted} style={{ marginLeft: 15 }} />
                <View style={styles.input} onTouchStart={onSearchFocus}>
                    <Text style={[typography.body, { color: colors.muted }]}>
                        Search for hotels
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: spacing.lg,
        paddingBottom: spacing.md,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        ...typography.heading,
        fontWeight: '700',
    },
    inputWrapper: {
        flexDirection: 'row',
        height: 40,
        flex: 1,
        borderRadius: 30,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.brand.primary,
        marginTop: 10,
    },
    input: { flex: 1, paddingHorizontal: 10 },
});

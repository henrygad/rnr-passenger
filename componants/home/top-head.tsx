import React from 'react';
import { View, StyleSheet, Pressable, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { colors } from '@/constants/colors';

export const TopHeader = ({ onSearchFocus }: { onSearchFocus: () => void }) => {
    const { colors, shadow } = useTheme();

    return (
        <View style={styles.container}>
            <View style={[styles.inputWrapper, { backgroundColor: colors.background, ...shadow }]}>
                <Ionicons name="search" size={20} color={colors.muted} style={{ marginLeft: 15 }} />
                <View style={styles.input} onTouchStart={onSearchFocus}>
                    <Text style={[typography.body, { color: colors.muted }]}>
                        Search for distination
                    </Text>
                </View>
            </View>
            <View style={styles.noticWrapper}>
                <Pressable style={[styles.notifBtn, shadow, { backgroundColor: colors.background }]}>
                    <Ionicons
                        name="notifications"
                        size={24}
                        color={colors.primary}
                    />
                    <View style={styles.badge}>
                        <Text style={styles.noticText}>99+</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,

    },
    inputWrapper: {
        flexDirection: 'row',
        height: 40,
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.brand.primary,
    },
    input: { flex: 1, paddingHorizontal: 10 },
    noticWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    notifBtn: {
        padding: 6,
        borderRadius: 50

    },
    badge: {
        position: 'absolute',
        top: 4,
        right: 0,
        width: 'auto',
        height: 'auto',
        borderRadius: 50,
        backgroundColor: 'red',
        padding: 1,
    },
    noticText: {
        ...typography.caption,
        color: 'white',
        fontSize: 9,
        lineHeight: 9,
        paddingHorizontal: 1
    }
});
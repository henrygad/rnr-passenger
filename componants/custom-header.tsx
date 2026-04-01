import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { typography } from '@/constants/typography'
import { useTheme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CustomHeader({ Title, showReturnBtn = false, children }: { Title: string; showReturnBtn?: boolean; children?: React.ReactNode }) {
    const { colors } = useTheme();
    const router = useRouter();

    return (
        <View style={styles.headerContainer}>
            {/* Return Button icon */}
            {showReturnBtn && <View style={{ marginRight: 4 }}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </Pressable>
            </View>}
            <View>
                <Text style={[styles.mainTitle, { color: colors.text }]}>{Title}</Text>
            </View>
            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
    },
    mainTitle: { ...typography.heading, fontWeight: '700', },
})
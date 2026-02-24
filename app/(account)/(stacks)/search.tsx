import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, FlatList, Text } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/constants/theme';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import Screen from '@/componants/screen';

export default function SearchScreen() {
    const router = useRouter();
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [query, setQuery] = useState('');

    return (
        <Screen isFull={true} dissmissKeyboardOnTouchOutside={true}>
            {/* Configure animation to slide down from top */}
            <Stack.Screen
                options={{
                    headerShown: false,
                    presentation: 'transparentModal',
                    animation: 'fade', // We handle the slide animation manually below for smoother control
                }}
            />
            {/* Animated Container "Spraying" Down */}
            <Animated.View
                entering={SlideInUp.duration(300)}
                style={[styles.content, { paddingTop: insets.top + 10 }]}
            >
                {/* Header Row */}
                <View style={styles.headerRow}>
                    <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Ionicons name="search" size={20} color={colors.primary} />
                        <TextInput
                            autoFocus
                            placeholder="Where to?"
                            placeholderTextColor={colors.muted}
                            value={query}
                            onChangeText={setQuery}
                            style={[styles.input, { color: colors.text }]}
                        />
                        {query.length > 0 && (
                            <Pressable onPress={() => setQuery('')}>
                                <Ionicons name="close-circle" size={18} color={colors.muted} />
                            </Pressable>
                        )}
                    </View>

                    <Pressable onPress={() => router.back()} style={styles.cancelBtn}>
                        <Text style={[typography.button, { color: colors.primary }]}>Cancel</Text>
                    </Pressable>
                </View>

                {/* Search Results */}
                <FlatList
                    data={['Lagos International Airport', 'Eko Hotels & Suites', 'Shoprite Ikeja']}
                    keyExtractor={(item) => item}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ marginTop: 20 }}
                    renderItem={({ item }) => (
                        <Pressable style={styles.resultItem}>
                            <View style={[styles.iconBox, { backgroundColor: colors[100] }]}>
                                <Ionicons name="time" size={20} color={colors.text} />
                            </View>
                            <View>
                                <Text style={[typography.subheading, { color: colors.text, fontSize: 16 }]}>{item}</Text>
                                <Text style={[typography.caption, { color: colors.muted }]}>Lagos, Nigeria</Text>
                            </View>
                        </Pressable>
                    )}
                />
            </Animated.View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: { flex: 1, paddingHorizontal: spacing.md },
    headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 12,
        gap: 10
    },
    input: { flex: 1, fontSize: 16, fontFamily: 'InterMedium', height: '100%' },
    cancelBtn: { padding: 4 },
    resultItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 15 },
    iconBox: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
});
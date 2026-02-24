import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInLeft, FadeInRight, SlideInDown, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

export default function BookingFlowModal({ onClose }: { onClose: () => void }) {
    const { colors, shadow } = useTheme();
    const insets = useSafeAreaInsets();

    // --- State Management ---
    const [step, setStep] = useState(1);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false); // Tracks if a date is active

    // --- Date Handlers ---
    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios'); // Keep open on iOS for spinner interaction
        if (selectedDate) {
            setDate(selectedDate);
            setIsScheduled(true);
        }
    };

    const clearDate = () => {
        setIsScheduled(false);
        setDate(new Date());
    };

    return (
        <View style={styles.overlay}>
            <Animated.View
                entering={SlideInDown}
                layout={LinearTransition}
                style={[styles.modalContainer, { backgroundColor: colors.background, paddingTop: insets.top }]}
            >
                {/* Modal Handle */}
                <View style={[styles.handle, { backgroundColor: colors.border }]} />

                <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
                    {step === 1 ? (
                        <Animated.View entering={FadeInLeft} style={styles.stepContainer}>
                            <Text style={[styles.headerTitle, { color: colors.text }]}>Ride Details</Text>
                            {/* ... (Previous Location & Fleet UI) ... */}
                        </Animated.View>
                    ) : (
                        <Animated.View entering={FadeInRight} style={styles.stepContainer}>
                            <Text style={[styles.headerTitle, { color: colors.text }]}>Add a Stay</Text>
                            {/* ... (Previous Hotel UI) ... */}
                        </Animated.View>
                    )}
                </ScrollView>

                {/* --- UPDATED DYNAMIC FOOTER --- */}
                <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }, shadow]}>

                    {/* Top Row: Date Info & Clear Option */}
                    <View style={styles.dateInfoRow}>
                        {isScheduled ? (
                            <Animated.View entering={FadeInLeft} style={styles.scheduledInfo}>
                                <Ionicons name="time" size={16} color={colors.primary} />
                                <Text style={[styles.dateText, { color: colors.text }]}>
                                    {date.toLocaleDateString([], { month: 'short', day: 'numeric' })} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                                <TouchableOpacity onPress={clearDate} style={styles.clearBtn}>
                                    <Text style={[styles.clearText, { color: colors.muted }]}>Clear</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        ) : (
                            <Text style={[styles.instantText, { color: colors.muted }]}>
                                Requesting for: <Text style={{ fontWeight: '700' }}>Now</Text>
                            </Text>
                        )}
                    </View>

                    <View style={styles.footerActions}>
                        {/* CALENDAR ICON BUTTON */}
                        <TouchableOpacity
                            onPress={() => setShowPicker(true)}
                            style={[
                                styles.iconButton,
                                { borderColor: isScheduled ? colors.primary : colors.border },
                                isScheduled && { backgroundColor: colors.primary + '10' } // Light tint when active
                            ]}
                        >
                            <Ionicons
                                name={isScheduled ? "calendar-check" : "calendar-outline"}
                                size={24}
                                color={isScheduled ? colors.primary : colors.muted}
                            />
                        </TouchableOpacity>

                        {/* DYNAMIC NEXT/BOOK BUTTON */}
                        <TouchableOpacity
                            onPress={() => step === 1 ? setStep(2) : onClose()}
                            style={[styles.mainBtn, { backgroundColor: colors.primary }]}
                        >
                            <Text style={styles.mainBtnText}>
                                {isScheduled && step === 1 ? 'Schedule & Continue' : step === 1 ? 'Next: Add a Stay' : 'Confirm Booking'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Native Picker Triggered by Calendar Icon */}
                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="datetime"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onDateChange}
                        minimumDate={new Date()}
                    />
                )}
            </Animated.View>
        </View>

    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' },
    modalContainer: { height: '100%', borderTopLeftRadius: spacing.xl, borderTopRightRadius: spacing.xl },
    handle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginVertical: spacing.sm },
    stepContainer: { paddingHorizontal: spacing.lg },
    headerTitle: { ...typography.heading, fontSize: 26, marginBottom: spacing.md },

    // Footer Styles
    footer: { padding: spacing.lg, borderTopWidth: 1, paddingBottom: Platform.OS === 'ios' ? 40 : 20 },
    dateInfoRow: { marginBottom: 12, height: 24, justifyContent: 'center' },
    scheduledInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    dateText: { fontSize: 13, fontWeight: '600' },
    clearBtn: { marginLeft: 'auto', paddingHorizontal: 10, paddingVertical: 2 },
    clearText: { fontSize: 12, textDecorationLine: 'underline' },
    instantText: { fontSize: 12 },

    footerActions: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
    iconButton: { width: 55, height: 55, borderRadius: 18, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
    mainBtn: { flex: 1, height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    mainBtnText: { color: '#FFF', ...typography.button, fontWeight: '700' },
});
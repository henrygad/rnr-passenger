import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
} from "react-native";
import Animated, {
    FadeInLeft,
    LinearTransition,
    SlideInDown,
} from "react-native-reanimated";

import { useTheme } from "@/constants/theme";
import Screen from "@/componants/screen";
import { typography } from "@/constants/typography";
import DestinationInput from "@/componants/booking/destination-input";
import SelectFleet from "@/componants/booking/select-fleet";
import { HOTEL_DATA } from "@/mock-data/hotels";
import Hotelcard from "@/componants/booking/Hotel-card";
import { Ionicons } from "@expo/vector-icons";
import DatePicker from "@/componants/booking/date-picker";
import { spacing } from "@/constants/spacing";
import { Button } from "@/componants/common/button";
import { useRouter } from "expo-router";

export default function BookingFlowModal() {
    const router = useRouter();
    const { colors } = useTheme();    
    const [destination, setDestination] = useState("");
    const [stops, setStops] = useState<string[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState("1");
    const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);
    const [isHotelBooked, setIsHotelBooked] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<'datetime' | 'date' | 'time'>('date');

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios'); // iOS keeps picker open → we control it

        if (mode === 'datetime' && Platform.OS === 'ios') {
            setDate(currentDate);
            setIsScheduled(true);
            return;
        }

        if (mode === 'date' && Platform.OS === 'android') {
            setDate(currentDate);
            setMode('time');
            setShowPicker(true);
        } else if (mode === 'time') {
            setDate(currentDate);
            setIsScheduled(true);
        }

    };

    const showDatePicker = (show: boolean) => {
        setMode(Platform.OS === 'ios' ? 'datetime' : 'date');
        setShowPicker(show);
    };

    const clearDate = () => {
        setIsScheduled(false);
        setDate(new Date());
    };

    return (
        <Screen
            isFull={Platform.OS === "ios" ? true : false}
            dissmissKeyboardOnTouchOutside={true}
        >
            <Animated.View
                entering={SlideInDown.springify()}
                layout={LinearTransition}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View style={[styles.header, { borderColor: colors.border }]}>
                    {/* Show return back icon only for android */}
                    {Platform.OS === "android" && (
                        <TouchableOpacity
                            onPress={() => router.back()}
                        >
                            <Ionicons name="chevron-back-sharp" size={24} color={colors.text} />
                        </TouchableOpacity>
                    )}
                    <Text style={[styles.headerTitle, { color: colors.text }]}>
                        Where are we going?
                    </Text>
                </View>

                {/* body */}
                <View style={{ flex: 1, marginTop: 10 }}>
                    <DestinationInput
                        destination={destination}
                        setDestination={setDestination}
                        stops={stops}
                        setStops={setStops}
                    />
                    <SelectFleet
                        selectedVehicle={selectedVehicle}
                        setSelectedVehicle={setSelectedVehicle}
                    />

                    <Text style={[styles.headerSub, { color: colors.muted }]}>
                        Recommended hotels near {destination || "your destination"}
                    </Text>
                    <FlatList
                        data={HOTEL_DATA}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ gap: spacing.sm, paddingBottom: 20 }}
                        renderItem={({ item }) => (
                            <Hotelcard
                                item={item}
                                selectedHotel={selectedHotel}
                                setSelectedHotel={setSelectedHotel}
                            />
                        )}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    />
                </View>


                {/* Footer Actions */}
                <View style={[styles.footer, { backgroundColor: colors.background }]}>
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
                    <View style={styles.buttonsWrapper}>
                        <TouchableOpacity
                            onPress={() => showDatePicker(true)}
                            style={[
                                styles.calenderButton,
                                { borderColor: isScheduled ? colors.primary : colors.border },
                                isScheduled && { backgroundColor: colors.primary + '10' } // Light tint when active
                            ]}
                        >
                            <Ionicons
                                name={isScheduled ? "calendar-clear-sharp" : "calendar-outline"}
                                size={24}
                                color={isScheduled ? colors.primary : colors.muted}
                            />
                        </TouchableOpacity>
                        <Button
                            title={isHotelBooked ? "Book Ride & Rest" : "Book Ride"}
                            onPress={() => { setIsHotelBooked(!isHotelBooked) }}
                            style={{ flex: 1, borderRadius: 22, backgroundColor: colors.primary }}
                        />
                    </View>
                    <DatePicker
                        date={date}
                        showPicker={showPicker}
                        onDateChange={onDateChange}
                        mode={mode}
                    />
                    {(showPicker && Platform.OS === 'ios') &&
                        <TouchableOpacity onPress={() => showDatePicker(false)} style={styles.closeDatePicker}>
                            <Text style={styles.closeDatePickerText}>Close</Text>
                        </TouchableOpacity>}
                </View>
            </Animated.View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 3,
        borderBottomWidth: 1,
        paddingVertical: 15,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    headerTitle: { ...typography.heading, fontWeight: '700' },
    headerSub: { ...typography.body, fontSize: 14, marginTop: 15, marginBottom: 10, padding: 2 },
    footer: { paddingVertical: spacing.md, paddingBottom: Platform.OS === 'ios' ? 40 : 20 },
    dateInfoRow: { marginBottom: 12, justifyContent: 'center' },
    scheduledInfo: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingBottom: 8, paddingTop: 4 },
    dateText: { fontSize: 13, fontWeight: '600' },
    clearBtn: { marginLeft: 'auto', paddingHorizontal: 10, paddingVertical: 2 },
    clearText: { fontSize: 12, textDecorationLine: 'underline' },
    instantText: { fontSize: 12 },
    buttonsWrapper: {
        flexDirection: "row",
        gap: 18,
    },
    mainBtn: {
        height: 60,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    mainBtnText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
    calenderButton: { width: 55, height: 55, borderRadius: 18, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
    closeDatePicker: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingVertical: 2,
    },
    closeDatePickerText: {
        color: 'blue',
        ...typography.button,
        fontWeight: '500'
    },
});

import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Fragment } from "react";
import { Card } from "../common/card";
import { typography } from "@/constants/typography";

type Prop = {
    destination: string;
    setDestination: (d: string) => void;
    stops: string[];
    setStops: (s: string[]) => void;
}

export default function DestinationInput({ destination, setDestination, stops, setStops }: Prop) {
    const { colors } = useTheme();

    const addStop = () => stops.length < 2 && setStops([...stops, '']);
    const removeStop = (index: number) => setStops(stops.filter((_, i) => i !== index));

    return (
        <Card style={[styles.constainer]}>
            <View style={styles.indicator}>
                <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                <View style={[styles.line, { backgroundColor: colors.border }]} />
                {stops.map((_, i) => (
                    <Fragment key={i}>
                        <View style={[styles.dotSmall, { backgroundColor: colors.muted }]} />
                        <View style={[styles.line, { backgroundColor: colors.border }]} />
                    </Fragment>
                ))}
                <View style={[styles.square, { backgroundColor: colors.text }]} />
            </View>

            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Pickup Location"
                    placeholderTextColor={colors.muted}
                    style={[styles.input, { color: colors.text }]}
                    value={destination}
                    onChangeText={setDestination}
                />

                {stops.map((_, i) => (
                    <View key={i} style={styles.stopInputRow}>
                        <View style={[styles.divider, { backgroundColor: colors.border }]} />
                        <TextInput
                            placeholder="Stop location..."
                            placeholderTextColor={colors.muted}
                            style={[styles.input, { flex: 1, color: colors.text }]}
                            value={stops[i]}
                            onChangeText={(text) => {
                                const newStops = [...stops];
                                newStops[i] = text;
                                setStops(newStops);
                            }}
                        />
                        <TouchableOpacity onPress={() => removeStop(i)}>
                            <Ionicons name="close-circle" size={20} color={colors.muted} />
                        </TouchableOpacity>
                    </View>
                ))}

                <View>
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                    <View style={styles.lastRow}>
                        <TextInput
                            placeholder="Final Destination"
                            value={destination}
                            onChangeText={setDestination}
                            placeholderTextColor={colors.muted}
                            style={[styles.input, { flex: 1, color: colors.text }]}
                            autoFocus={!destination}
                        />
                        {stops.length < 2 && <TouchableOpacity onPress={addStop} style={styles.addStopBtn}>
                            <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
                        </TouchableOpacity>
                        }
                    </View>
                </View>

            </View>
        </Card>
    )
};

const styles = StyleSheet.create({
    constainer: { flexDirection: 'row', padding: 20, borderRadius: 24, marginBottom: 25 },
    indicator: { alignItems: 'center', width: 20, marginRight: 15, paddingVertical: 10 },
    dot: { width: 8, height: 8, borderRadius: 4 },
    dotSmall: { width: 4, height: 4, borderRadius: 2 },
    line: { width: 1.5, flex: 1, marginVertical: 4 },
    square: { width: 8, height: 8 },
    inputWrapper: { flex: 1, gap: Platform.OS === 'ios' ? 20 : 6 },
    input: { height: 'auto', ...typography.body },
    stopInputRow: { flexDirection: 'row', alignItems: 'center' },
    divider: { height: 1, marginVertical: 1, },
    lastRow: { flexDirection: 'row', alignItems: 'center' },
    addStopBtn: { marginLeft: 10 },
});
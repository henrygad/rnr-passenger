import { useTheme } from "@/constants/theme";
import { HOTEL_DATA } from "@/mock-data/hotels";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Prop = {
    item: typeof HOTEL_DATA[0];
    selectedHotel: string | null;
    setSelectedHotel: (id: string | null) => void;
}

export default function Hotelcard({ item, selectedHotel, setSelectedHotel }: Prop) {
    const { colors, } = useTheme();

    const viewHotel = (id: string) => { };

    return (
        <TouchableOpacity
            onPress={() => setSelectedHotel(item.id === selectedHotel ? null : item.id)}
            style={[
                styles.hotelCard,
                { backgroundColor: colors.card },
                selectedHotel === item.id && { borderColor: colors.primary, borderWidth: 2 }
            ]}
        >
            <Image source={{ uri: item.image }} style={styles.hotelImg} />
            <View style={styles.hotelInfo}>
                <Pressable onPress={(e) => {
                    viewHotel(item.id);
                    e.stopPropagation();
                }}>
                    <Text style={[styles.hotelName, { color: colors.text }]}>{item.name}</Text>
                </Pressable>
                <Text style={{ color: colors.muted, fontSize: 12 }}>{item.location}</Text>
                <Text style={[styles.hotelPrice, { color: colors.primary }]}>{item.price}<Text style={{ fontSize: 10, color: colors.muted }}>/night</Text></Text>
            </View>
            {selectedHotel === item.id && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} style={styles.checkIcon} />
            )}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    hotelCard: { flexDirection: 'row', padding: 12, borderRadius: 20, alignItems: 'center', borderWidth: 1.5, borderColor: 'transparent' },
    hotelImg: { width: 70, height: 70, borderRadius: 14 },
    hotelInfo: { flex: 1, marginLeft: 15 },
    hotelName: { fontWeight: '500', fontSize: 16, textDecorationLine: 'underline' },
    hotelPrice: { fontWeight: '700', marginTop: 4 },
    checkIcon: { marginLeft: 10 },
});


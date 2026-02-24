import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { Card } from '../common/card';


type Prop = {
    selectedVehicle: string;
    setSelectedVehicle: (s: string) => void;
}

export default function SelectFleet({ selectedVehicle = '1', setSelectedVehicle }: Prop) {
    const { colors } = useTheme();

    return (
        <>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Select Fleet</Text>
            <View style={styles.vehicleRow}>
                {['Economy', 'Urban', 'Elite'].map((v, i) => (
                    <TouchableOpacity
                        key={v}
                        onPress={() => setSelectedVehicle(`${i + 1}`)}
                        style={{ flex: 1 }}
                    >
                        <Card
                            style={[styles.vCard, { backgroundColor: colors.card }, selectedVehicle === `${i + 1}` && { borderColor: colors.primary, borderWidth: 1.5 }]}
                        >
                            <MaterialCommunityIcons
                                name={i === 0 ? 'car-side' : i === 1 ? 'car-hatchback' : 'car-limousine'}
                                size={28}
                                color={selectedVehicle === `${i + 1}` ? colors.primary : colors.muted}
                            />
                            <Text style={[styles.vName, { color: colors.text }]}>{v}</Text>
                        </Card>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    )
};


const styles = StyleSheet.create({
    sectionLabel: { ...typography.subheading, fontSize: 16, marginBottom: 15, fontWeight: '700' },
    vehicleRow: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
    vCard: { alignItems: 'center', borderRadius: 20 },
    vName: { fontSize: 12, fontWeight: '700', marginTop: 4 },
});
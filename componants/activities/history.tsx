import { spacing } from "@/constants/spacing";
import { useTheme } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function History({ title, date, price, type }: any) {
    const { colors } = useTheme();
    return (
        <TouchableOpacity style={[styles.historyRow, { borderBottomColor: colors.border }]}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <MaterialCommunityIcons name={type === 'ride' ? 'car' : 'bed'} size={16} color={colors.muted} />
                    <Text style={[styles.historyTitle, { color: colors.text }]}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 }}>
                    <Text style={{ color: colors.muted, fontSize: 11 }}>{date} • {price}</Text>
                    <TouchableOpacity
                        onPress={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <Text style={[styles.helpLink, { color: colors.primary }]}>Need help?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.border} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    historyRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1 },
    historyTitle: { fontSize: 14, fontWeight: '600' },
    helpLink: { fontSize: 11, fontWeight: '700' }
});
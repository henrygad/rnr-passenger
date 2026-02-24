import { spacing } from "@/constants/spacing";
import { useTheme } from "@/constants/theme";
import { typography } from "@/constants/typography";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Sectionheading({ title, icon, color, tab, setTabs }: any) {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setTabs(title.toLowerCase())}
        >
            <Ionicons name={icon} size={18} color={color} />
            <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
                {tab === title.toLowerCase() ?
                    <View style={[styles.divider, { backgroundColor: colors.light }]} /> :
                    null
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: spacing.xl,
        marginBottom: spacing.md
    },
    sectionTitle: { ...typography.subheading, fontSize: 16, fontWeight: '700' },
    divider: { height: 1, width: '50%', marginLeft: -3, marginTop: 3 },
});
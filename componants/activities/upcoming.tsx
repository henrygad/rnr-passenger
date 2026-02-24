import { useTheme } from "@/constants/theme";
import { Card } from "../common/card";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { spacing } from "@/constants/spacing";

export default function Upcoming({ type, title, time, status, fleet }: any) {
    const { colors } = useTheme();
    return (
        <Card style={styles.upcomingCard}>
            <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
                    <MaterialCommunityIcons
                        name={type === 'ride' ? 'car-clock' : 'bed'}
                        size={22}
                        color={colors.primary}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                    <Text style={[styles.itemTitle, { color: colors.text }]}>{title}</Text>
                    <Text style={{ color: colors.muted, fontSize: 12 }}>{time}</Text>
                </View>
                <View style={[styles.statusBadge, { borderColor: colors.border }]}>
                    <Text style={[styles.statusText, { color: colors.muted }]}>{status}</Text>
                </View>
            </View>

            {/* {type === 'ride' &&
                (<View style={styles.cardFooter}>
                    <View style={styles.metaInfo}>
                        <Text style={[styles.subText, { color: colors.muted }]}>
                            <Ionicons name="car-outline" size={12} /> {fleet}
                        </Text>
                    </View>
                </View>)
            } */}
        </Card>
    );
};

const styles = StyleSheet.create({
    upcomingCard: { padding: spacing.sm, },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
    iconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    itemTitle: { fontWeight: '700', fontSize: 15 },
    statusBadge: { borderWidth: 1, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
    statusText: { fontSize: 10, fontWeight: '600' },
    cardFooter: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
    metaInfo: { flexDirection: 'row', gap: 8, alignItems: 'center' },
    subText: { fontSize: 12 },
});
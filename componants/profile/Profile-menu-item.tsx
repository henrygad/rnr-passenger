import { useTheme } from "@/constants/theme";
import { typography } from "@/constants/typography";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ProfileMenuItem({ icon, label, iconBg, iconColor, index }: any) {
    const { colors, shadow } = useTheme();

    return (
        <Animated.View entering={FadeInDown.delay(200 + index * 100).springify()}>
            <TouchableOpacity
                style={[
                    styles.menuItem,
                    { backgroundColor: colors.card },
                    shadow
                ]}
            >
                <View style={styles.menuLeft}>
                    <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
                        <Ionicons name={icon} size={22} color={iconColor} />
                    </View>
                    <Text style={[styles.menuLabel, { color: colors.text }]}>{label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </TouchableOpacity>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
    },
    menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuLabel: { ...typography.subheading, fontSize: 16, fontWeight: '600' },

    // Logout
    logoutWrapper: { marginTop: 60, width: '100%', alignItems: 'center' },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 },
    logoutText: { ...typography.button, fontSize: 18, fontWeight: '600' },
});


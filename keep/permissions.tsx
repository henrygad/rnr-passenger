import { View, Text, StyleSheet, Alert, Linking } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { typography } from "@/constants/typography";
import { spacing } from "@/constants/spacing";
import { useTheme } from "@/constants/theme";
import { useLocationPermission } from "@/context/permission-context";

export default function LocationScreen() {
    const router = useRouter();
    const { colors, brand } = useTheme();

    const { locationPermissionStatus } = useLocationPermission();

    const handlePermission = async () => {
        const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();


        await locationPermissionStatus();


        if (status === "granted") {
            await AsyncStorage.setItem("hasSeenOnboarding", "true");
            router.replace("/(auth)/login");
            return;
        }

        if (!canAskAgain) {
            Alert.alert(
                "Enable Location",
                "Location access is required to use RideAndRest.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Open Settings", onPress: Linking.openSettings },
                ]
            );
            return;
        }

        Alert.alert(
            "Permission needed",
            "Location helps us find nearby drivers and hotels."
        );
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.background },
            ]}
        >
            <Text style={[styles.title, { color: colors.text }]}>
                Enable Location
            </Text>

            <Text style={[styles.subtitle, { color: colors.muted }]}>
                We use your location to show nearby drivers and hotels.
            </Text>

            <Text
                style={[
                    styles.button,
                    { backgroundColor: brand.primary, color: "#fff" },
                ]}
                onPress={handlePermission}
            >
                Allow location access
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: spacing.lg,
    },
    title: {
        ...typography.heading,
        marginBottom: spacing.md,
    },
    subtitle: {
        ...typography.body,
        marginBottom: spacing.xl,
    },
    button: {
        ...typography.button,
        paddingVertical: spacing.md,
        textAlign: "center",
        borderRadius: 8,
    },
});

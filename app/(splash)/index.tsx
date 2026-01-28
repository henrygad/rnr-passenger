
import { useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/context/auth-context";
import { colors } from "@/constants/colors";
import Screen from "@/componants/Screen";
const RNR_FULL_LOGO = require("@/assets/images/rnr-full-logo.png");

export default function SplashScreen() {
    const router = useRouter();

    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);

    const { auth } = useAuthContext();

    useEffect(() => {
        // Animation
        scale.value = withTiming(1, { duration: 800 });
        opacity.value = withTiming(1, { duration: 800 });

        // Check auth state after a delay
        const timeout = setTimeout(async () => {
            await AsyncStorage.removeItem("hasSeenOnboarding");
            const hasSeenOnboarding = (await AsyncStorage.getItem("hasSeenOnboarding")) === "true";

            if (auth.loading) {
                return null;
            } else if (!hasSeenOnboarding) {
                router.replace("/(onboarding)");
            } else if (!auth.user) {
                router.replace("/(auth)/login");
            } else if (auth.user) {
                router.replace("/(tabs)")
            }

        }, 1800);

        return () => clearTimeout(timeout);
    }, [opacity, router, scale, auth]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <Screen
            isFull
            hideStatusBar
            style={styles.container}
        >
            <Animated.View style={[styles.logoContainer, animatedStyle]}>
                <Image
                    source={RNR_FULL_LOGO}
                    style={{ width: 200, height: 60, marginTop: 10 }}
                    resizeMode="contain"
                />
            </Animated.View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.brand.light,
        alignItems: "center",
        justifyContent: "center",
    },
    logoContainer: {
        alignItems: "center",
    },
});

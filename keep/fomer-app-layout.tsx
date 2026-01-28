import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { View, ActivityIndicator } from "react-native";

function RootLayout() {
    const router = useRouter();
    const segments = useSegments();

    const [isReady, setIsReady] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
        null
    );

    // 🔹 Auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe;
    }, []);

    // 🔹 Onboarding flag
    useEffect(() => {
        (async () => {
            await AsyncStorage.removeItem("hasSeenOnboarding");

            const value = await AsyncStorage.getItem("hasSeenOnboarding");
            setHasSeenOnboarding(value === "true");
            setIsReady(true);
        })();
    }, []);

    // 🔹 Navigation guard
    useEffect(() => {
        if (!isReady || hasSeenOnboarding === null) return;

        const root = segments[0] as string;

        if (!hasSeenOnboarding && root !== "(onboarding)") {
            router.replace("/(onboarding)");
            return;
        }

        if (hasSeenOnboarding && !user && root !== "(auth)") {
            router.replace("/(auth)/login");
            return;
        }

        if (user && root !== "(tabs)") {
            router.replace("/(tabs)");

            return;
        }
    }, [isReady, hasSeenOnboarding, user, segments, router]);

    if (!isReady) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}


//  const sendOtp = async () => {
//         if (!phone.startsWith("+")) {
//             alert("Invalid phone number");
//             return;
//         }

//         try {
//             setLoading(true);

//             const provider = new PhoneAuthProvider(auth);

//             const verificationId = await provider.verifyPhoneNumber(
//                 phone,
//                 recaptchaVerifier.current!
//             );

//             router.push({
//                 pathname: "/(auth)/otp",
//                 params: { phone, verificationId },
//             });
//         } catch (error: any) {
//             Alert.alert(
//                 "Failed to send OTP",
//                 error?.message || "Please try again"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

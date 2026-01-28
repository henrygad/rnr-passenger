import { useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { signInWithPhoneNumber } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useTheme } from "@/constants/theme";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "expo-router";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import RecaptchaVerifier from "@/componants/auth/recaptcha";

export default function LoginScreen() {
    const { colors: themeColors } = useTheme();


    const router = useRouter();
    const { setConfirmation } = useAuthContext();
    const recaptchaRef = useRef<FirebaseRecaptchaVerifierModal>(null);

    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleContinue = async () => {
        if (!phone || loading) return;

        try {
            setLoading(true);
            setError("");

            const result = await signInWithPhoneNumber(
                auth,
                phone,
                recaptchaRef.current!
            );

            setConfirmation(result, phone);
            router.push("/(auth)/otp");
        } catch (e: any) {
            console.log(e);
            setError(getAuthErrorMessage(e.code));
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={[styles.container, { backgroundColor: themeColors.background, }]}>
            {/* CAPTCHA (invisible until needed) */}
            <RecaptchaVerifier
                verifierRef={recaptchaRef}
            />
            <View style={{ marginTop: spacing.xxl }}>
                <Text style={[typography.heading, { color: themeColors.text, textAlign: 'center' }]}>
                    Welcome to RideAndRest
                </Text>
                <Text style={[typography.body, { color: themeColors.muted, marginTop: spacing.xs, textAlign: 'center' }]}>
                    Enter your phone number to continue.
                </Text>
            </View>

            <View style={{ marginTop: spacing.xxl }}>
                <Text style={[typography.caption, { color: themeColors.text, marginBottom: spacing.sm, fontFamily: 'InterMedium' }]}>
                    Phone Number
                </Text>
                <TextInput
                    placeholder="+234 800 000 0000"
                    keyboardType="phone-pad"
                    value={phone}
                    editable={!loading}
                    onChangeText={setPhone}
                    placeholderTextColor={colors.gray[500]}
                    style={{
                        height: 56,
                        borderWidth: 1.5,
                        borderColor: themeColors.border,
                        borderRadius: spacing.sm,
                        paddingHorizontal: spacing.md,
                        fontSize: typography.body.fontSize,
                        color: themeColors.text,
                        backgroundColor: themeColors.card,
                        //marginBottom: spacing.lg,
                    }}
                />
                {error ? <Text style={[typography.caption, { color: colors.brand.primary, marginTop: spacing.xs, textAlign: 'center' }]}>{error}</Text> : null}
            </View>

            <Pressable
                onPress={handleContinue}
                style={({ pressed }) => ({
                    backgroundColor: colors.brand.primary,
                    height: 56,
                    borderRadius: spacing.sm,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: spacing.xl,
                    opacity: (loading || !phone) ? 0.6 : (pressed ? 0.9 : 1)
                })}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={[typography.button, { color: '#fff' }]}>Continue</Text>}
            </Pressable>
        </View >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: spacing.lg, justifyContent: "center" },

});
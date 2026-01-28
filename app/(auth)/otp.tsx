import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useTheme } from "@/constants/theme";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useAuthContext } from "@/context/auth-context";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import ResendOtp from "@/componants/auth/resend-otp";
import CustomOtpInput from "@/componants/auth/6-inputs";
import { colors as brandColor } from "@/constants/colors";
import { useRouter } from "expo-router";

export default function OtpScreen() {
    const router = useRouter();
    const { colors, brand } = useTheme();
    const { auth, setConfirmation, setLoginSuccessfully } = useAuthContext();

    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!auth.confirmation) {
        router.replace("/(auth)/login");
        return null;
    }

    const handleVerify = async () => {
        try {
            if (code.length !== 6) return;
            setLoading(true);
            setError("");

            if (!auth.confirmation) {
                setError("Session expired. Please try again.");
                return;
            }

            await auth.confirmation.confirm(code);
            setConfirmation(null);
            setLoginSuccessfully(true);

        } catch (e: any) {
            console.log(e);
            setError(getAuthErrorMessage(e.code));
            setLoading(false);
        }
    };


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[typography.heading, { color: colors.text, textAlign: 'center' }]}>Enter Code</Text>
            <Text style={[typography.body, { color: colors.muted, marginBottom: spacing.xl, textAlign: 'center' }]}>
                We sent a 6-digit code to {auth.phoneNumber}
            </Text>

            <CustomOtpInput code={code} setCode={setCode} />

            {error ? (
                <Text style={[typography.caption, { color: brandColor.brand.primary, textAlign: 'center', marginBottom: spacing.md }]}>
                    {error}
                </Text>
            ) : null}

            <Pressable
                onPress={handleVerify}
                disabled={loading || code.length < 6}
                style={({ pressed }) => [
                    styles.button,
                    {
                        backgroundColor: brand.primary,
                        opacity: (loading || code.length < 6) ? 0.5 : (pressed ? 0.9 : 1)
                    }
                ]}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={[typography.button, { color: "#fff" }]}>Verify</Text>}
            </Pressable>

            <View style={{ marginTop: spacing.xl }}>
                <ResendOtp />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: spacing.lg, justifyContent: "center" },
    button: { paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' },
});


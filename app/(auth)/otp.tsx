import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/constants/theme";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useAuthContext } from "@/context/auth-context";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import ResendOtp from "@/componants/auth/resend-otp";
import CustomOtpInput from "@/componants/auth/6-inputs";
import Screen from "@/componants/screen";
import { Image } from "expo-image";
import { Button } from "@/componants/common/Button";
import { useRouter } from "expo-router";

export default function OtpScreen() {    
    const router = useRouter();
    const { colors } = useTheme();
    const { auth, setConfirmation } = useAuthContext();

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
        } catch (e: any) {
            console.log(e);
            setError(getAuthErrorMessage(e.code));
            setLoading(false);
        } finally {
            setCode("");
        }
    };


    return (
        <Screen
            style={{ backgroundColor: "#FFFFFF", padding: spacing.lg }}
            dissmissKeyboardOnTouchOutside={true}
            StatusBarStyle="default"
        >
            <View style={[styles.container]}>

                <View style={{ marginTop: spacing.xxl }}>
                    {/* Logo */}
                    <Image
                        source={require("@/assets/images/logo-icon.png")}
                        style={{ width: 64, height: 85, alignSelf: 'center', marginBottom: spacing.lg }}
                        contentFit="contain"
                    />

                    {/* Title */}
                    <Text style={[
                        typography.heading,
                        { color: colors.secondary, fontWeight: "700", marginTop: spacing.md, textAlign: 'center' }
                    ]}>
                        Enter Code
                    </Text>

                    {/* Subtitle */}
                    <Text style={[
                        typography.body,
                        { color: colors[700], marginTop: spacing.sm, textAlign: 'center' }
                    ]}>
                        We sent a 6-digit code to {auth.phoneNumber}
                    </Text>
                </View>

                <View style={{ marginTop: spacing.xxl }}>
                    {/* OTP Input */}
                    <CustomOtpInput code={code} setCode={setCode} />
                    {error &&
                        <Text style={[typography.caption, { color: colors.primary, marginTop: 4, textAlign: 'center' }]}>
                            {error}
                        </Text>
                    }
                </View>

                <View style={{ marginTop: spacing.lg }}>
                    {/* Button */}
                    <Button
                        title="Verify"
                        onPress={handleVerify}
                        loading={(loading)}
                        disabled={code.length < 6}
                        variant="secondary"
                    />
                </View>

                <View style={{ marginTop: spacing.xl }}>
                    {/* Resend OTP */}
                    <ResendOtp />
                </View>
            </View>

        </Screen>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

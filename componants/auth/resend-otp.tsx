import { View, Text, TouchableOpacity } from "react-native";
import { signInWithPhoneNumber } from "firebase/auth";
import { useResendTimer } from "@/hooks/use-resend-timer";
import { useAuthContext } from "@/context/auth-context";
import { auth as firebaseAuth } from "@/lib/firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useRef, useState } from "react";
import { spacing } from "@/constants/spacing";
import { colors } from "@/constants/colors";
import RecaptchaVerifier from "./recaptcha";
import { getAuthErrorMessage } from "@/lib/auth-errors";

export default function ResendOtp() {
    const { auth, setConfirmation } = useAuthContext();
    const recaptchaRef = useRef<FirebaseRecaptchaVerifierModal>(null);
    const { secondsLeft, canResend, reset } = useResendTimer(60);
    const [error, setError] = useState("");

    async function resendCode() {
        if (!auth.phoneNumber) return;
        try {
            const confirmation = await signInWithPhoneNumber(
                firebaseAuth,
                auth.phoneNumber,
                recaptchaRef.current!
            );

            setConfirmation(confirmation);
            reset();
        } catch (e: any) {
            console.log(e);
            setError(getAuthErrorMessage(e.code));
        }
    }

    return (
        <View style={{ marginTop: spacing.md, alignItems: "center" }}>
            {/* CAPTCHA (invisible until needed) */}
            <RecaptchaVerifier
                verifierRef={recaptchaRef}
            />

            {!canResend ? (
                <Text style={{ color: colors.light.muted }}>
                    Resend code in {secondsLeft}s
                </Text>
            ) : (
                <TouchableOpacity onPress={resendCode}>
                    <Text
                        style={{
                            color: colors.brand.primary,
                            fontWeight: "600",
                            marginTop: spacing.sm,
                        }}
                    >
                        Resend code
                    </Text>
                </TouchableOpacity>
            )}
            {error ? <Text>{error}</Text> : null}
        </View>
    );
}

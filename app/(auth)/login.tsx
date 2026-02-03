import { useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,    
    StyleSheet,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { signInWithPhoneNumber } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { useTheme } from "@/constants/theme";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "expo-router";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import RecaptchaVerifier from "@/componants/auth/recaptcha";
import Screen from "@/componants/screen";
import { Image } from "expo-image";
import { Button } from "@/componants/common/Button";
import { Controller, useForm } from "react-hook-form";
import { formatPhoneNumber } from "@/helper/format-phone-number";


export default function LoginScreen() {
    const { colors } = useTheme();
    const router = useRouter();
    const { setConfirmation } = useAuthContext();
    const recaptchaRef = useRef<FirebaseRecaptchaVerifierModal>(null);

    const [loading, setLoading] = useState(false);

    const { control, watch, handleSubmit, setError, } = useForm({
        defaultValues: { phone: '' }
    });

    const handleContinue = async (data: { phone: string }) => {
        if (!data.phone || loading) return;

        const phone = formatPhoneNumber(data.phone);

        // Now check if after formatting, it meets your requirements
        if (phone.length < 14) { // +234 + 10 digits = 14
            setError("phone", { message: "Please enter a complete phone number" });
            return;
        }        

        try {
            setLoading(true);
            setError("phone", { message: "" });

            const result = await signInWithPhoneNumber(
                auth,
                phone,
                recaptchaRef.current!
            );

            setConfirmation(result, phone);
            router.push("/otp");
        } catch (e: any) {
            console.log(e);
            setError("phone", { message: getAuthErrorMessage(e.code) });
        } finally {
            setLoading(false);
        }
    };   

    return (
        <Screen
            style={{ backgroundColor: "#FFFFFF", padding: spacing.lg }}
            dissmissKeyboardOnTouchOutside={true}
            StatusBarStyle="default"
        >
            <View style={[styles.container]}>
                {/* CAPTCHA (invisible until needed) */}
                <RecaptchaVerifier
                    verifierRef={recaptchaRef}
                />

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
                        Welcome
                    </Text>

                    {/* Subtitle */}
                    <Text style={[
                        typography.body,
                        { color: colors[700], marginTop: spacing.sm, textAlign: 'center' }
                    ]}>
                        Enter your phone number to continue.
                    </Text>
                </View>

                <View style={{ marginTop: spacing.xxl }}>
                    {/* Phone number input */}
                    <Controller
                        control={control}
                        name="phone"
                        rules={{
                            required: 'Phone number is required',
                            minLength: {
                                value: 11,
                                message: 'Phone number must be at least 11 digits'
                            },
                            // pattern: {
                            //     // This regex ensures it's a valid international format
                            //     value: /^\+?[1-9]\d{1,14}$/,
                            //     message: 'Please enter a valid phone number'
                            // }
                        }}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <View style={{ marginBottom: spacing.md }}>
                                <Text style={[typography.caption, { color: colors[700], marginBottom: spacing.xs }]}>
                                    Phone Number
                                </Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        {
                                            color: colors[700],
                                            borderColor: error ? colors.primary : colors.secondary
                                        }
                                    ]}
                                    editable={!loading}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="+234 800 000 0000"
                                    placeholderTextColor={colors[700]}
                                    keyboardType="phone-pad"
                                />
                                {error &&
                                    <Text style={[typography.caption, { color: colors.primary, marginTop: 4, textAlign: 'center' }]}>
                                        {error.message}
                                    </Text>
                                }
                            </View>
                        )}
                    />
                </View>

                <View style={{ marginTop: spacing.lg }}>
                    {/* Button */}
                    <Button
                        title="Continue"
                        onPress={handleSubmit(handleContinue)}
                        loading={(loading)}
                        disabled={!watch("phone")}
                        variant="secondary"
                    />
                </View>
            </View >

        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderWidth: 1.5,
        borderRadius: spacing.md,
        height: 56,
        paddingHorizontal: spacing.md,
        ...typography.body
    }
});
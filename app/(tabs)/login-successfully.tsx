import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthContext } from '@/context/auth-context'
import { Redirect } from 'expo-router';
import { typography } from '@/constants/typography';
import { Image } from 'expo-image';
import { spacing } from '@/constants/spacing';
import { useTheme } from '@/constants/theme';

export default function LoginSuccessfully() {
    const { auth, setLoginSuccessfully } = useAuthContext();
    const { colors } = useTheme();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (auth.loginSuccessfully) {
                setLoginSuccessfully(false)
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [auth.loginSuccessfully, setLoginSuccessfully]);



    if (!auth.loginSuccessfully) {
        return <Redirect href="/(tabs)" />
    }

    return (
        <View style={[styles.container]}>
            <Image
                source={require('@/assets/gifs/success.gif')}
                style={{ width: 200, height: 200 }}
                contentFit="contain"
            />
            <Text style={[typography.heading, { color: colors.text, marginTop: spacing.lg }]}>Verified!</Text>
            <Text style={[typography.body, { color: colors.muted, textAlign: 'center' }]}>Welcome to RideAndRest</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: spacing.lg, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
});

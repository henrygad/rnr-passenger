import { View, Text, Button } from 'react-native'
import React from 'react'
import { Redirect, useRouter } from 'expo-router';
import { useAuthContext } from '@/context/auth-context';

export default function Index() {
    const router = useRouter();
    const { auth } = useAuthContext();

    // If just logined in, redirect to login-successfully
    if (auth.loginSuccessfully) {
        return <Redirect href="/login-successfully" />;
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tabs</Text>

            <View style={{ marginTop: 20 }}>
                <Button title="Go to about" onPress={() => router.push("/about")} />
            </View>
            <View style={{ marginTop: 20 }}>
                <Button title="Go to settings" onPress={() => router.push("/settings")} />
            </View>
            <View style={{ marginTop: 20 }}>
                <Button title="Go to login-successfully" onPress={() => router.push("/login-successfully")} />
            </View>
            <View style={{ marginTop: 20 }}>
                <Button title="View map" onPress={() => router.push("/map")} />
            </View>
            <View style={{ marginTop: 20 }}>
                <Button title="View payment" onPress={() => router.push("/payment")} />
            </View>
        </View>
    )
}
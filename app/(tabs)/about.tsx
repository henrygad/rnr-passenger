import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

export default function AboutScreen() {
    const router = useRouter();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tabs</Text>

            <View style={{ marginTop: 20 }}>
                <Button title="Go to Login" onPress={() => router.push("/(auth)/login")} />
            </View>
        </View>
    )
}
import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

export default function Hotels() {
    const router = useRouter();

    return (
        <View>
            <Text>Hotels</Text>
            <View style={{ marginTop: 20 }}>
                <Button title="Settings" onPress={() => router.push("/(account)/(stacks)/settings")} />
            </View>
        </View>
    )
}
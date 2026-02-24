
import React from 'react'
import { Stack } from 'expo-router'

export default function StacksLayout() {
    return <Stack>
        <Stack.Screen
            name="Setttings"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="Search"
            options={{
                headerShown: false,
            }}
        />
    </Stack>
}
import { useAuthContext } from "@/context/auth-context";
import { Stack, Redirect } from "expo-router";

export default function TabsLayout() {
    const { auth } = useAuthContext();

    if (auth.loading) {
        return null;
    }

    // If not logged in, redirect to login
    if (!auth.user) {
        return <Redirect href="/(auth)/login" />;
    }


    // Continue to the app
    return (
        <Stack>
            {/* The main app content */}
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* The Modal Group */}
            <Stack.Screen
                name="(modals)/booking"
                options={{
                    presentation: 'modal', // Native iOS card look
                    headerShown: false,    // We build our own premium header
                    animation: 'slide_from_bottom' // Premium entry
                }}
            />
        </Stack>
    )
}


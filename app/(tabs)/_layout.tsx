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
    return <Stack screenOptions={{ headerShown: false }} />;
}

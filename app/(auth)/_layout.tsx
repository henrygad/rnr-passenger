import { useAuthContext } from "@/context/auth-context";
import { Stack, Redirect } from "expo-router";

export default function AuthLayout() {
    const { auth } = useAuthContext();

    if (auth.user) {
        return <Redirect href="/(account)" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}


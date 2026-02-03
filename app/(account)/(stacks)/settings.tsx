import { View, Text, Pressable } from "react-native";
import { useAuthContext } from "@/context/auth-context";
import { useState } from "react";

export default function SettingsScreen() {
    const { logout } = useAuthContext();
    const [loading, setLoading] = useState(false);



    const handleLogout = () => {
        try {
            setLoading(true);
            logout();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={handleLogout} disabled={loading}>
                <Text>{loading ? "Logging out..." : "Log out"}</Text>
            </Pressable>
        </View>
    );
}

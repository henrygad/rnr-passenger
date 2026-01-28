import { View, Text, Pressable } from "react-native";
import { useAuthContext } from "@/context/auth-context";

export default function SettingsScreen() {
    const { logout } = useAuthContext();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={logout}>
                <Text>Log out</Text>
            </Pressable>
        </View>
    );
}

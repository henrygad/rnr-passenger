import { AuthProvider } from "@/context/auth-context";
import { Slot } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {


  return (
    <AuthProvider>     
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>     
    </AuthProvider>
  );
}

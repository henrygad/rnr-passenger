import { AuthProvider } from "@/context/auth-context";
// import { LocationProvider } from "@/context/location-context";
// import { LocationPermissionProvider } from "@/context/permission-context";
import { Slot } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* <LocationPermissionProvider> */}
      {/* <LocationProvider> */}
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
      {/* </LocationProvider> */}
      {/* </LocationPermissionProvider> */}
    </AuthProvider>
  );
}

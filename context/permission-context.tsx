import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

type LocationPermissionStatus =
    | "unknown"
    | "granted"
    | "denied"
    | "blocked";

type PermissionContextType = {
    locationStatus: LocationPermissionStatus;
    locationPermissionStatus: () => Promise<void>;
};

const PermissionContext = createContext<PermissionContextType | undefined>(
    undefined
);


export function LocationPermissionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [locationStatus, setLocationStatus] = useState<LocationPermissionStatus>("unknown");

    async function locationPermissionStatus() {
        const result = await Location.getForegroundPermissionsAsync();

        if (result.status === "granted") {
            setLocationStatus("granted");
        } else if (result.canAskAgain === false) {
            setLocationStatus("blocked");
        } else {
            setLocationStatus("denied");
        }
    };

    useEffect(() => {
        locationPermissionStatus();
    }, []);

    return (
        <PermissionContext.Provider
            value={{ locationStatus, locationPermissionStatus }}
        >
            {children}
        </PermissionContext.Provider>
    );
}

export function useLocationPermission() {
    const ctx = useContext(PermissionContext);
    if (!ctx) {
        throw new Error("useLocationPermission must be used within LocationPermissionProvider");
    }
    return ctx;
}

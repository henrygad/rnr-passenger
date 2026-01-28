import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

type LocationState = {
    latitude: number | null;
    longitude: number | null;
    loading: boolean;
    error?: string;
};

type LocationContextType = {
    location: LocationState;
    refreshLocation: () => Promise<void>;
};

const LocationContext = createContext<LocationContextType | undefined>(
    undefined
);

export function LocationProvider({ children }: { children: React.ReactNode }) {
    const [location, setLocation] = useState<LocationState>({
        latitude: null,
        longitude: null,
        loading: true,
    });

    const getLocation = async () => {
        try {
            setLocation((prev) => ({ ...prev, loading: true }));

            const pos = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            setLocation({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                loading: false,
            });
        } catch (e) {
            console.log(e);
            setLocation({
                latitude: null,
                longitude: null,
                loading: false,
                error: "Unable to get location",
            });
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <LocationContext.Provider
            value={{
                location,
                refreshLocation: getLocation,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}

export function useLocationContext() {
    const ctx = useContext(LocationContext);
    if (!ctx) {
        throw new Error("useLocationContext must be used within LocationProvider");
    }
    return ctx;
}

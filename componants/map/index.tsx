// 1. Add 'Text' to your react-native imports
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { memo } from "react";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/constants/theme";
import { darkMapStyle, googleMapStyle } from "./map-style";

interface MapProps {
    location: Location.LocationObject | null;
    mapRef: React.RefObject<MapView | null>;
    useDarkStyle?: boolean;
}

function ConfigMap({ location, mapRef, useDarkStyle }: MapProps) {
    const { isDark, colors } = useTheme();


    const ghostCars = [
        { id: 1, lat: (location?.coords.latitude || 6.5244) + 0.002, lng: (location?.coords.longitude || 3.3792) + 0.002 },
        { id: 2, lat: (location?.coords.latitude || 6.5244) - 0.002, lng: (location?.coords.longitude || 3.3792) + 0.001 },
        { id: 3, lat: (location?.coords.latitude || 6.5244) + 0.001, lng: (location?.coords.longitude || 3.3792) - 0.002 },
    ];


    return (
        <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFill}
            customMapStyle={useDarkStyle ? (isDark ? darkMapStyle : googleMapStyle) : googleMapStyle}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={{
                latitude: location?.coords.latitude ?? 6.5244,
                longitude: location?.coords.longitude ?? 3.3792,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
            }}
        >
            {ghostCars.map(car => (
                <Marker key={car.id} coordinate={{ latitude: car.lat, longitude: car.lng }}>
                    <Ionicons name="car-sport" size={26} color={colors.primary} />
                </Marker>
            ))}
        </MapView>
    );
}

const Map = memo(ConfigMap);

export default Map;




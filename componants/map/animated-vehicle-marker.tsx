import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { Marker, AnimatedRegion, MapMarker } from "react-native-maps";

type Props = {
    latitude: number;
    longitude: number;
};

export function AnimatedVehicleMarker({ latitude, longitude }: Props) {
    const markerRef = useRef<MapMarker>(null);

    const coordinate = useRef(
        new AnimatedRegion({
            latitude,
            longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
        })
    ).current;

    useEffect(() => {
        const next = {
            latitude, longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
        };

        if (Platform.OS === "android") {
            markerRef.current?.animateMarkerToCoordinate(next, 800);
        } else {
            coordinate.setValue(next);
        }
    }, [latitude, longitude, coordinate]);

    return (
        <Marker.Animated
            ref={markerRef}
            coordinate={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            }}
        />
    );
}

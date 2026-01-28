// 1. Add 'Text' to your react-native imports
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/constants/theme";
import { googleMapStyle } from "./map-style";

export function IdleMap() {
    const { colors } = useTheme();
    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [address, setAddress] = useState<string>("Locating you..."); // New State
    const [loading, setLoading] = useState(true);

    // 2. Function to turn coordinates into a Street Name
    const reverseGeocode = async (lat: number, lon: number) => {
        try {
            const reverseResult = await Location.reverseGeocodeAsync({
                latitude: lat,
                longitude: lon,
            });

            if (reverseResult.length > 0) {
                const item = reverseResult[0];
                // Formats the address to look professional for RNR
                const name = item.streetNumber
                    ? `${item.street} ${item.streetNumber}, ${item.district || item.city}`
                    : `${item.street || item.name}, ${item.district || item.city}`;

                setAddress(name);
            }
        } catch (error) {
            console.log("Geocode error:", error);
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setLoading(false);
                return;
            }

            const current = await Location.getCurrentPositionAsync({});
            setLocation(current);
            reverseGeocode(current.coords.latitude, current.coords.longitude);
            setLoading(false);

            await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.BestForNavigation,
                    distanceInterval: 15, // Update address every 15 meters
                },
                (newLocation) => {
                    setLocation(newLocation);
                    reverseGeocode(newLocation.coords.latitude, newLocation.coords.longitude);

                    mapRef.current?.animateCamera({
                        center: {
                            latitude: newLocation.coords.latitude,
                            longitude: newLocation.coords.longitude,
                        },
                        pitch: 45,
                        zoom: 18,
                    }, { duration: 1000 });
                }
            );
        })();
    }, []);

    if (loading) {
        return (
            <View style={[styles.loader, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color="#FF6600" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFill}
                customMapStyle={googleMapStyle}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={false}
                initialRegion={{
                    latitude: location?.coords.latitude ?? 6.5244,
                    longitude: location?.coords.longitude ?? 3.3792,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                }}
            />

            {/* 3. The Floating Location Header */}
            <View style={styles.addressContainer}>
                <View style={styles.addressCard}>
                    <View style={styles.orangeDot} />
                    <Text numberOfLines={1} style={styles.addressText}>
                        {address}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={[styles.myLocationButton, { backgroundColor: colors.background }]}
                onPress={() => {
                    if (location) mapRef.current?.animateToRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                    })
                }}
            >
                <Ionicons name="locate" size={24} color="#FF6600" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loader: { flex: 1, alignItems: "center", justifyContent: "center" },
    // Address Header Styles
    addressContainer: {
        position: 'absolute',
        top: 60, // Sits below the notch/status bar
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    addressCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    orangeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF6600',
        marginRight: 12,
    },
    addressText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
        flex: 1,
    },
    myLocationButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        padding: 12,
        borderRadius: 30,
        elevation: 5,
    }
});
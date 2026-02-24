import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import * as Location from "expo-location";

import Screen from '@/componants/screen';
import { TopHeader } from '@/componants/home/top-head';
import { useRouter } from 'expo-router';
import Map from '@/componants/map';
import { useTheme } from '@/constants/theme';
import { LocateButton } from '@/componants/map/location-button';
import BottomSheetComponent from '@/componants/home/Bottom-sheet';

export default function HomeScreen() {
    const router = useRouter();

    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState<string>("Locating...");

    const { colors } = useTheme();


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
            <Screen
                isFull={true}    
                style={styles.loader}
            >
                <ActivityIndicator size="large" color={colors.primary} />
            </Screen>
        );
    }


    const handleLocateUser = () => {
        if (location) {
            mapRef.current?.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
            })
        }
    };


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* isFull={true} allows map to bleed under Status Bar and Tabs */}
            <Screen
                isFull={true}
                style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                StatusBarStyle='dark-content'                
            >
                <View style={styles.container}>
                    <Map location={location} mapRef={mapRef} useDarkStyle={false} />

                    {/* This is the regular floating header */}
                    <TopHeader
                        onSearchFocus={() => router.push('/(account)/(stacks)/search')}
                    />

                    <LocateButton onPress={handleLocateUser} />

                    <BottomSheetComponent />
                </View>
            </Screen>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loader: { flex: 1, alignItems: "center", justifyContent: "center" },
});

import React, { useState } from 'react';
import { View, FlatList, Platform } from 'react-native';
import Screen from '@/componants/screen';
import HotelSmallCard from '@/componants/hotel/hotel-small-card';
import { HOTEL_DATA } from '@/data/hotels';
import Headertop from '@/componants/hotel/top-header';
import { useRouter } from 'expo-router';


export default function HotelSearchScreen() {
    const router = useRouter();
    const onSearchFocus = () => {
        router.push("/(account)/(stacks)/search");
    };
    const [showStickingHeaderWhenScrollingUp, setShowStickingHeaderWhenScrollingUp] = useState(false);

    return (
        <Screen>
            <FlatList
                data={HOTEL_DATA}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<Headertop onSearchFocus={onSearchFocus} />}
                renderItem={({ item, index }) => (
                    // PASS THE INDEX HERE
                    <HotelSmallCard item={item} index={index} />
                )}
                // contentContainerStyle={{ paddingHorizontal: 15 }} // Add horizontal padding for breathability
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View style={{ height: Platform.OS === 'ios' ? 100 : 105, }}></View>
                }
            // style={{ backgroundColor: 'red' }}
            />
        </Screen>
    );
};


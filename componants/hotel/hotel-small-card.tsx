import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { Image } from 'expo-image'
import { Card } from '../common/card'
import { HOTEL_DATA } from '@/data/hotels'
import { useTheme } from '@/constants/theme'
import { spacing } from '@/constants/spacing'
import { typography } from '@/constants/typography'

type Props = {
    item: typeof HOTEL_DATA[0];
    index: number;
}

export default function HotelSmallCard({ item, index }: Props) {
    const { colors } = useTheme();

    const buttonScale = useSharedValue(1);
    const buttonAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: buttonScale.value }]
    }));

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify().damping(12)}
            style={{ marginBottom: spacing.md }}
        >
            <Card style={[styles.cardContainer, { backgroundColor: colors.light }]}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                    contentFit="cover"
                    transition={500}
                />

                <View style={styles.detailsContainer}>
                    <Text style={styles.hotelName}>{item.name}</Text>

                    <View style={styles.locationRow}>
                        <View style={styles.greenDotContainer}>
                            <View style={styles.greenDot} />
                        </View>
                        <Text style={styles.locationText}>{item.location}</Text>
                    </View>

                    <Text style={styles.priceText}>
                        {item.price}<Text style={{ fontSize: 12, fontWeight: '400' }}>/night</Text>
                    </Text>

                    <View style={styles.amenitiesRow}>
                        <Image source={require('@/assets/images/shaway-icon.png')} style={styles.icon} contentFit='contain' />
                        <Image source={require('@/assets/images/wifi-icon.png')} style={styles.icon} contentFit='contain' />
                        <Image source={require('@/assets/images/tv-icon.png')} style={styles.icon} contentFit='contain' />
                    </View>
                </View>

                {/* Vertical Button */}
                <Pressable
                    onPressIn={() => (buttonScale.value = withSpring(0.9))}
                    onPressOut={() => (buttonScale.value = withSpring(1))}
                >
                    <Animated.View style={[styles.bookBtn, { backgroundColor: colors.primary }, buttonAnimatedStyle]}>
                        {/* FIX: We wrap the text in a View that is WIDER than the button.
                           When we rotate this wrapper, it fits perfectly.
                        */}
                        <View style={styles.labelContainer}>
                            <Text style={styles.bookBtnText}>Book Now</Text>
                        </View>
                    </Animated.View>
                </Pressable>

            </Card>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        height: 140,
        borderRadius: 30,
        overflow: 'hidden',
        borderTopRightRadius: 8,
        borderBottomEndRadius: 8,
        padding: 0,
    },
    cardImage: { width: '35%', height: '100%' },
    detailsContainer: { flex: 1, padding: spacing.md, justifyContent: 'space-between' },
    hotelName: { ...typography.subheading, fontWeight: '700' },
    locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    greenDotContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 13, height: 13, borderRadius: 50, backgroundColor: '#6ee7c53b' },
    greenDot: { width: 8, height: 8, borderRadius: 50, backgroundColor: '#6EE7B7' },
    locationText: { fontFamily: typography.body.fontFamily, fontSize: 13 },
    priceText: { fontFamily: typography.heading.fontFamily, fontSize: 15, fontWeight: '600' },
    amenitiesRow: { flexDirection: 'row', gap: 15, marginTop: 4 },
    icon: { width: 16, height: 16 },

    // === UPDATED BUTTON STYLES ===
    bookBtn: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // We do NOT overflow hidden here, or it clips the wrapper before rotation
        overflow: 'visible',
    },
    labelContainer: {
        // 1. Make this container as wide as the CARD HEIGHT (140)
        width: 140,
        // 2. Make the height matching the BUTTON WIDTH (50)
        height: 50,
        // 3. Center the text inside
        justifyContent: 'center',
        alignItems: 'center',
        // 4. Rotate this container
        transform: [{ rotate: '-90deg' }],
    },
    bookBtnText: {
        color: '#FFF',
        ...typography.button,
        fontWeight: '600',
        // Remove individual transforms and widths from here
    },
});
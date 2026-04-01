import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons' // For the star icon
import { Card } from '@/componants/common/card'
import { HOTEL_DATA } from '@/mock-data/hotels'
import { useTheme } from '@/constants/theme'
import { spacing } from '@/constants/spacing'
import { typography } from '@/constants/typography'

type Props = {
    item: typeof HOTEL_DATA[0];
    index: number;
}

export default function HotelSmallCard({ item, index }: Props) {
    const { colors } = useTheme();  

    return (
        // <Animated.View
        //     entering={FadeInDown.delay(index * 100).springify().damping(15)}
        // >
            <Card style={[styles.cardContainer, { backgroundColor: colors.background }]}>
                {/* Image Section */}
                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.cardImage}
                        contentFit="cover"
                        transition={500}
                    />
                    {/* Rating Star Badge */}
                    <View style={[styles.ratingBadge, { backgroundColor: 'rgba(255,255,255,0.9)' }]}>
                        <Ionicons name="star" size={10} color="#FFB800" />
                        <Text style={styles.ratingText}>4.8</Text>
                    </View>
                </View>

                {/* Content Section */}
                <View style={styles.detailsContainer}>
                    <View>
                        <Text style={[styles.hotelName, { color: colors.text }]} numberOfLines={1}>
                            {item.name}
                        </Text>

                        <View style={styles.locationRow}>
                            <Ionicons name="location-sharp" size={12} color={colors.primary} />
                            <Text style={[styles.locationText, { color: colors.muted }]}>
                                {item.location}
                            </Text>
                        </View>
                    </View>
                    {/* Amenities Row including Shower Icon */}
                    <View style={styles.amenitiesRow}>
                        <View style={[styles.iconTag, { backgroundColor: colors.card }]}>
                            <Image source={require('@/assets/images/shaway-icon.png')} style={styles.icon} contentFit='contain' />
                        </View>
                        <View style={[styles.iconTag, { backgroundColor: colors.card }]}>
                            <Image source={require('@/assets/images/wifi-icon.png')} style={styles.icon} contentFit='contain' />
                        </View>
                        <View style={[styles.iconTag, { backgroundColor: colors.card }]}>
                            <Image source={require('@/assets/images/tv-icon.png')} style={styles.icon} contentFit='contain' />
                        </View>
                    </View>

                    <View style={styles.bottomInfo}>
                        <Text style={[styles.priceText, { color: colors.text }]}>
                            {item.price}
                        </Text>
                        <Text style={[styles.perNight, { color: colors.muted }]}>per night</Text>                        
                    </View>
                </View>

                {/* Vertical Button */}
                <TouchableOpacity
                    style={[styles.bookBtn, { backgroundColor: colors.primary }]}
                >                    
                        <View style={styles.labelContainer}>
                        <Text style={styles.bookBtnText}>BOOK NOW</Text>
                    </View>                 
                </TouchableOpacity>
            </Card>
        // </Animated.View>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        height: 120, // Increased slightly to accommodate 3 rows of info comfortably
        borderRadius: 24,
        overflow: 'hidden',
        padding: 0,
        marginBottom: spacing.md,
    },
    imageWrapper: {
        width: '32%',
        height: '88%',
        alignSelf: 'center',
        marginLeft: 8,
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative'
    },
    cardImage: { width: '100%', height: '100%' },
    ratingBadge: {
        position: 'absolute',
        top: 6,
        left: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 8,
    },
    ratingText: { fontSize: 10, fontWeight: '800', color: '#111' },
    detailsContainer: {
        flex: 1,
        paddingVertical: spacing.sm + 4,
        paddingHorizontal: spacing.md,
        justifyContent: 'space-between'
    },
    hotelName: {
        ...typography.subheading,
        fontSize: 16,
        fontWeight: '800',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2
    },
    locationText: {
        fontFamily: typography.caption.fontFamily,
        fontSize: 12
    },
    bottomInfo: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 6,
    },
    priceText: {
        fontFamily: typography.heading.fontFamily,
        fontSize: 15,
        fontWeight: '700'
    },
    perNight: {
        fontSize: 10,
        marginTop: -2
    },
    amenitiesRow: {
        flexDirection: 'row',
        gap: 4
    },
    iconTag: {
        padding: 6,
        borderRadius: 10,
    },
    icon: { width: 11, height: 11 },

    bookBtn: {
        width: 44,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelContainer: {
        width: 130,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '-90deg' }],
    },
    bookBtnText: {
        color: '#FFF',
        fontSize: 10,
        fontFamily: typography.button.fontFamily,
        fontWeight: '900',
        letterSpacing: 1,
    },
});
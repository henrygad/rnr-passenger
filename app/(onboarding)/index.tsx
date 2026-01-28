import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Animated, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import { useRouter } from 'expo-router';

// Branded Constants
import { useTheme } from '@/constants/theme';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import Screen from '@/componants/Screen';

const { width } = Dimensions.get('window');
const AUTO_SLIDE_INTERVAL = 3000; // 3 Seconds as requested

const ONBOARDING_DATA = [
    {
        id: '1',
        title: 'Travel & Hospitality',
        description: 'Move freely. Rest easily. Wherever life takes you, we make sure you get there comfortably',
        gif: require('@/assets/gifs/onboarding1.gif'),
    },
    {
        id: '2',
        title: 'Lifestyle & Convenience',
        description: 'Rest easy with our premium hospitality services and secondary care.',
        gif: require('@/assets/gifs/onboarding2.gif'),
    },
    {
        id: '3',
        title: 'Get Started',
        description: 'Ready to begin your journey? Join us today and explore more.',
        gif: require('@/assets/gifs/onboarding3.gif'),
    },
];

export default function OnboardingSwiper() {
    const { colors, brand } = useTheme();
    const router = useRouter();

    const [isReady, setIsReady] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // --- Timer Management ---
    const stopAutoSlide = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    const startAutoSlide = useCallback(() => {
        stopAutoSlide();
        timerRef.current = setInterval(() => {
            const isLastSlide = currentIndex === ONBOARDING_DATA.length - 1;
            if (!isLastSlide) {
                flatListRef.current?.scrollToIndex({
                    index: currentIndex + 1,
                    animated: true,
                });
            } else {
                // Optional: Loop back to start or stop
                stopAutoSlide();
            }
        }, AUTO_SLIDE_INTERVAL);
    }, [currentIndex, stopAutoSlide]);

    // --- Pre-caching ---
    useEffect(() => {
        async function prepare() {
            try {
                const images = ONBOARDING_DATA.map(item => Asset.fromModule(item.gif).downloadAsync());
                await Promise.all(images);
            } catch (e) {
                console.warn("Error caching GIFs", e);
            } finally {
                setIsReady(true);
                startAutoSlide();
            }
        }
        prepare();
        return () => stopAutoSlide();
    }, [startAutoSlide, stopAutoSlide]);

    // --- Handlers ---
    const handleNext = () => {
        stopAutoSlide(); // Reset timer on manual click
        if (currentIndex < ONBOARDING_DATA.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            router.replace('/(auth)/login');
        }
    };

    const handleSkip = () => {
        stopAutoSlide();
        router.replace('/(auth)/login');
    };

    const onScrollEnd = (e: any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / width);
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
        startAutoSlide(); // Reset timer after manual swipe
    };

    if (!isReady) return null;

    return (
        <Screen style={[styles.container]} isFull={true}>
            {/* Animated FlatList for Swiping */}
            <Animated.FlatList
                ref={flatListRef}
                data={ONBOARDING_DATA}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={onScrollEnd}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    // FADE & SCALE INTERPOLATION
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp'
                    });
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.9, 1, 0.9],
                        extrapolate: 'clamp'
                    });

                    return (
                        <Animated.View style={[styles.slide, { opacity, transform: [{ scale }] }]}>
                            <Image source={item.gif} style={styles.gif} contentFit="contain" />
                            <View style={styles.textContainer}>
                                <Text style={[typography.heading, { color: colors.secondary, textAlign: 'center', marginBottom: spacing.md }]}>
                                    {item.title}
                                </Text>
                                <Text style={[typography.body, { color: colors.muted, textAlign: 'center', paddingHorizontal: spacing.lg }]}>
                                    {item.description}
                                </Text>
                            </View>
                        </Animated.View>
                    );
                }}
            />
            {/* Footer Elements */}
            <View style={[styles.footer, { paddingBottom: spacing.xxl }]}>

                {/* Animated Stretching Indicators */}
                <View style={styles.indicatorContainer}>
                    {ONBOARDING_DATA.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [10, 24, 10],
                            extrapolate: 'clamp',
                        });
                        const dotOpacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                key={i}
                                style={[
                                    styles.indicator,
                                    { width: dotWidth, opacity: dotOpacity, backgroundColor: brand.primary }
                                ]}
                            />
                        );
                    })}
                </View>

                {/* CTA Button */}
                <TouchableOpacity
                    style={[styles.nextBtn, { backgroundColor: brand.primary, paddingVertical: spacing.md, width: width * 0.7 }]}
                    onPress={handleNext}
                >
                    <Text style={[typography.button, { color: '#FFFFFF' }]}>
                        {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>

                {/* Skip Text */}
                <TouchableOpacity style={{ marginTop: spacing.lg }} onPress={handleSkip}>
                    <Text style={[typography.caption, { color: colors.muted }]}>Skip</Text>
                </TouchableOpacity>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#FFFFFF" },
    slide: { width, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
    gif: { width: width * 0.85, height: width * 0.85, marginBottom: spacing.xxl },
    textContainer: { height: 150, justifyContent: 'center' },
    footer: { width: '100%', alignItems: 'center' },
    indicatorContainer: { flexDirection: 'row', height: 10, marginBottom: spacing.xl },
    indicator: { height: 8, borderRadius: 4, marginHorizontal: 4 },
    nextBtn: { borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
});
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withRepeat,
    Easing,
    interpolate,
    runOnJS,
    Extrapolation,
} from 'react-native-reanimated';
import { Svg, Circle, Defs, LinearGradient, Stop, Mask } from 'react-native-svg';
import { useRouter } from "expo-router";

// --- Constants & Assets ---
const { width, height } = Dimensions.get('window');
// Colors extracted from the images
const COLOR_BG_PINK = '#FFD1D1'; // Light pink background
const COLOR_PRIMARY = '#6A0F0F'; // Deep maroon/red primary color
const COLOR_LIGHT_PRIMARY = '#FF6600'; // Brighter orange/red
const COLOR_WHITE = '#FFFFFF';

// --- YOUR REAL IMAGES ---
// Make sure these files exist in your assets folder!
const LOGO_ICON = require('@/assets/images/logo-icon.svg');
const LOGO_FULL = require('@/assets/images/logo-full.svg');


export default function SplashScreenAnimation() {
    const router = useRouter();
    // Animation state controls the sequence:
    // 0: Initial state (Loader rotating)
    // 1: Explosion starts
    // 2: Explosion finishes, screen is solid primary
    // 3: Fade back to icon on pink bg
    // 4: Fade in full logo
    const animationState = useSharedValue(0);
    const rotation = useSharedValue(0);

    const CIRCLE_SIZE = 120;
    const STROKE_WIDTH = 8;
    const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;


    useEffect(() => {
        // --- Sequence Orchestration ---

        // 1. Start Rotation (Step 0)
        rotation.value = withRepeat(
            withTiming(360, { duration: 1500, easing: Easing.linear }),
            -1 // Infinite
        );

        // 2. Trigger Explosion after 2s (Step 1 -> 2)
        animationState.value = withDelay(2000, withTiming(2, { duration: 600, easing: Easing.out(Easing.exp) }));

        // 3. Fade Back after explosion (Step 2 -> 3)
        animationState.value = withDelay(3000, withTiming(3, { duration: 800 }));

        // 4. Reveal Full Logo (Step 3 -> 4)
        animationState.value = withDelay(4200, withTiming(4, { duration: 800 }, (finished) => {
            if (finished) {
                // Navigate away after animation completes
                // runOnJS(router.replace)("/(onboarding)");
            }
        }));
    }, [animationState, rotation, router.replace]);

    // --- Animated Styles ---

    // 1. Loader Circle Style
    const loaderStyle = useAnimatedStyle(() => {
        // Rotate counter-clockwise
        const rotateStr = `-${rotation.value}deg`;
        // Fade out when explosion starts
        const opacity = interpolate(animationState.value, [0, 0.5], [1, 0], Extrapolation.CLAMP);
        return {
            transform: [{ rotateZ: rotateStr }],
            opacity,
        };
    });

    // 2. Explosion Overlay Style
    const explosionStyle = useAnimatedStyle(() => {
        // Scale from 0 to cover the screen, then fade out
        const scale = interpolate(animationState.value, [1, 2], [0, Math.max(width, height) / 20], Extrapolation.CLAMP);
        const opacity = interpolate(animationState.value, [2, 3], [1, 0], Extrapolation.CLAMP);
        return {
            transform: [{ scale }],
            opacity,
        };
    });

    // 3. Icon Only Style
    const iconOnlyStyle = useAnimatedStyle(() => {
        // Visible initially, fades out for full logo
        const opacity = interpolate(animationState.value, [3, 4], [1, 0], Extrapolation.CLAMP);
        return {
            opacity,
            // Optional: slight scale down as it fades
            transform: [{ scale: interpolate(animationState.value, [3, 4], [1, 0.9], Extrapolation.CLAMP) }]
        };
    });

    // 4. Full Logo Style
    const fullLogoStyle = useAnimatedStyle(() => {
        // Fades in at the end
        const opacity = interpolate(animationState.value, [3.5, 4], [0, 1], Extrapolation.CLAMP);
        const scale = interpolate(animationState.value, [3.5, 4], [1.1, 1], Extrapolation.CLAMP);
        return {
            opacity,
            transform: [{ scale }],
        };
    });


    return (
        <View style={styles.container}>
            {/* --- Explosion Overlay --- */}
            <Animated.View style={[styles.explosionOverlay, explosionStyle]} />

            <View style={styles.centerContainer}>
                {/* --- Section 1: Icon + Loader --- */}
                <Animated.View style={[styles.absoluteCenter, iconOnlyStyle]}>
                    <Image
                        source={LOGO_ICON}
                        style={styles.logoIconImage}
                        resizeMode="contain"
                    />
                </Animated.View>

                {/* --- 2. Rotating Gradient Loader --- */}
                <Animated.View style={[styles.absoluteCenter, loaderStyle]}>
                    <Svg height={CIRCLE_SIZE} width={CIRCLE_SIZE} viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <Stop offset="0%" stopColor={COLOR_PRIMARY} />
                                <Stop offset="50%" stopColor={COLOR_LIGHT_PRIMARY} />
                                <Stop offset="100%" stopColor={COLOR_WHITE} />
                            </LinearGradient>
                            <Mask id="mask">
                                <Circle
                                    cx={CIRCLE_SIZE / 2}
                                    cy={CIRCLE_SIZE / 2}
                                    r={RADIUS}
                                    stroke="white"
                                    strokeWidth={STROKE_WIDTH}
                                    fill="none"
                                    strokeDasharray={`${CIRCUMFERENCE * 0.75} ${CIRCUMFERENCE * 0.25}`}
                                    strokeLinecap="round"
                                />
                            </Mask>
                        </Defs>
                        {/* Apply the gradient to a circle, masked to create the stroke */}
                        <Circle
                            cx={CIRCLE_SIZE / 2}
                            cy={CIRCLE_SIZE / 2}
                            r={RADIUS}
                            stroke="url(#grad)"
                            strokeWidth={STROKE_WIDTH}
                            fill="none"
                            mask="url(#mask)"
                        />
                    </Svg>
                </Animated.View>

                {/* --- 3. Full Logo (Your 'Splash screen 4.png') --- */}
                <Animated.View style={[styles.absoluteCenter, fullLogoStyle]}>
                    <Image
                        source={LOGO_FULL}
                        style={styles.logoFullImage}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_BG_PINK,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerContainer: {
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    absoluteCenter: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    explosionOverlay: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLOR_PRIMARY,
        zIndex: 10,
    },
    // NEW STYLES FOR IMAGES
    logoIconImage: {
        width: 100, // Adjust this to match your design size
        height: 100,
    },
    logoFullImage: {
        width: 250, // Adjust width for the full text logo
        height: 80,
    }
});
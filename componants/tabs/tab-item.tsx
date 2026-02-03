import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedProps,
    withSpring,
    withTiming,
    interpolateColor,
    interpolate
} from 'react-native-reanimated';

import { useTheme } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';


// 1. Create an Animated version of Ionicons so we can animate the 'color' prop
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

// --- The Premium Tab Component ---
export default function TabItem({ name, focused, label }: { name: any, focused: boolean, label: string }) {
    const { colors, brand } = useTheme();

    // Shared Values
    const scale = useSharedValue(1);
    const progress = useSharedValue(0);

    // Drive animations based on 'focused' state
    useEffect(() => {
        // 1. Scale: Pop up to 1.25 then settle back (Bouncy)
        scale.value = withSpring(focused ? 1.2 : 1, {
            damping: 10,
            stiffness: 150,
            mass: 0.5
        });

        // 2. Color: Smooth transition (Timing is better for color than spring)
        progress.value = withTiming(focused ? 1 : 0, { duration: 250 });
    }, [focused, scale, progress]);

    // Animate the Container (Scale)
    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    // Animate the Icon Color (Gray -> Brand)
    const animatedIconProps = useAnimatedProps(() => ({
        color: interpolateColor(
            progress.value,
            [0, 1],
            [colors.muted, brand.primary]
        ),
    }));

    // Animate the Label Color (Gray -> Brand)
    const animatedTextStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            progress.value,
            [0, 1],
            [colors.muted, brand.primary]
        ),
        // FIX: Use 'interpolate' for numbers. 
        // This creates a number between 0.8 and 1.
        opacity: interpolate(progress.value, [0, 1], [0.5, 1]),
    }));

    return (
        <View style={styles.tabItemContainer}>
            <Animated.View style={animatedContainerStyle}>
                {/* We use the AnimatedIcon here with animatedProps */}
                <AnimatedIcon
                    name={focused ? name : `${name}-outline`}
                    size={24}
                    animatedProps={animatedIconProps}
                />
            </Animated.View>
            <Animated.Text style={[styles.label, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    tabItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: 8
    },
    label: {
        fontSize: 12,
        fontFamily: 'InterMedium',
        marginTop: 4,
        width: "100%",
        textAlign: 'center',
    },
});
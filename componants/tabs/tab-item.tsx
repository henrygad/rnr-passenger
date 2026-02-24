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

// 1. Create an Animated version of Ionicons
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

export default function TabItem({ name, focused, label }: { name: any, focused: boolean, label: string }) {
    const { colors } = useTheme();

    // FIX 1: Initialize shared values based on the CURRENT 'focused' state 
    // This prevents them from always starting at 0/1 and then jumping.
    const scale = useSharedValue(focused ? 1.2 : 1);
    const progress = useSharedValue(focused ? 1 : 0);

    useEffect(() => {
        scale.value = withSpring(focused ? 1.2 : 1, {
            damping: 10,
            stiffness: 150,
            mass: 0.5
        });

        progress.value = withTiming(focused ? 1 : 0, { duration: 250 });
    }, [focused]); // Simplified dependencies

    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const animatedIconProps = useAnimatedProps(() => ({
        color: interpolateColor(
            progress.value,
            [0, 1],
            [colors.muted, colors.primary]
        ),
        opacity: interpolate(progress.value, [0, 1], [0.8, 1]),
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            progress.value,
            [0, 1],
            [colors.muted, colors.primary]
        ),
        opacity: interpolate(progress.value, [0, 1], [0.8, 1]),
    }));

    return (
        <View style={styles.tabItemContainer}>
            <Animated.View style={animatedContainerStyle}>
                <AnimatedIcon
                    name={focused ? name : `${name}-outline`}
                    size={24}
                    // FIX 2: Pass a STATIC color prop. 
                    // This acts as a fallback for the very first render.
                    color={focused ? colors.primary : colors.muted}
                    animatedProps={animatedIconProps}
                />
            </Animated.View>
            <Animated.Text
                style={[
                    styles.label,
                    // FIX 3: Pass a static color here as well
                    { color: focused ? colors.primary : colors.muted },
                    animatedTextStyle
                ]}
            >
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
        fontFamily: 'InterMedium', // Ensure this matches your typography.ts
        marginTop: 4,
        width: "100%",
        textAlign: 'center',
    },
});
import React, { ReactNode } from 'react';
import { View, StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/constants/theme'; // using your updated theme hook

const { width } = Dimensions.get('window');


console.log(width);

interface Props {
    children?: ReactNode
    style?: StyleProp<ViewStyle>
}

export const BlendedImage = ({ children, style }: Props) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, style]}>
            {children}
            {/* 2. The Gradient Mask (The "Blend" Magic) */}
            <LinearGradient
                // We go from transparent (0%) to your background color (100%)
                colors={['transparent', colors.background]}
                // Adjust these to control where the fade starts
                locations={[0.5, 1.0]}
                style={styles.gradient}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        height: 'auto',
        position: 'relative',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%', // The fade covers the bottom 50% of the image
    },
});
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/theme';

export const LocateButton = ({ onPress }: { onPress: () => void }) => {
    const { colors, shadow } = useTheme();

    return (
        <Pressable
            style={[styles.container, shadow, { backgroundColor: colors.card }]}
            onPress={onPress}
        >
            <Ionicons name="locate" size={24} color={colors.primary} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        top: '45%',
        width: 48,
        height: 48,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { shadow } from '@/constants/shadow';
import { useHaptics } from '@/hooks/use-haptics';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const Button = ({ title, onPress, variant = 'primary', loading, style }: ButtonProps) => {
    const { colors } = useTheme();
    const haptics = useHaptics();

    const handlePress = () => {
        haptics.impact(); // Subtle vibration on every click
        onPress();
    };

    const getVariantStyle = () => {
        switch (variant) {
            case 'primary':
                return {
                    bg: colors.primary,
                    text: '#FFF',
                    shadow: shadow.button
                };
            case 'secondary':
                return {
                    bg: colors.secondary,
                    text: '#FFF',
                    shadow: shadow.button
                };
            case 'outline':
                return {
                    bg: 'transparent',
                    text: colors.primary,
                    border: colors.primary,
                    shadow: {}
                };
        }
    };

    const activeStyle = getVariantStyle();

    return (
        <TouchableOpacity
            onPress={handlePress}
            disabled={loading}
            activeOpacity={0.8}
            style={[
                styles.btn,
                {
                    backgroundColor: activeStyle.bg,
                    borderColor: activeStyle.border,
                    borderWidth: activeStyle.border ? 1 : 0,
                },
                activeStyle.shadow, // Applying your new shadow.button
                style
            ]}
        >
            {loading ? (
                <ActivityIndicator color={activeStyle.text} />
            ) : (
                <Text style={[typography.button, { color: activeStyle.text }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
    },
});
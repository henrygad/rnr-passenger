import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { useHaptics } from '@/hooks/use-haptics';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
}

export const Button = ({ title, onPress, variant = 'primary', loading, style, disabled = false }: ButtonProps) => {
    const { colors, shadow } = useTheme();
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
                    shadow: shadow
                };
            case 'secondary':
                return {
                    bg: colors.secondary,
                    text: '#FFF',
                    shadow: shadow
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
            disabled={disabled || loading}        
            style={[
                styles.btn,
                {
                    backgroundColor: activeStyle.bg,
                    borderColor: activeStyle.border,
                    borderWidth: activeStyle.border ? 1 : 0,
                    opacity: disabled || loading ? 0.5 : 1,
                },
                activeStyle.shadow,
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
        borderRadius: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',        
    },
});
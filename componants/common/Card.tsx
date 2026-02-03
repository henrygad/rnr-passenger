import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/constants/theme';
import { shadow } from '@/constants/shadow';
import { spacing } from '@/constants/spacing';

export const Card = ({ children, style }: { children: React.ReactNode, style?: StyleProp<ViewStyle> }) => {
    const { colors } = useTheme();

    return (
        <View style={[
            styles.card,
            {
                backgroundColor: colors.card,
                borderColor: colors.border,
            },
            shadow.card, // Applying your new shadow.card
            style
        ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: spacing.md,
        borderRadius: 16,
    },
});
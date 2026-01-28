import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/constants/theme';
import { spacing } from '@/constants/spacing';

export const Card = ({ children, style }: { children: React.ReactNode, style?: any }) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: spacing.md,
        borderRadius: 16,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
    }
});
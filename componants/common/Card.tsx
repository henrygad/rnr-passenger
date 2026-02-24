import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/constants/theme';
import { spacing } from '@/constants/spacing';

export const Card = ({ children, style }: { children: React.ReactNode, style?: StyleProp<ViewStyle> }) => {
    const { colors, shadow } = useTheme();

    return (
        <View style={[
            styles.card,
            {                
                borderColor: colors.border,
                backgroundColor: colors.card,
            },            
            shadow,
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
        borderWidth: 1,
    },
});
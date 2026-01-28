import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

interface InputProps {
    control: any;
    name: string;
    label?: string;
    placeholder?: string;
    rules?: object;
    keyboardType?: 'default' | 'phone-pad' | 'numeric' | 'email-address';
}

export const Input = ({ control, name, label, placeholder, rules, keyboardType }: InputProps) => {
    const { colors, } = useTheme();

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View style={{ marginBottom: spacing.md }}>
                    {label && <Text style={[typography.caption, { color: colors.text, marginBottom: spacing.xs }]}>{label}</Text>}
                    <TextInput
                        style={[
                            styles.input,
                            { backgroundColor: colors.card, color: colors.text, borderColor: error ? colors.primary : colors.border }
                        ]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor={colors.muted}
                        keyboardType={keyboardType}
                    />
                    {error && <Text style={[typography.caption, { color: colors.primary, marginTop: 4 }]}>{error.message || 'Invalid'}</Text>}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    input: { height: 56, borderWidth: 1.5, borderRadius: 12, paddingHorizontal: spacing.md, fontSize: 16 }
});
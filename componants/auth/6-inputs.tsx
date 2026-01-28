import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useTheme } from '@/constants/theme';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export default function CustomOtpInput({ code, setCode, maximumLength = 6 }: any) {
    const { colors, brand } = useTheme();
    const inputRef = React.useRef<TextInput>(null);

    const boxArray = new Array(maximumLength).fill(0);

    const boxDigit = (_: any, index: number) => {
        const digit = code[index] || "";
        const isCurrentDigit = index === code.length;
        const isLastDigit = index === maximumLength - 1;
        const isCodeFull = code.length === maximumLength;

        const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

        return (
            <View
                key={index}
                style={[
                    styles.box,
                    {
                        backgroundColor: colors.card,
                        borderColor: isFocused ? brand.primary : colors.border
                    }
                ]}
            >
                <Text style={[typography.heading, { color: colors.text }]}>{digit}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.inputContainer} onPress={() => inputRef.current?.focus()}>
                {boxArray.map(boxDigit)}
            </Pressable>
            <TextInput
                ref={inputRef}
                value={code}
                onChangeText={setCode}
                maxLength={maximumLength}
                keyboardType="number-pad"
                style={styles.hiddenInput}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { justifyContent: 'center', alignItems: 'center', marginVertical: spacing.xl },
    inputContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between' },
    box: {
        width: 50,
        height: 60,
        borderWidth: 2,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hiddenInput: { position: 'absolute', opacity: 0, width: 1, height: 1 },
});
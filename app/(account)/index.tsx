import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { useTheme } from '@/constants/theme';
import Screen from '@/componants/screen';
import { Button } from '@/componants/common/Button';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LoginSuccessfully() {
    const { colors } = useTheme();
    const router = useRouter();

    return (
        <Screen
            isFull={true}
            style={[styles.container, { padding: spacing.lg }]}
        >
            <View style={{ marginTop: spacing.xxl }}>
                <Image
                    source={require('@/assets/gifs/success.gif')}
                    style={styles.image}
                    contentFit="contain"
                />
            </View>
            <View style={{}}>
                {/* Title */}
                <Text style={[
                    typography.subheading,
                    { color: colors[700], fontWeight: "500", marginTop: spacing.md, textAlign: 'center' }
                ]}>
                    Phone Number Verified Successfully
                </Text>
                {/* Subtitle */}
                <Text style={[
                    typography.body,
                    { color: colors[700], marginTop: spacing.sm, textAlign: 'center' }
                ]}>
                    Proceed to your account
                </Text>
            </View>
            <View style={{ marginTop: spacing.xxl }}>
                {/* Button */}
                <Button
                    title="Proceed"
                    onPress={() => router.replace("/(account)/(tabs)")}
                    variant="secondary"
                />
            </View>

        </Screen>
    )
};

const styles = StyleSheet.create({
    container: { backgroundColor: "#FFFFFF" },
    image: { width: width * 0.85, height: width * 0.85, marginBottom: spacing.xxl },
});

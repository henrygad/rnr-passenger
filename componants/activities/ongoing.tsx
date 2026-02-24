import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Card } from '../common/card'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/constants/theme'
import { spacing } from '@/constants/spacing'
import { typography } from '@/constants/typography';
import Animated, {
    FadeInDown,
    LinearTransition,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence
} from 'react-native-reanimated';

export default function Ongoing() {
    const { colors } = useTheme();
    const opacity = useSharedValue(1);
    useEffect(() => {
        opacity.value = withRepeat(
            withSequence(withTiming(0.4, { duration: 800 }), withTiming(1, { duration: 800 })),
            -1,
            true
        );
    }, [opacity]);

    const pulseStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
    return (
        <Animated.View entering={FadeInDown} layout={LinearTransition}>
            <Card style={[styles.ongoingCard, { borderColor: colors.primary, borderWidth: 1.5 }]}>
                <View style={styles.cardHeader}>
                    <Animated.View style={[styles.liveIndicator, { backgroundColor: colors.primary }, pulseStyle]}>
                        <Text style={styles.liveText}>LIVE</Text>
                    </Animated.View>
                    <Text style={[styles.timeText, { color: colors.primary }]}>Pickup in 4 mins</Text>
                </View>
                <Text style={[styles.destination, { color: colors.text }]}>Airport Road, Ikeja</Text>
                <View style={styles.footerRow}>
                    <Text style={[styles.subInfo, { color: colors.muted }]}>
                        <Ionicons name="car-outline" size={12} /> Urban {'(Toyota Camry • KJA-441)'}
                    </Text>
                    <TouchableOpacity style={[styles.trackBtn, { backgroundColor: colors.primary }]}>
                        <Text style={styles.trackBtnText}>Track</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </Animated.View>

    )
};

const styles = StyleSheet.create({
    ongoingCard: { padding: spacing.md },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
    liveIndicator: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 8 },
    liveText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
    timeText: { fontSize: 13, fontWeight: '700' },
    destination: { ...typography.subheading, fontSize: 18, marginBottom: spacing.sm },
    footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    subInfo: { fontSize: 12 },
    trackBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
    trackBtnText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
});
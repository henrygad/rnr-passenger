import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/theme';

export default function PaymentScreen({ route, navigation }: any) {
    const { colors } = useTheme();

    // Mock data - In production, these come from your Node.js backend/API
    const [paymentDetails] = useState({
        bankName: "Wema Bank",
        accountNumber: "0123456789",
        amount: 2500,
        expiryMinutes: 15,
    });

    const [timeLeft, setTimeLeft] = useState(paymentDetails.expiryMinutes * 60);
    const [isVerifying, setIsVerifying] = useState(false);

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(paymentDetails.accountNumber);
        Alert.alert("Copied!", "Account number copied to clipboard.");
    };

    const handleManualVerify = () => {
        setIsVerifying(true);
        // Simulate API call to your Node.js backend
        setTimeout(() => {
            setIsVerifying(false);
            Alert.alert("Checking...", "We are verifying your transfer. Please wait a moment.");
        }, 2000);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header Area */}
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Finalize Payment</Text>
                <Text style={styles.subtitle}>Transfer the exact amount to the account below</Text>
            </View>

            {/* Amount Card */}
            <View style={[styles.amountCard, { backgroundColor: '#FFF5EF' }]}>
                <Text style={styles.amountLabel}>Total Fare</Text>
                <Text style={[styles.amountValue, { color: '#FF6600' }]}>
                    ₦{paymentDetails.amount.toLocaleString()}
                </Text>
            </View>

            {/* Account Details Box */}
            <View style={[styles.detailsContainer, { borderColor: colors.border }]}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Bank Name</Text>
                    <Text style={styles.value}>{paymentDetails.bankName}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                    <View>
                        <Text style={styles.label}>Account Number</Text>
                        <Text style={[styles.value, styles.accountNumber]}>{paymentDetails.accountNumber}</Text>
                    </View>
                    <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                        <Ionicons name="copy-outline" size={20} color="#FF6600" />
                        <Text style={styles.copyText}>Copy</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Timer Section */}
            <View style={styles.timerContainer}>
                <Ionicons name="time-outline" size={18} color="#666" />
                <Text style={styles.timerText}>
                    Account expires in: <Text style={{ fontWeight: '700', color: '#E53E3E' }}>{formatTime(timeLeft)}</Text>
                </Text>
            </View>

            {/* Instruction Footer */}
            <View style={styles.instructionBox}>
                <Ionicons name="information-circle-outline" size={20} color="#666" />
                <Text style={styles.instructionText}>
                    Please stay on this screen until the payment is confirmed.
                </Text>
            </View>

            {/* Action Button */}
            <TouchableOpacity
                style={[styles.verifyButton, { backgroundColor: '#FF6600' }]}
                onPress={handleManualVerify}
                disabled={isVerifying}
            >
                {isVerifying ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.verifyButtonText}>I have sent the money</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center' },
    header: { marginBottom: 32, alignItems: 'center' },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
    subtitle: { fontSize: 14, color: '#666', textAlign: 'center' },
    amountCard: {
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 24,
    },
    amountLabel: { fontSize: 14, color: '#666', marginBottom: 4 },
    amountValue: { fontSize: 32, fontWeight: '800' },
    detailsContainer: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: { fontSize: 12, color: '#999', textTransform: 'uppercase', letterSpacing: 1 },
    value: { fontSize: 18, fontWeight: '600', marginTop: 4 },
    accountNumber: { fontSize: 22, color: '#1A1A1A' },
    divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 },
    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FF6600',
    },
    copyText: { color: '#FF6600', marginLeft: 4, fontWeight: '600' },
    timerContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
    timerText: { marginLeft: 8, fontSize: 14, color: '#666' },
    instructionBox: {
        flexDirection: 'row',
        backgroundColor: '#F7F7F7',
        padding: 15,
        borderRadius: 12,
        marginBottom: 24,
    },
    instructionText: { flex: 1, marginLeft: 10, fontSize: 13, color: '#666', lineHeight: 18 },
    verifyButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF6600',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    verifyButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});
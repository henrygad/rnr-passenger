import { Text, TouchableOpacity, StyleSheet, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { typography } from '@/constants/typography'
import { useAuthContext } from '@/context/auth-context'
import { spacing } from '@/constants/spacing'

export default function LogoutButton() {
    const { logout } = useAuthContext();
    const [loading, setLoading] = useState(false);


    const handleLogout = () => {
        try {
            setLoading(true);
            logout();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    


    return (
        <Animated.View
            entering={FadeInDown.delay(500)}
            style={styles.logoutWrapper}
        >
            <TouchableOpacity onPress={handleLogout} disabled={loading} style={styles.logoutBtn}>
                {/* <Pressable  style={styles.logoutBtn}> */}
                    <Ionicons name="log-out-outline" size={22} color="#FF4D4F" />
                    <Text style={[styles.logoutText, { color: '#FF4D4F' }]}>
                        {loading ? "Logging out..." : "Log out"}
                    </Text>
                {/* </Pressable> */}
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    logoutWrapper: { marginTop: spacing.lg, width: '100%', alignItems: 'center' },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 },
            logoutText: { ...typography.button, fontSize: 18, fontWeight: '600' },
});
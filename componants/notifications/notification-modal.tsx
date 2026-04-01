import { Animated, Dimensions, Modal, PanResponder, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { useEffect, useRef } from 'react';

const { height } = Dimensions.get('window');


type Props = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedNotif: any;
}

export default function NotificationModal({ modalVisible, setModalVisible, selectedNotif }: Props) {
    const { colors, isDark } = useTheme();

    // 1. This value tracks the vertical position of the modal
    // We start it at SCREEN_HEIGHT (hidden at the bottom)
    const SCREEN_HEIGHT = height;
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;


    const onClose = () => {
        setModalVisible(false);
    };


    // 2. Open Animation: When 'visible' becomes true, slide it up
    useEffect(() => {
        if (modalVisible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                damping: 20,
                stiffness: 150,
            }).start();
        }
    }, [modalVisible, translateY]);

    // 3. The Gesture Handler (The "Magic" part)
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Only start responding if the user is dragging downwards
                return gestureState.dy > 0;
            },
            onPanResponderMove: (_, gestureState) => {
                // As the user moves their finger (dy), we update translateY
                // We use Math.max(0, ...) so they can't pull the modal HIGHER than its top
                translateY.setValue(Math.max(0, gestureState.dy));
            },
            onPanResponderRelease: (_, gestureState) => {
                // If they dragged down more than 150 pixels OR flicked it fast (vy)
                if (gestureState.dy > 150 || gestureState.vy > 0.5) {
                    // Slide it all the way down and call onClose
                    Animated.timing(translateY, {
                        toValue: SCREEN_HEIGHT,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(onClose);
                } else {
                    // Vice-Versa: If they didn't pull far enough, SNAP it back to the top
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                        damping: 20,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={modalVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={StyleSheet.absoluteFill} />
                </TouchableWithoutFeedback>

                <Animated.View
                    style={[
                        styles.modalContent,
                        {
                            backgroundColor: colors.background,
                            transform: [{ translateY: translateY }]
                        }
                    ]}
                >
                    {/* Modal Handle */}
                    <View {...panResponder.panHandlers} style={styles.handleContainer}>
                        <View style={[styles.handle, { backgroundColor: colors.border }]} />
                    </View>

                    {selectedNotif && (
                        <View style={styles.detailBody}>
                            <Text style={[typography.heading, { color: colors.text, marginBottom: 8 }]}>
                                {selectedNotif.title}
                            </Text>
                            <Text style={[typography.body, { color: colors.muted, lineHeight: 22 }]}>
                                {selectedNotif.msg}
                            </Text>

                            {/* Dynamic Section Based on Type */}
                            <View style={[styles.infoBox, { backgroundColor: isDark ? '#1F1F1F' : '#F9FAFB' }]}>
                                {selectedNotif.type === 'Rides' && (
                                    <View>
                                        <InfoRow label="Car Model" value={selectedNotif.detail.car} />
                                        <InfoRow label="Plate Number" value={selectedNotif.detail.plate} />
                                        <InfoRow label="Pickup" value={selectedNotif.detail.location} />
                                    </View>
                                )}
                                {selectedNotif.type === 'Stays' && (
                                    <View>
                                        <InfoRow label="Hotel" value={selectedNotif.detail.hotel} />
                                        <InfoRow label="Reference" value={selectedNotif.detail.ref} />
                                        <InfoRow label="Check-in" value={selectedNotif.detail.checkIn} />
                                    </View>
                                )}
                                {selectedNotif.type === 'Offers' && (
                                    <View style={styles.promoBox}>
                                        <Text style={[typography.heading, { color: colors.primary, textAlign: 'center' }]}>
                                            {selectedNotif.detail.code}
                                        </Text>
                                        <Text style={[typography.caption, { textAlign: 'center', marginTop: 4, color: colors.muted }]}>
                                            {selectedNotif.detail.expiry}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* Primary Action */}
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <ActionText type={selectedNotif.type} subType={selectedNotif.subType} />
                            </TouchableOpacity>
                        </View>
                    )}
                </Animated.View>
            </View>
        </Modal>
    )
};


function ActionText({ type, subType }: { type: string, subType: string }) {
    if (type === 'Rides') return subType === 'Driver Arrived' ?
        <Text style={[typography.button, { color: '#FFF' }]}> Track Driver</Text> :
        <Text style={[typography.button, { color: '#FFF' }]} >View Ride History</Text>
    if (type === 'Stays') return <Text style={[typography.button, { color: '#FFF' }]}>View Booking</Text>;
    if (type === 'Offers') return <Text style={[typography.button, { color: '#FFF' }]}>Copy Code</Text>;
    return <Text style={[typography.button, { color: '#FFF' }]}>Take Action</Text>;
}


// Small helper for detail rows
function InfoRow({ label, value }: { label: string, value: string }) {
    const { colors } = useTheme();
    return (
        <View style={styles.infoRow}>
            <Text style={[typography.caption, { color: colors.muted }]}>{label}</Text>
            <Text style={[typography.body, { color: colors.text, fontWeight: 'bold' }]}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: spacing.lg, paddingTop: 0, minHeight: height * 0.4 },
    handleContainer: { width: '100%', height: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: spacing.sm },
    handle: { width: 40, height: 5, borderRadius: 3, },
    closeBtn: { alignSelf: 'flex-end' },
    detailBody: { marginTop: 10 },
    infoBox: { borderRadius: 20, padding: 20, marginVertical: 20 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    promoBox: { alignItems: 'center', paddingVertical: 10 },
    actionBtn: { height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginTop: 10 }
})
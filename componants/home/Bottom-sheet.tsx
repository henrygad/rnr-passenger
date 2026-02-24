import React, { useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { useRouter } from 'expo-router';
import { Card } from '../common/card';
import { Image } from 'expo-image';
import { FlatList } from 'react-native-gesture-handler';
import { RECENT_VISITS_MOCK_DATA } from '@/mock-data/recent-visites';


export default function BottomSheetComponent() {
    const { colors, shadow } = useTheme();
    const snapPoints = useMemo(() => ['20%', '30', '50%', '90%'], []);
    const router = useRouter();

    // Performance optimization for index changes
    const handleSheetChanges = useCallback((index: number) => {
    }, []);

    return (
        <BottomSheet
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={[{ backgroundColor: colors.background, borderRadius: 28 }]}
            handleIndicatorStyle={{ backgroundColor: colors.muted, width: 60 }}
            style={[styles.sheetContainer]}
        >
            <BottomSheetView style={styles.content}>
                <Text style={[typography.heading, { color: colors.text }]}>Where to?</Text>

                {/* Choose destination input trigger */}
                <Pressable
                    style={[styles.inputWrapper, { borderColor: colors.light }, shadow]}
                    onPress={() => router.push("/(account)/(modals)/booking?tab=ride")}
                >
                    <Ionicons name="location" size={25} color={colors.muted} />
                    <View style={styles.input}>
                        <Text style={[typography.body, { color: colors.muted }]}>
                            Choose destination
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={16} color={colors.muted} />
                </Pressable>

                <View style={styles.RNRCardsWrapper}>
                    <Pressable style={styles.rideCard}>
                        <Card style={{ backgroundColor: colors.light, padding: 0 }}>
                            <Image
                                source={require("@/assets/images/ride-home.png")}
                                style={styles.cardImage}
                                contentFit='cover'
                            />
                        </Card >
                        <Text style={[styles.cardText, { color: colors.text }]}>RIDE</Text>

                    </Pressable>
                    <Pressable style={styles.restCard}>
                        <Card style={{ padding: 0, }}>
                            <Image
                                source={require('@/assets/images/rest-home.png')}
                                style={[styles.cardImage, { borderRadius: 16 }]}
                                contentFit='cover'
                            />
                        </Card>
                        <Text style={[styles.cardText, { color: colors.text }]}>REST</Text>
                    </Pressable>
                </View>

                {/* This is the section for recently visited places */}
                <Text style={[styles.recentText, { color: colors.text }]}>Recently visited</Text>
                <FlatList
                    data={RECENT_VISITS_MOCK_DATA}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                        <ListItem place={item.place} address={item.address} />
                    )}
                    contentContainerStyle={{ gap: spacing.sm, paddingTop: 10, paddingBottom: 100 }}
                    ListFooterComponent={() => <ListFooter loading={false} />}
                    onEndReached={() => { }}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: 340, flex: 1, flexGrow: 0 }}
                />                
            </BottomSheetView>
        </BottomSheet>
    );
};


type ListItemProps = {
    place: string,
    address: string
}

const ListItem = ({ place, address }: ListItemProps) => {
    const { colors } = useTheme();
    let icon = "time-outline" as any;
    const places_icon = place.toLocaleLowerCase();

    if (places_icon.includes("airport")) icon = "airplane-outline"
    if (places_icon.includes("hotel")) icon = "bed-outline"
    if (places_icon.includes("shoprite") ||
        places_icon.includes("amrket")) icon = "card-outline"
    if (places_icon.includes("home")) icon = "home-outline"

    return (
        <Pressable style={styles.item}>
            <View style={[styles.iconCircle, { borderWidth: 1, borderColor: colors.muted }]}>
                <Ionicons name={icon} size={20} color={colors.text} />
            </View>
            <View>
                <Text style={[typography.subheading, { fontSize: 16, color: colors.text }]}>{place}</Text>
                <Text style={[typography.caption, { color: colors.muted }]}>{address}</Text>
            </View>
        </Pressable>
    )
};

const ListFooter = ({ loading }: { loading: boolean }) => {

    return (loading &&
        <View style={styles.footerItem}>
            <ActivityIndicator size="small" color="#007aff" />
        </View>
    );
};


const styles = StyleSheet.create({
    sheetContainer: {
        zIndex: 1000,
        elevation: 20,
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.lg,
        backgroundColor: 'transparent',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginTop: 15,
        paddingHorizontal: 15,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 1,
    },
    input: { paddingLeft: 10, paddingRight: 8 },

    RNRCardsWrapper: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    rideCard: {
        width: "45%"
    },
    restCard: {
        width: "45%"
    },
    cardImage: {
        height: 100,
        width: "100%",
    },
    cardText: {
        marginTop: 15,
        textAlign: 'center',
        ...typography.subheading,
    },
    recentText: {
        ...typography.subheading,
        fontWeight: 700,
        marginTop: 25,
        marginBottom: 10
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    footerItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
});

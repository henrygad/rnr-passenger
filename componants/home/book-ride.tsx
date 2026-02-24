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

const RecentVistes = [
    {
        id: '1',
        place: 'Lagos International Airport',
        address: 'Lagos International Airport',
    },
    {
        id: '2',
        place: 'Eko Hotels & Suites',
        address: 'Eko Hotels & Suites',
    },
    {
        id: '3',
        place: 'Shoprite Ikeja',
        address: 'Shoprite Ikeja',
    },
    {
        id: '4',
        place: 'Airport Road',
        address: 'Airport Road',
    },
    {
        id: '5',
        place: 'Home',
        address: 'Set your home address',
    },

];

export default function BookRide() {
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
            style={[styles.sheetContainer, { shadowColor: shadow.shadowColor }]}
        >
            <BottomSheetView style={styles.content}>
                <Text style={[typography.heading, { color: colors.text }]}>Where to?</Text>

                <Pressable
                    style={[styles.inputWrapper, { backgroundColor: colors.light }, shadow]}
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
                    <Pressable
                        style={styles.rideCard}
                    // onPress={() => router.push("/(account)/(modals)/booking?tab=ride")}
                    >
                        <Card style={{ backgroundColor: colors.light, padding: 0 }}>
                            <Image
                                source={require("@/assets/images/ride-home.png")}
                                style={styles.cardImage}
                                contentFit='cover'
                            />
                        </Card >
                        <Text style={[styles.cardText, { color: colors.text }]}>RIDE</Text>

                    </Pressable>
                    <Pressable
                        style={styles.restCard}
                    // onPress={() => router.push("/(account)/(modals)/booking?tab=rest")}
                    >
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

                <View style={styles.recentListWrapper}>
                    <FlatList
                        data={RecentVistes}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={ListHeader}
                        renderItem={({ item }) => (
                            <ListItem place={item.place} address={item.address} />
                        )}
                        contentContainerStyle={{ marginTop: 20 }}
                        ListFooterComponent={() => <ListFooter loading={false} />}
                        onEndReached={() => { }}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </BottomSheetView>

        </BottomSheet>
    );
};



type ListItemProps = {
    place: string,
    address: string
}

const ListHeader = () => {
    const { colors } = useTheme();
    return (<Text style={[styles.recentText, { color: colors.text }]}>Recently visited</Text>)
};

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
    content: { paddingHorizontal: spacing.lg, paddingBottom: 20, zIndex: 10 },
    inputWrapper: {
        marginTop: 15,
        flexDirection: 'row',
        height: 50,
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        overflow: 'hidden',
        paddingHorizontal: 15,
    },
    input: { paddingLeft: 10, paddingRight: 8 },

    RNRCardsWrapper: {
        marginTop: 25,
        flexDirection: 'row',
        flex: 1,
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

    recentListWrapper: { marginTop: 25 },
    recentText: {
        ...typography.subheading,
        marginBottom: 20,
        fontWeight: 700
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
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

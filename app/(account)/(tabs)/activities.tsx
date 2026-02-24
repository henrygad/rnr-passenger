import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import Ongoing from '@/componants/activities/ongoing';
import Sectionheading from '@/componants/activities/section-heading';
import Upcoming from '@/componants/activities/upcoming';
import History from '@/componants/activities/history';
import Screen from '@/componants/screen';
import { MOCK_HISTORY_DATA, MOCK_ONGOING_DATA } from '@/mock-data/activities';
import { useState } from 'react';

export default function ActivitiesScreen() {
    const { colors } = useTheme();
    const [tab, setTabs] = useState<'upcoming' | 'history'>('upcoming');

    return (
        <Screen>
            <Text style={[styles.mainTitle, { color: colors.text }]}>Activities</Text>

            {/* 1. ONGOING RIDE */}
            <Sectionheading title="Ongoing" icon="radio-button-on" color="#FF3B30" />
            <Ongoing />


            <View style={styles.tab}>
                {/* 2. UPCOMING (Ride & Rest Separate) */}
                <Sectionheading
                    title="Upcoming"
                    icon="calendar"
                    color={colors.primary}
                    tab={tab}
                    setTabs={setTabs}
                />
                {/* 3. HISTORY */}
                <Sectionheading
                    title="History"
                    icon="time-outline"
                    color={colors.muted}
                    tab={tab}
                    setTabs={setTabs}
                />
            </View>

            {tab === 'upcoming' ? <FlatList
                data={MOCK_ONGOING_DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Upcoming {...item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: spacing.sm, paddingTop: 10, paddingBottom: 100 }}
            />
                :
                <FlatList
                    data={MOCK_HISTORY_DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <History {...item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: spacing.sm, paddingTop: 10, paddingBottom: 100 }}
                />}
        </Screen>
    );
};

const styles = StyleSheet.create({
    mainTitle: { ...typography.heading, fontWeight: '700', },
    tab: { flexDirection: 'row', gap: spacing.lg, alignItems: 'center', }
});
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Screen from '@/componants/screen';
import HotelSmallCard from '@/componants/hotel/hotel-small-card';
import { HOTEL_DATA } from '@/mock-data/hotels';
import { useRouter } from 'expo-router';
import { useTheme } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/spacing';


export default function HotelSearchScreen() {
    const { colors, shadow } = useTheme();
    const router = useRouter();
    const onSearchFocus = () => {
        router.push("/(account)/(stacks)/search");
    };
    // const [showStickingHeaderWhenScrollingUp, setShowStickingHeaderWhenScrollingUp] = useState(false);

    return (
        <Screen>
            <Text style={[styles.mainTitle, { color: colors.text }]}>Hotels near you</Text>

            <View style={[styles.inputWrapper, { borderColor: colors.primary }, shadow]}>
                <Ionicons name="search" size={20} color={colors.muted} style={{ marginLeft: 15 }} />
                <View style={styles.input} onTouchStart={onSearchFocus}>
                    <Text style={[typography.body, { color: colors.muted }]}>
                        Search for hotels
                    </Text>
                </View>
            </View>

            <FlatList
                data={HOTEL_DATA}
                keyExtractor={(item) => item.id}              
                renderItem={({ item, index }) => (                    
                    <HotelSmallCard item={item} index={index} />
                )}
                // Add spacing at the bottom of each item
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 10, gap: spacing.sm }}
                showsVerticalScrollIndicator={false}                       
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    mainTitle: { ...typography.heading, fontWeight: '700', },
    inputWrapper: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        marginVertical: 10,
    },
    input: { flex: 1, paddingHorizontal: 10 },
});


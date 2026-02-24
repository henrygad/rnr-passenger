import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Pressable, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { useTheme } from '@/constants/theme';
import { useHaptics } from '@/hooks/use-haptics';
import TabItem from '@/componants/tabs/tab-item';


export default function TabsLayout() {
    const { colors, isDark, shadow } = useTheme();
    const haptics = useHaptics();
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    borderTopColor: colors.border,
                    backgroundColor: colors.background, //Platform.OS === 'ios' ? 'transparent' : colors.background,
                    height: Platform.OS === 'ios' ? 100 : 105,
                    paddingTop: 5,
                    ...shadow
                },
                // tabBarBackground: () =>
                //     Platform.OS === 'ios' ? (
                //         <BlurView
                //             intensity={isDark ? 80 : 100}
                //             tint={isDark ? 'dark' : 'light'}
                //             style={StyleSheet.absoluteFill}
                //         />
                //     ) : null,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => <TabItem name="home" label="Home" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="hotels"
                options={{
                    tabBarIcon: ({ focused }) => <TabItem name="bed" label="Hotels" focused={focused} />,
                }}
            />

            {/* THE CENTERED CALENDAR (Static middle button, no change needed) */}
            <Tabs.Screen
                name="booking-modal"
                options={{
                    tabBarButton: () => (
                        <View style={styles.middleBtnWrapper}>
                            <Pressable
                                onPress={() => {
                                    haptics.impact();
                                    router.push('/(account)/(modals)/booking');
                                }}
                                style={({ pressed }) => [
                                    styles.middleBtn,
                                    { backgroundColor: colors.primary, transform: [{ scale: pressed ? 0.95 : 1 }] },
                                    shadow
                                ]}
                            >
                                <Ionicons name="calendar" size={28} color="#FFF" />
                            </Pressable>
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="activities"
                options={{
                    tabBarIcon: ({ focused }) => <TabItem name="list" label="Activities" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => <TabItem name="person" label="Profile" focused={focused} />,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({

    middleBtnWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleBtn: {
        position: 'absolute',
        top: -24,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
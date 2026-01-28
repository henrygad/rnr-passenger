import React from 'react';
import {
    View, StyleSheet, StatusBar, ScrollView, RefreshControl,
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform,
    ViewStyle,
    StyleProp,
    StatusBarStyle
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/theme';

interface ScreenProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    scrollable?: boolean;
    onRefresh?: () => void;
    refreshing?: boolean;
    isFull?: boolean;
    statusBarStyle?: StatusBarStyle;
    // If true, we don't add top padding (useful for full-screen images/GIFs)        
    hideStatusBar?: boolean;
}

export default function Screen({
    children,
    style,
    scrollable,
    onRefresh,
    refreshing = false,
    isFull,
    statusBarStyle,
    hideStatusBar }: ScreenProps) {

    const insets = useSafeAreaInsets();
    const { colors, isDark } = useTheme();

    const Container = scrollable ? ScrollView : View;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[
                styles.outer,
                { backgroundColor: colors.background }
            ]}>
                <StatusBar
                    barStyle={statusBarStyle || (isDark ? 'light-content' : 'dark-content')}
                    translucent
                    backgroundColor="transparent"
                    hidden={hideStatusBar} // This hides the clock, battery, etc.
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <Container
                        contentContainerStyle={scrollable ? { flexGrow: 1 } : { flex: 1 }}
                        style={[
                            styles.container,
                            {
                                backgroundColor: colors.background,
                                // If it's a "full" screen (like onboarding), we ignore top inset
                                paddingTop: isFull ? 0 : insets.top,
                                paddingBottom: insets.bottom,
                            },
                            style
                        ]}
                        refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}
                    >
                        {children}
                    </Container>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    outer: { flex: 1 }
});

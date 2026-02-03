import React from 'react';
import {
    View, StatusBarStyle, StatusBar, ScrollView, RefreshControl,
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform,
    ViewStyle,
    StyleProp,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/constants/theme';

interface ScreenProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    StatusBarStyle?: StatusBarStyle;
    scrollable?: boolean;
    onRefresh?: () => void;
    refreshing?: boolean;
    isFull?: boolean;
    // If true, we don't add top padding (useful for full-screen images/GIFs)        
    hideStatusBar?: boolean;
    dissmissKeyboardOnTouchOutside?: boolean;
}

export default function Screen(p: ScreenProps) {
    const { isDark } = useTheme();

    if (p.dissmissKeyboardOnTouchOutside) {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <StatusBar
                        barStyle={p.StatusBarStyle || (isDark ? 'light-content' : 'dark-content')}
                        translucent
                        backgroundColor="transparent"
                        // This hides the clock, battery, etc.
                        hidden={p.hideStatusBar}
                    />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        <DisplayContainer {...p} />
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                barStyle={p.StatusBarStyle || (isDark ? 'light-content' : 'dark-content')}
                translucent
                backgroundColor="transparent"
                // This hides the clock, battery, etc.
                hidden={p.hideStatusBar}
            />
            <DisplayContainer {...p} />
        </View>
    );
}


const DisplayContainer = (p: ScreenProps) => {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    const Container = p.scrollable ? ScrollView : View;
    return (
        <Container
            contentContainerStyle={p.scrollable ? { flexGrow: 1 } : { flex: 1 }}
            style={[
                {
                    flex: 1,
                    backgroundColor: colors.background,
                    // If it's a "full" screen (like onboarding), we ignore top inset
                    paddingTop: p.isFull ? 0 : insets.top,
                    paddingBottom: p.isFull ? 0 : insets.bottom,
                },
                p.style
            ]}
            refreshControl={p.onRefresh ?
                <RefreshControl refreshing={p.refreshing ?? false} onRefresh={p.onRefresh} /> :
                undefined
            }
        >
            {p.children}
        </Container>
    )
};


import * as Haptics from 'expo-haptics';

export const useHaptics = () => {
    return {
        success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
        error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
        impact: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
    };
};
import { useColorScheme } from "react-native";
import { colors } from "./colors";

export function useTheme() {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    return {
        colors: { ...(isDark ? colors.dark : colors.light), ...colors.brand, ...colors.gray },
        brand: colors.brand,
        isDark,
    };
}

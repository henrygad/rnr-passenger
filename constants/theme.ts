import { useColorScheme } from "react-native";
import { colors } from "./colors";
import { shadow } from "./shadow";

export function useTheme() {
    const scheme = useColorScheme();
    const isDark = scheme === "dark";

    return {
        colors: { ...(isDark ? colors.dark : colors.light), ...colors.brand, ...colors.gray },
        shadow: isDark ? shadow.dark : shadow.light,
        isDark,
    };
}

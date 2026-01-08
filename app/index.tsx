import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../constants/theme";
import { spacing } from "../constants/spacing";
import { typography } from "../constants/typography";

export default function HomeScreen() {
  const { colors, brand } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[typography.heading, { color: brand.primary }]}>
        RideAndRest, Thank you for choosing us.
      </Text>

      <Text
        style={[
          typography.body,
          { color: colors.text, marginTop: spacing.md },
        ]}
      >
        Safe rides. Comfortable stays.
      </Text>

      <Text
        style={[
          typography.caption,
          { color: brand.secondary, marginTop: spacing.sm },
        ]}
      >
        Hospitality you can trust
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center",
  },
});

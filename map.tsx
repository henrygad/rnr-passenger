import { IdleMap } from "@/componants/map/Idle-map";
import { View, StyleSheet } from "react-native";

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <IdleMap />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

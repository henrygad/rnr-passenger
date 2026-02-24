
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, View } from 'react-native';

type Prop = {
  date: Date;
  showPicker: boolean;
  onDateChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  mode: 'datetime' | 'date' | 'time';
}

export default function DatePicker({ date, showPicker, onDateChange, mode }: Prop) {
  return showPicker && (
    <View style={styles.container}>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}                    // ← only 'date' or 'time'
        // is24Hour={true}                // or false
        display={'spinner'}           // 'default' | 'spinner' | 'calendar' | 'clock' (Android)
        onChange={onDateChange}
        minimumDate={new Date()}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    minHeight: Platform.OS === 'ios' ? 100 : 'auto',
    width: Platform.OS === 'ios' ? '100%' : 'auto',
  }
});
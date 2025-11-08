import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddScheduleForm({
  medName,
  medTime,
  onChangeName,
  onChangeTime,
  onAdd,
  days,
  toggleDay,
}: {
  medName: string;
  medTime: string;
  onChangeName: (v: string) => void;
  onChangeTime: (v: string) => void;
  onAdd: () => void;
  days: string[];
  toggleDay: (d: string) => void;
}) {
  return (
    <View style={styles.wrap}>
      {/* input row: medicine name (flex) + time pill on right */}
      <View style={styles.inputRow}>
        <View style={styles.nameInputWrap}>
          <TextInput
            placeholder="Medicine name"
            placeholderTextColor="#9aa4ad"
            value={medName}
            onChangeText={onChangeName}
            style={styles.nameInput}
          />
        </View>

        <View style={styles.timePillWrap}>
          <TextInput
            placeholder="09:00"
            placeholderTextColor="#9aa4ad"
            value={medTime}
            onChangeText={onChangeTime}
            style={styles.timeInput}
          />
        </View>
      </View>

      {/* day chips row */}
      <View style={styles.daysRow}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => {
          const active = days.includes(d);
          return (
            <TouchableOpacity key={d} onPress={() => toggleDay(d)} style={[styles.dayChip, active && styles.dayChipActive]}>
              <ThemedText style={[styles.dayText, active && { color: '#fff' }]}>{d}</ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* full width add button */}
      <TouchableOpacity style={styles.addBtn} onPress={onAdd} activeOpacity={0.9}>
        <ThemedText style={styles.addBtnText}>Add to timetable</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  inputRow: { flexDirection: 'row', width: '100%', marginBottom: 12, alignItems: 'center' },
  nameInputWrap: { flex: 1, marginRight: 12, backgroundColor: 'rgba(10,126,164,0.04)', borderRadius: 12, paddingHorizontal: 12, height: 48, justifyContent: 'center' },
  nameInput: { height: 48, color: '#0b3b45' },
  timePillWrap: { width: 96, height: 48, borderRadius: 12, backgroundColor: '#eef8fb', justifyContent: 'center', alignItems: 'center' },
  timeInput: { textAlign: 'center', color: '#0a6b74', height: 48 },
  row: { flexDirection: 'row', width: '100%', marginBottom: 12 },
  input: { height: 44, borderRadius: 12, paddingHorizontal: 12, backgroundColor: 'rgba(10,126,164,0.06)', color: '#173943' },
  daysRow: { flexDirection: 'row', flexWrap: 'wrap', width: '100%', marginBottom: 12 },
  dayChip: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(10,126,164,0.12)', marginRight: 8, marginBottom: 8, backgroundColor: '#fff' },
  dayChipActive: { backgroundColor: '#0a7ea4', borderColor: '#0a7ea4' },
  dayText: { color: '#0a3b40', fontWeight: '600' },
  addBtn: { marginTop: 6, backgroundColor: '#0a7ea4', paddingVertical: 14, paddingHorizontal: 18, borderRadius: 14, alignItems: 'center', width: '100%' },
  addBtnText: { color: '#fff', fontWeight: '800' },
});

import { ThemedText } from '@/components/themed-text';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type DayKey = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

type MedEntry = {
  name: string;
  dosage: string;
  time: string;
};

const DAYS: DayKey[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AddMedication({
  onSave,
  onCancel,
}: {
  onSave?: (data: Record<DayKey, MedEntry>) => void;
  onCancel?: () => void;
}) {
  const empty: MedEntry = { name: '', dosage: '', time: '' };
  const [entries, setEntries] = useState<Record<DayKey, MedEntry>>(() => {
    return DAYS.reduce((acc, d) => {
      acc[d] = { ...empty };
      return acc;
    }, {} as Record<DayKey, MedEntry>);
  });

  function updateField(day: DayKey, field: keyof MedEntry, value: string) {
    setEntries((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  }

  function handleSave() {
    // basic validation: at least one day should have a medicine name
    const hasAny = DAYS.some((d) => entries[d].name.trim().length > 0);
    if (!hasAny) {
      Alert.alert('No medication', 'Please enter at least one medicine name before saving.');
      return;
    }

    if (onSave) onSave(entries);
    Alert.alert('Saved', 'Medication timetable saved locally.');
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableWrap}>
        <View style={styles.headerRow}>
          <ThemedText style={styles.title}>Medication timetable</ThemedText>
          <ThemedText style={styles.subtitle}>Add medicines and times for each day.</ThemedText>
        </View>

        <ScrollView style={{ maxHeight: 360 }}>
            {DAYS.map((d) => (
              <View key={d} style={styles.row}>
                <View style={styles.dayCol}>
                  <ThemedText style={styles.dayText}>{d}</ThemedText>
                </View>

                <View style={styles.inputsCol}>
                  <TextInput
                    placeholder="Medicine name"
                    placeholderTextColor="#9aa4ad"
                    value={entries[d].name}
                    onChangeText={(t) => updateField(d, 'name', t)}
                    style={styles.input}
                  />

                  <View style={styles.rowInline}>
                    <TextInput
                      placeholder="Dosage"
                      placeholderTextColor="#9aa4ad"
                      value={entries[d].dosage}
                      onChangeText={(t) => updateField(d, 'dosage', t)}
                      style={[styles.inputSmall, { marginRight: 8 }]}
                    />

                    <TextInput
                      placeholder="Time (e.g. 09:00)"
                      placeholderTextColor="#9aa4ad"
                      value={entries[d].time}
                      onChangeText={(t) => updateField(d, 'time', t)}
                      style={styles.inputSmall}
                    />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onCancel}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.cancelText}>Close</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.9}>
            <ThemedText style={styles.saveText}>Save Timetable</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  tableWrap: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(10,126,164,0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  headerRow: { marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '700', color: '#0a4b57', marginBottom: 4 },
  subtitle: { color: '#6b7b83', fontSize: 13 },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  dayCol: { width: 48, alignItems: 'center', justifyContent: 'center' },
  dayText: { fontWeight: '700', color: '#0a4b57' },
  inputsCol: { flex: 1 },
  input: { height: 44, borderRadius: 10, paddingHorizontal: 10, backgroundColor: 'rgba(10,126,164,0.04)', marginBottom: 8, color: '#0b3b45' },
  rowInline: { flexDirection: 'row' },
  inputSmall: { flex: 1, height: 40, borderRadius: 10, paddingHorizontal: 10, backgroundColor: 'rgba(10,126,164,0.04)', color: '#0b3b45' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(10,126,164,0.06)',
  },
  cancelText: { color: '#0a3b40', fontWeight: '600' },
  saveBtn: { backgroundColor: '#0a7ea4', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10 },
  saveText: { color: '#fff', fontWeight: '800' },
});

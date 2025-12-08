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
  open: controlledOpen,
  setOpen: controlledSetOpen,
}: {
  onSave?: (data: Record<DayKey, MedEntry>) => void;
  open?: boolean;
  setOpen?: (v: boolean) => void;
}) {
  const empty: MedEntry = { name: '', dosage: '', time: '' };
  const [openLocal, setOpenLocal] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : openLocal;
  const setOpen = controlledSetOpen ?? setOpenLocal;
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
    setOpen(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={() => setOpen(!open)} activeOpacity={0.85}>
        <ThemedText style={styles.addBtnText}>{open ? 'Close' : 'Add Medication'}</ThemedText>
      </TouchableOpacity>

      {open ? (
        <View style={styles.tableWrap}>
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
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setOpen(false)}>
              <ThemedText style={styles.cancelText}>Cancel</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.9}>
              <ThemedText style={styles.saveText}>Save Timetable</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  addBtn: { backgroundColor: '#0a7ea4', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: '800' },
  tableWrap: { marginTop: 12, backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(10,126,164,0.06)' },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  dayCol: { width: 48, alignItems: 'center', justifyContent: 'center' },
  dayText: { fontWeight: '700', color: '#0a4b57' },
  inputsCol: { flex: 1 },
  input: { height: 44, borderRadius: 10, paddingHorizontal: 10, backgroundColor: 'rgba(10,126,164,0.04)', marginBottom: 8, color: '#0b3b45' },
  rowInline: { flexDirection: 'row' },
  inputSmall: { flex: 1, height: 40, borderRadius: 10, paddingHorizontal: 10, backgroundColor: 'rgba(10,126,164,0.04)', color: '#0b3b45' },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  cancelBtn: { paddingVertical: 10, paddingHorizontal: 12, marginRight: 8, borderRadius: 10 },
  cancelText: { color: '#0a3b40' },
  saveBtn: { backgroundColor: '#0a7ea4', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 },
  saveText: { color: '#fff', fontWeight: '800' },
});

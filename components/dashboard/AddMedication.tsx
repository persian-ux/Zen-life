import { ThemedText } from '@/components/themed-text';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type DayKey = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

type MedEntry = {
  name: string;
  dosage: string;
  potency: string;
  time: string;
  days: DayKey[];
};

const DAYS: DayKey[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const POTENCIES = ['5 mg', '10 mg', '25 mg', '50 mg', '75 mg', '100 mg', '250 mg', '500 mg', '1 g'];
const DOSAGE_OPTIONS = ['Once a day', 'Twice a day', 'Thrice a day'];
const TIME_OPTIONS = ['08:00 AM', '09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM', '09:00 PM'];

export default function AddMedication({
  onSave,
  onCancel,
}: {
  onSave?: (data: MedEntry[]) => void;
  onCancel?: () => void;
}) {
  const empty: MedEntry = { name: '', dosage: '', potency: '', time: '', days: [] };
  const [entries, setEntries] = useState<MedEntry[]>([{ ...empty }]);

  const [openSelector, setOpenSelector] = useState<{ index: number; type: 'dosage' | 'potency' | 'time' } | null>(null);

  function updateField(index: number, field: keyof MedEntry, value: string) {
    setEntries((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)),
    );
  }

  function toggleDay(index: number, day: DayKey) {
    setEntries((prev) =>
      prev.map((entry, i) => {
        if (i !== index) return entry;
        const hasDay = entry.days.includes(day);
        return {
          ...entry,
          days: hasDay ? entry.days.filter((d) => d !== day) : [...entry.days, day],
        };
      }),
    );
  }

  function addMedicine() {
    setEntries((prev) => [...prev, { ...empty }]);
  }

  function handleSave() {
    // basic validation: at least one medicine with a name and selected days
    const validEntries = entries.filter(
      (e) => e.name.trim().length > 0 && e.days && e.days.length > 0,
    );

    if (!validEntries.length) {
      Alert.alert(
        'No medication',
        'Please enter at least one medicine name and select at least one day before saving.',
      );
      return;
    }

    if (onSave) onSave(validEntries);
    Alert.alert('Saved', 'Medication timetable saved.');
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableWrap}>
        <View style={styles.headerRow}>
          <ThemedText style={styles.title}>Medication timetable</ThemedText>
          <ThemedText style={styles.subtitle}>Add medicines and times for each day.</ThemedText>
        </View>

        <ScrollView style={{ maxHeight: 360 }} scrollEnabled={openSelector === null}>
          {entries.map((entry, index) => (
            <View key={index} style={styles.medCard}>
              <ThemedText style={styles.medTitle}>Medicine {index + 1}</ThemedText>

              <TextInput
                placeholder="Medicine name"
                placeholderTextColor="#9aa4ad"
                value={entry.name}
                onChangeText={(t) => updateField(index, 'name', t)}
                style={styles.input}
              />

              <View style={styles.rowInline}>
                <View style={[styles.dropdownContainer, { marginRight: 8 }]}> 
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    activeOpacity={0.8}
                    onPress={() => setOpenSelector({ index, type: 'potency' })}
                  >
                    <ThemedText style={styles.dropdownButtonText}>
                      {entry.potency || 'Select potency'}
                    </ThemedText>
                  </TouchableOpacity>
                </View>
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    activeOpacity={0.8}
                    onPress={() => setOpenSelector({ index, type: 'dosage' })}
                  >
                    <ThemedText style={styles.dropdownButtonText}>
                      {entry.dosage || 'Select dosage'}
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.rowInline, { marginTop: 8 }]}> 
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    activeOpacity={0.8}
                    onPress={() => setOpenSelector({ index, type: 'time' })}
                  >
                    <ThemedText style={styles.dropdownButtonText}>
                      {entry.time || 'Select time'}
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.daysRow}>
                {DAYS.map((day) => {
                  const selected = entry.days.includes(day);
                  return (
                    <TouchableOpacity
                      key={day}
                      style={[styles.dayChip, selected && styles.dayChipSelected]}
                      activeOpacity={0.7}
                      onPress={() => toggleDay(index, day)}
                    >
                      <ThemedText
                        style={[styles.dayChipText, selected && styles.dayChipTextSelected]}
                      >
                        {day}
                      </ThemedText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.addMedicineBtn}
          onPress={addMedicine}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.addMedicineText}>Add another medicine</ThemedText>
        </TouchableOpacity>

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
      {openSelector && (
        <View style={styles.potencyOverlay}>
          <TouchableOpacity
            style={styles.overlayBackdrop}
            activeOpacity={1}
            onPress={() => setOpenSelector(null)}
          />
          <View style={styles.potencyCard}>
            <ThemedText style={styles.potencyTitle}>
              {openSelector.type === 'potency'
                ? 'Select potency'
                : openSelector.type === 'dosage'
                ? 'Select dosage'
                : 'Select time'}
            </ThemedText>
            <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
              {(openSelector.type === 'potency'
                ? POTENCIES
                : openSelector.type === 'dosage'
                ? DOSAGE_OPTIONS
                : TIME_OPTIONS
              ).map((p) => (
                <TouchableOpacity
                  key={p}
                  activeOpacity={0.7}
                  onPress={() => {
                    updateField(openSelector.index, openSelector.type, p);
                    setOpenSelector(null);
                  }}
                  style={styles.dropdownOption}
                >
                  <ThemedText style={styles.dropdownOptionText}>{p}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', position: 'relative' },
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
  medCard: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10,126,164,0.08)',
  },
  medTitle: {
    fontWeight: '700',
    color: '#0a4b57',
    marginBottom: 6,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  dayCol: { width: 48, alignItems: 'center', justifyContent: 'center' },
  dayText: { fontWeight: '700', color: '#0a4b57' },
  inputsCol: { flex: 1 },
  input: { height: 44, borderRadius: 10, paddingHorizontal: 10, backgroundColor: 'rgba(10,126,164,0.04)', marginBottom: 8, color: '#0b3b45' },
  rowInline: { flexDirection: 'row' },
  inputSmall: { flex: 1, height: 40, borderRadius: 10, paddingHorizontal: 10, backgroundColor: 'rgba(10,126,164,0.04)', color: '#0b3b45' },
  dropdownContainer: {
    flex: 1,
    position: 'relative',
    zIndex: 20,
  },
  dropdownButton: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(10,126,164,0.04)',
    justifyContent: 'center',
  },
  dropdownButtonText: {
    color: '#0b3b45',
  },
  dropdownMenu: {},
  dropdownScroll: { maxHeight: 260 },
  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownOptionText: {
    color: '#0b3b45',
  },
  daysRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },
  dayChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(10,126,164,0.24)',
    backgroundColor: 'rgba(10,126,164,0.02)',
  },
  dayChipSelected: {
    backgroundColor: 'rgba(10,126,164,0.16)',
    borderColor: '#0a7ea4',
  },
  dayChipText: {
    color: '#0a3b40',
    fontSize: 12,
    fontWeight: '500',
  },
  dayChipTextSelected: {
    color: '#0a3b40',
    fontWeight: '700',
  },
  potencyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  overlayBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  potencyCard: {
    width: '80%',
    maxWidth: 420,
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 10,
  },
  potencyTitle: {
    fontWeight: '700',
    color: '#0a4b57',
    marginBottom: 8,
  },
  addMedicineBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(10,126,164,0.06)',
  },
  addMedicineText: {
    color: '#0a3b40',
    fontWeight: '600',
    fontSize: 13,
  },
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

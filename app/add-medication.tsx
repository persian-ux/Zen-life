import AddMedication from '@/components/dashboard/AddMedication';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AddMedicationScreen() {
  const router = useRouter();

  async function handleSave(data: Record<string, { name: string; dosage: string; time: string }>) {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const raw = await AsyncStorage.getItem('schedules');
      const existing = raw ? JSON.parse(raw) : [];

      const colorPalette = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#fb923c', '#6366f1', '#ef4444'];
      let idx = existing.length;
      const items: any[] = [];
      Object.keys(data).forEach((day) => {
        const entry = data[day];
        if (entry && entry.name && entry.name.trim().length) {
          items.push({ id: Date.now() + idx, name: entry.name, dosage: entry.dosage, time: entry.time || '', days: [day], taken: false, color: colorPalette[idx % colorPalette.length] });
          idx += 1;
        }
      });

      const next = [...existing, ...items];
      await AsyncStorage.setItem('schedules', JSON.stringify(next));
    } catch (e) {
      // ignore
    }

    // go back to dashboard
    router.replace('/dashboard');
  }

  return (
    <ThemedView style={styles.screen}>
      <View style={{ alignItems: 'center', padding: 20 }}>
        <AddMedication
          onSave={handleSave}
          onCancel={() => router.replace('/dashboard')}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});

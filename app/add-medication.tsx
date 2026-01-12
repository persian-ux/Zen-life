import AddMedication from '@/components/dashboard/AddMedication';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function AddMedicationScreen() {
  const router = useRouter();

  async function handleSave(
    data: { name: string; dosage: string; potency: string; time: string; days: string[] }[],
  ) {
    const user = auth.currentUser;
    if (!user) {
      router.replace('/login');
      return;
    }

    try {
      const colorPalette = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#fb923c', '#6366f1', '#ef4444'];
      let idx = 0;
      const baseRef = collection(db, 'users', user.uid, 'schedules');

      const writes: Promise<any>[] = [];
      data.forEach((entry) => {
        if (entry && entry.name && entry.name.trim().length && entry.days && entry.days.length) {
          const payload = {
            name: entry.name.trim(),
            dosage: entry.dosage.trim(),
            potency: entry.potency.trim(),
            time: entry.time || '',
            days: entry.days,
            taken: false,
            color: colorPalette[idx % colorPalette.length],
            createdAt: serverTimestamp(),
          };
          writes.push(addDoc(baseRef, payload));
          idx += 1;
        }
      });

      await Promise.all(writes);
    } catch (e) {
      console.log('Error saving schedules to Firestore', e);
    }

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

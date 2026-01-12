import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MedicationCard from './MedicationCard';

type UpcomingProps = {
  items: any[];
  onToggleTake?: (id: string, nextTaken: boolean) => void;
};

export default function Upcoming({ items, onToggleTake }: UpcomingProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Coming Up</ThemedText>
      <View style={{ width: '100%', marginTop: 8 }}>
        {items.map((it) => (
          <View key={it.id} style={{ marginBottom: 10 }}>
            <MedicationCard
              name={it.name}
              dosage={it.dosage}
              potency={it.potency}
              time={it.time}
              taken={it.taken}
              color={it.color}
              onToggleTake={
                onToggleTake && it.id ? () => onToggleTake(String(it.id), !it.taken) : undefined
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginTop: 18 },
  title: { marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, backgroundColor: '#fff', marginBottom: 10, borderWidth: 1, borderColor: 'rgba(10,126,164,0.04)' },
  name: { fontWeight: '700', color: '#0a4b57' },
  meta: { color: '#6b7b83' },
  action: { backgroundColor: '#6b5bff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  actionText: { color: '#fff', fontWeight: '700' },
});

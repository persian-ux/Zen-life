import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function MedicationCard({ name, dosage, time, taken, color = '#6b5bff' }: { name: string; dosage?: string; time: string; taken?: boolean; color?: string }) {
  return (
    <View style={styles.card}>
      <View style={[styles.left, { backgroundColor: color }]}> 
        <ThemedText style={styles.leftInitial}>{name.charAt(0)}</ThemedText>
      </View>

      <View style={styles.content}>
        <ThemedText style={styles.name}>{name}</ThemedText>
        {dosage ? <ThemedText style={styles.dosage}>{dosage}</ThemedText> : null}
      </View>

      <View style={styles.right}>
        <ThemedText style={styles.time}>{time}</ThemedText>
        <TouchableOpacity style={[styles.takeBtn, taken && styles.taken]}>
          <ThemedText style={[styles.takeText, taken && { color: '#fff' }]}>{taken ? 'Taken' : 'Take'}</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgba(10,126,164,0.04)' },
  left: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  leftInitial: { color: '#fff', fontWeight: '800' },
  content: { flex: 1 },
  name: { fontWeight: '800', color: '#0a4b57' },
  dosage: { color: '#6b7b83', marginTop: 4 },
  right: { alignItems: 'flex-end' },
  time: { color: '#0a4b57', fontWeight: '700' },
  takeBtn: { marginTop: 8, backgroundColor: '#eef2ff', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  taken: { backgroundColor: '#6b5bff' },
  takeText: { color: '#6b5bff', fontWeight: '700' },
});

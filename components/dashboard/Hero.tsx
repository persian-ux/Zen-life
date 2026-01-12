import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Hero({ onAdd }: { onAdd?: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <ThemedText type="subtitle" style={styles.kicker}>Your Health Companion</ThemedText>
        <ThemedText type="title" style={styles.title}>Never Miss Your Medicine Again</ThemedText>
        <ThemedText style={styles.lead}>Stay on track with your medication schedule. Simple reminders, better health outcomes.</ThemedText>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primary} onPress={onAdd} activeOpacity={0.85}>
            <ThemedText style={styles.primaryText}>+ Add Medication</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondary} activeOpacity={0.85}>
            <ThemedText style={styles.secondaryText}>View Schedule</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', paddingVertical: 18, paddingHorizontal: 18, backgroundColor: 'rgba(10,126,164,0.03)' },
  inner: { maxWidth: 980, alignSelf: 'center' },
  kicker: { backgroundColor: '#e9f5ff', alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 18, color: '#0a6fb0', marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 8, color: '#0b3b45' },
  lead: { color: '#67767a', marginBottom: 12 },
  actions: { flexDirection: 'row' },
  primary: { backgroundColor: '#6b5bff', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, marginRight: 10 },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondary: { borderWidth: 1, borderColor: 'rgba(10,126,164,0.12)', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  secondaryText: { color: '#0a3b40', fontWeight: '600' },
});

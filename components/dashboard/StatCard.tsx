import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function StatCard({ label, value, bgColor = '#e6f7ff', color = '#0a6fb0' }: { label: string; value: string | number; bgColor?: string; color?: string }) {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <ThemedText style={[styles.value, { color }]}>{value}</ThemedText>
      <ThemedText style={styles.label}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14, borderRadius: 12, alignItems: 'flex-start', justifyContent: 'center' },
  value: { fontSize: 18, fontWeight: '800' },
  label: { marginTop: 6, color: '#6b7b83' },
});

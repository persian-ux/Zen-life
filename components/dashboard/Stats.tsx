import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <View style={styles.card}>
      <ThemedText style={styles.statTitle}>{title}</ThemedText>
      <ThemedText style={styles.statValue}>{value}</ThemedText>
    </View>
  );
}

export default function Stats() {
  return (
    <View style={styles.row}>
      <StatCard title="Taken Today" value="2/6" />
      <StatCard title="Upcoming" value={4} />
      <StatCard title="Streak" value="7 days" />
      <StatCard title="Missed" value={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 18, marginBottom: 18 },
  card: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 12, marginRight: 10, borderWidth: 1, borderColor: 'rgba(10,126,164,0.04)' },
  statTitle: { color: '#6b7b83', marginBottom: 6 },
  statValue: { fontSize: 18, fontWeight: '700', color: '#0a4b57' },
});

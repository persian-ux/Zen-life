import React from 'react';
import { StyleSheet, View } from 'react-native';
import StatCard from './StatCard';

export default function Stats() {
  return (
    <View style={styles.row}>
      <StatCard label="Taken Today" value="2/6" color="#16a34a" bgColor="#ecfdf5" />
      <StatCard label="Upcoming" value={4} color="#0ea5e9" bgColor="#eff6ff" />
      <StatCard label="Streak" value="7 days" color="#7c3aed" bgColor="#f5f3ff" />
      <StatCard label="Missed" value={0} color="#ea580c" bgColor="#fff7ed" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 18, marginBottom: 18 },
  card: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 12, marginRight: 10, borderWidth: 1, borderColor: 'rgba(10,126,164,0.04)' },
  statTitle: { color: '#6b7b83', marginBottom: 6 },
  statValue: { fontSize: 18, fontWeight: '700', color: '#0a4b57' },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import StatCard from './StatCard';

type StatsProps = {
  todayTaken: number;
  todayTotal: number;
  upcomingCount: number;
  missedCount: number;
  streakDays: number;
};

export default function Stats({
  todayTaken,
  todayTotal,
  upcomingCount,
  missedCount,
  streakDays,
}: StatsProps) {
  const takenLabel = `${todayTaken}/${todayTotal}`;
  const streakLabel = `${streakDays} day${streakDays === 1 ? '' : 's'}`;

  return (
    <View style={styles.row}>
      <StatCard label="Taken Today" value={takenLabel} color="#16a34a" bgColor="#ecfdf5" />
      <StatCard label="Upcoming" value={upcomingCount} color="#0ea5e9" bgColor="#eff6ff" />
      <StatCard label="Streak" value={streakLabel} color="#7c3aed" bgColor="#f5f3ff" />
      <StatCard label="Missed" value={missedCount} color="#ea580c" bgColor="#fff7ed" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 18, marginBottom: 18 },
  card: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 12, marginRight: 10, borderWidth: 1, borderColor: 'rgba(10,126,164,0.04)' },
  statTitle: { color: '#6b7b83', marginBottom: 6 },
  statValue: { fontSize: 18, fontWeight: '700', color: '#0a4b57' },
});

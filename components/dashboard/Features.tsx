import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <View style={styles.card}>
      <ThemedText style={styles.featureTitle}>{title}</ThemedText>
      <ThemedText style={styles.featureDesc}>{desc}</ThemedText>
    </View>
  );
}

export default function Features() {
  return (
    <View style={styles.row}>
      <Feature title="Smart Reminders" desc="Get notified at the right time, every time." />
      <Feature title="Track Progress" desc="Monitor adherence and build healthy habits." />
      <Feature title="Health Insights" desc="View analytics and insights about your routine." />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  card: { flex: 1, backgroundColor: '#fff', padding: 16, borderRadius: 12, marginRight: 12, borderWidth: 1, borderColor: 'rgba(10,126,164,0.04)' },
  featureTitle: { fontWeight: '700', marginBottom: 6, color: '#0a4b57' },
  featureDesc: { color: '#6b7b83' },
});

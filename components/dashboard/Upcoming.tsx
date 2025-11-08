import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Upcoming({ items }: { items: any[] }) {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Coming Up</ThemedText>
      {items.map((it) => (
        <View key={it.id} style={styles.row}>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.name}>{it.name}</ThemedText>
            <ThemedText style={styles.meta}>{it.time}</ThemedText>
          </View>
          <TouchableOpacity style={styles.action}>
            <ThemedText style={styles.actionText}>Take Now</ThemedText>
          </TouchableOpacity>
        </View>
      ))}
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

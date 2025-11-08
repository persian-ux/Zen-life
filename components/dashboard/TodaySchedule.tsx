import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TodaySchedule({ schedules, onRemove }: { schedules: any[]; onRemove: (id: number) => void }) {
  return (
    <View style={styles.container}>
  <ThemedText type="title" style={styles.title}>{"Today's Schedule"}</ThemedText>
      <FlatList
        data={schedules}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.name}>{item.name}</ThemedText>
              <ThemedText style={styles.sub}>{item.time}</ThemedText>
            </View>
            <TouchableOpacity style={styles.takeBtn} onPress={() => onRemove(item.id)}>
              <ThemedText style={styles.takeBtnText}>Take</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginTop: 12 },
  title: { marginBottom: 8 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(10,126,164,0.04)' },
  name: { fontWeight: '700', color: '#0a4b57' },
  sub: { color: '#6b7b83', marginTop: 4 },
  takeBtn: { backgroundColor: '#6b5bff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  takeBtnText: { color: '#fff', fontWeight: '700' },
});

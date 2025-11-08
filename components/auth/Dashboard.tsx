import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import AddScheduleForm from '@/components/dashboard/AddScheduleForm';
import Features from '@/components/dashboard/Features';
import Hero from '@/components/dashboard/Hero';
import Stats from '@/components/dashboard/Stats';
import TodaySchedule from '@/components/dashboard/TodaySchedule';
import Upcoming from '@/components/dashboard/Upcoming';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function DashboardComponent() {
  const router = useRouter();
  // Local schedule state — in a real app persist in secure storage or backend
  const [medName, setMedName] = useState('');
  const [medTime, setMedTime] = useState('09:00');
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<{ id: number; name: string; time: string; days: string[] }[]>([]);

  function toggleDay(day: string) {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  }

  function addSchedule() {
    if (!medName.trim()) return;
    if (!medTime.trim()) return;
    const id = Date.now();
    setSchedules((s) => [{ id, name: medName.trim(), time: medTime.trim(), days: selectedDays.length ? selectedDays : DAYS }, ...s]);
    // reset form
    setMedName('');
    setMedTime('09:00');
    setSelectedDays([]);
  }

  function removeSchedule(id: number) {
    setSchedules((s) => s.filter((it) => it.id !== id));
  }

  function handleSignOut() {
    // Clear auth state here and navigate back to login
    router.replace('/login');
  }

  // compute todays schedules (simple): items that include current day
  const now = new Date();
  const dayIndex = now.getDay(); // 0 Sun .. 6 Sat
  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayAbbrev = dayMap[dayIndex];

  const todays = schedules.filter((s) => s.days.includes(todayAbbrev));
  const upcoming = schedules.slice(0, 3);

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 24 }}>
        <Hero onAdd={() => { /* could scroll to form */ }} />

        <View style={{ maxWidth: 980, width: '100%', alignItems: 'center' }}>
          <Stats />

          <View style={styles.card}>
            <AddScheduleForm medName={medName} medTime={medTime} onChangeName={setMedName} onChangeTime={setMedTime} onAdd={addSchedule} days={selectedDays} toggleDay={toggleDay} />

            <TodaySchedule schedules={todays} onRemove={removeSchedule} />

            <Upcoming items={upcoming} />

            <Features />

            <TouchableOpacity style={styles.signout} onPress={handleSignOut} activeOpacity={0.85}>
              <ThemedText style={styles.signoutText}>Sign out</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  card: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: 'linear-gradient(180deg, #fff, #f7fcff)',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
  },
  title: { marginBottom: 6, color: '#0a6fb0', textAlign: 'center', fontSize: 20, fontWeight: '700' },
  subtitle: { marginBottom: 18, color: '#4b6b7a', textAlign: 'center' },
  formRow: { flexDirection: 'row', width: '100%', marginBottom: 12, alignItems: 'center' },
  input: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(10,126,164,0.06)',
    color: '#173943',
  },
  daysRow: { flexDirection: 'row', flexWrap: 'wrap', width: '100%', marginBottom: 12 },
  dayChip: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(10,126,164,0.12)',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  dayChipActive: { backgroundColor: '#0a7ea4', borderColor: '#0a7ea4' },
  dayText: { color: '#0a3b40', fontWeight: '600' },
  addBtn: { marginTop: 6, backgroundColor: '#0a7ea4', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: '700' },
  emptyState: { padding: 18, alignItems: 'center' },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#2b5963' },
  emptySub: { color: '#6b7b83', marginTop: 6, textAlign: 'center' },
  scheduleCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(10,126,164,0.06)' },
  medName: { fontSize: 16, fontWeight: '700', color: '#0a4b57' },
  medTime: { color: '#177a4c', marginTop: 4, marginBottom: 6 },
  scheduleDaysRow: { flexDirection: 'row', flexWrap: 'wrap' },
  scheduleDay: { paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6, marginRight: 6, marginBottom: 6 },
  scheduleDayActive: { backgroundColor: '#0a7ea4' },
  scheduleDayInactive: { backgroundColor: 'rgba(10,126,164,0.06)' },
  scheduleDayTextActive: { color: '#fff', fontSize: 12, fontWeight: '700' },
  scheduleDayTextInactive: { color: '#0a4b57', fontSize: 12, fontWeight: '600' },
  removeBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  removeText: { color: '#d33', fontWeight: '700' },
  signout: { marginTop: 12, paddingVertical: 10 },
  signoutText: { color: '#0a7ea4', fontWeight: '700' },
});

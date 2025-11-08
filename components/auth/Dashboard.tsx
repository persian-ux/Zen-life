import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function DashboardComponent() {
  const router = useRouter();

  function handleSignOut() {
    // Clear auth state here and navigate to login
    router.replace('/login');
  }

  return (
    <ThemedView style={styles.screen}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.title}>Dashboard</ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>Welcome to your Zenlife dashboard.</ThemedText>

        <TouchableOpacity style={styles.button} onPress={handleSignOut} activeOpacity={0.85}>
          <ThemedText style={styles.buttonText}>Sign out</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    alignItems: 'center',
  },
  title: { marginBottom: 6, color: '#0a6fb0', textAlign: 'center' },
  subtitle: { marginBottom: 18, color: '#4b6b7a', textAlign: 'center' },
  button: { marginTop: 18, backgroundColor: '#0a7ea4', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: '600' },
});

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginComponent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    // Hook into your auth flow here. Do not log credentials to console.
    // After a successful login navigate to the dashboard.
    router.replace('/dashboard');
  }

  return (
    <ThemedView style={styles.screen}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.logo}>Welcome back</ThemedText>
        <ThemedText type="subtitle" style={styles.tagline}>Log in to your account</ThemedText>

        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          placeholderTextColor="#9aa4ad"
          style={styles.input}
          autoCapitalize="none"
        />

        <ThemedText style={[styles.label, { marginTop: 12 }]}>Password</ThemedText>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          placeholderTextColor="#9aa4ad"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.submit} activeOpacity={0.85} onPress={handleLogin}>
          <ThemedText style={styles.submitText}>Log in</ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.footer}>
          {"Don't have an account?"} <ThemedText type="link" onPress={() => router.push('/(tabs)')}>Sign up</ThemedText>
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  logo: { textAlign: 'center', marginBottom: 6, color: '#0a6fb0' },
  tagline: { textAlign: 'center', marginBottom: 18, color: '#4b6b7a' },
  label: { fontSize: 13, marginBottom: 6, color: '#455a64' },
  input: { height: 44, borderRadius: 12, paddingHorizontal: 12, backgroundColor: 'rgba(10,126,164,0.06)', color: '#173943' },
  submit: { marginTop: 14, backgroundColor: '#0a7ea4', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  footer: { marginTop: 14, textAlign: 'center', alignSelf: 'center', color: '#6b7b83' },
});

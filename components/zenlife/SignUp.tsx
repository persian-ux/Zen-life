import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function validateAndSubmit() {
    setError('');
    if (!username.trim() || !email.trim() || !password) {
      setError('Please fill all fields.');
      return;
    }

    // basic email check
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // For now just log the values — hook into your auth flow here.
     
    console.log('SignUp', { username, email, password });
    setError('');
    // clear form (optional)
    setUsername('');
    setEmail('');
    setPassword('');
  }

  return (
    <ThemedView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        {/* Decorative background blobs */}
        <View style={[styles.blob, styles.blobOne]} />
        <View style={[styles.blob, styles.blobTwo]} />

        <View style={styles.card}>
          <ThemedText type="title" style={styles.logo}>
            Zenlife
          </ThemedText>
          <ThemedText type="subtitle" style={styles.tagline}>
            Create an account and start your mindful journey
          </ThemedText>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Username</ThemedText>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="your name"
              placeholderTextColor="#9aa4ad"
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              placeholderTextColor="#9aa4ad"
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>

          <View style={styles.field}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <View style={styles.passwordRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Choose a strong password"
                placeholderTextColor="#9aa4ad"
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                secureTextEntry={!showPassword}
                returnKeyType="done"
              />
              <Pressable onPress={() => setShowPassword((s) => !s)} style={styles.showBtn}>
                <ThemedText type="link">{showPassword ? 'Hide' : 'Show'}</ThemedText>
              </Pressable>
            </View>
          </View>

          {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

          <TouchableOpacity style={styles.submit} activeOpacity={0.85} onPress={validateAndSubmit}>
            <ThemedText style={styles.submitText}>Sign up</ThemedText>
          </TouchableOpacity>

          <ThemedText style={styles.footer}>
            Already have an account? <ThemedText type="link">Log in</ThemedText>
          </ThemedText>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
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
  logo: {
    textAlign: 'center',
    marginBottom: 6,
    color: '#0a6fb0',
  },
  tagline: {
    textAlign: 'center',
    marginBottom: 18,
    color: '#4b6b7a',
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    color: '#455a64',
  },
  input: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(10,126,164,0.06)',
    color: '#173943',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  submit: {
    marginTop: 10,
    backgroundColor: '#0a7ea4',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 14,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#6b7b83',
  },
  error: {
    color: '#d33',
    marginTop: 6,
    marginBottom: 4,
  },
  blob: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 140,
    opacity: 0.12,
    transform: [{ scale: 1.1 }],
  },
  blobOne: {
    top: -40,
    left: -60,
    backgroundColor: '#0a7ea4',
  },
  blobTwo: {
    bottom: -80,
    right: -80,
    backgroundColor: '#ff7ea4',
  },
});

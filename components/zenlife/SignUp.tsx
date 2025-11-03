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

  // declare password strength calculation
  const passwordStrength = React.useMemo(() => {
    // Early exit for empty password
    const pw = password || '';
    // if condition for empty password
    if (!pw) {
      return { level: 0, percent: 0, label: '', color: '#e0e0e0' };
    }

    // password length
    const lengthOK = pw.length >= 8;
    // Upper case
    const hasUpper = /[A-Z]/.test(pw);
    // lower case
    const hasLower = /[a-z]/.test(pw);
    // numbers
    const hasNumber = /[0-9]/.test(pw);
    // special chars
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);

    // Score based on variety (0..4)
    let variety = 0;
    if (hasUpper) variety++;
    if (hasLower) variety++;
    if (hasNumber) variety++;
    if (hasSpecial) variety++;

    // Raw points: length gives a base advantage
    const raw = (lengthOK ? 1 : 0) + variety; // 0..5

    // Map raw to 0..3 levels
    let level = 0; // 0 => empty, 1 => weak, 2 => medium, 3 => strong
    if (raw === 0) level = 0;
    // 1 or 2 points => weak
    else if (raw <= 2) level = 1;
    // 3 points => medium
    else if (raw === 3) level = 2;
    // 4 or 5 points => strong
    else level = 3;

    // Calculate percent for bar (min 6% to show something, max 100%)
    const percent = Math.round((raw / 5) * 100);
    // Determine color 
    let color = '#d33';
    // Determine label
    let label = 'Weak';
    // Adjust color and label based on level if level =2 
    if (level === 2) {
      color = '#f4b400';
      label = 'Medium';
      // if level =3
    } else if (level === 3) {
      color = '#0abf6b';
      label = 'Strong';
    }
    // Calculate percentage
    return { level, percent: Math.min(100, Math.max(6, percent)), label, color };
  }, [password]);

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
            {/* Password strength indicator (2nd method): colored horizontal bar + label */}
            {password ? (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBar}>
                  <View
                    style={[
                      styles.strengthFill,
                      { width: `${passwordStrength.percent}%`, backgroundColor: passwordStrength.color },
                    ]}
                  />
                </View>
                <ThemedText style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                  {passwordStrength.label}
                </ThemedText>
              </View>
            ) : null}
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
  strengthContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  strengthBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(10,126,164,0.12)',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 8,
  },
  strengthLabel: {
    fontSize: 13,
    minWidth: 56,
    textAlign: 'right',
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

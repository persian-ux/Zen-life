// Password strength checker (modernized)
// Exports a single function `computePasswordStrength(password)` that returns
// { level: number, percent: number, label: string, color: string }
// Level mapping: 0 = empty, 1 = weak, 2 = medium, 3 = strong

function uniqChars(s: string) {
  const set = new Set<string>();
  for (const ch of s) set.add(ch);
  return set.size;
}

function approxPoolSize(password: string) {
  // approximate character pool size based on what classes are present
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^A-Za-z0-9]/.test(password)) pool += 32; // rough special char count
  // if password contains unusual unicode, increase pool conservatively
  if (/[\u0080-\uFFFF]/.test(password)) pool += 50;
  return Math.max(pool, 1);
}

function estimateEntropy(password: string) {
  if (!password) return 0;
  const pool = approxPoolSize(password);
  // entropy bits = length * log2(pool)
  const bitsPerChar = Math.log2(pool);
  // penalize repetition by unique characters factor
  const uniqFactor = uniqChars(password) / Math.max(1, password.length);
  const rawEntropy = password.length * bitsPerChar * (0.5 + 0.5 * uniqFactor);
  return rawEntropy;
}

const COMMON_PASSWORDS = new Set([
  '123456', 'password', '12345678', 'qwerty', '123456789', '12345', '1234', '111111', '123123',
  'abc123', 'password1', 'iloveyou', 'admin', 'welcome', 'monkey', 'login', 'letmein', 'princess',
  'qwerty123', 'solo', 'passw0rd', 'starwars'
]);

export function computePasswordStrength(password: string) {
  const pw = password || '';
  if (!pw) return { level: 0, percent: 0, label: '', color: '#e0e0e0' };

  // Quick checks
  const isCommon = COMMON_PASSWORDS.has(pw.toLowerCase());
  const length = pw.length;
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);

  // Entropy-based estimate (bits)
  const entropy = estimateEntropy(pw);

  // Score components
  let score = 0;
  // variety
  const variety = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  score += Math.min(4, variety); // 0..4

  // length bonus
  if (length >= 12) score += 2;
  else if (length >= 8) score += 1;

  // entropy bonus
  if (entropy >= 60) score += 2;
  else if (entropy >= 36) score += 1;

  // penalty for common passwords
  if (isCommon) score = Math.max(0, score - 3);

  // Map score (0..8) into levels 1..3 (0 reserved for empty)
  let level = 1;
  if (score <= 2) level = 1; // weak
  else if (score <= 4) level = 2; // medium
  else level = 3; // strong

  // Percent visualization based on entropy and score
  // Prefer entropy mapping but mix in score to avoid 0 on long very uniform pw
  const entropyPercent = Math.min(100, Math.round((entropy / 60) * 100));
  const scorePercent = Math.round((score / 8) * 100);
  const percent = Math.max(6, Math.min(100, Math.round((entropyPercent * 0.7) + (scorePercent * 0.3))));

  let color = '#d33';
  let label = 'Weak';
  if (level === 2) {
    color = '#f4b400';
    label = 'Medium';
  } else if (level === 3) {
    color = '#0abf6b';
    label = 'Strong';
  }

  // If common password, force Weak label and red color
  if (isCommon) {
    color = '#b71c1c';
    label = 'Very common';
  }

  return { level, percent, label, color };
}

export default computePasswordStrength;

// Returns a small checklist used by the UI to show requirement pass/fail states.
export function getPasswordChecklist(password: string) {
  const pw = password || '';
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  const lengthOk = pw.length >= 8 && pw.length <= 20;

  return [
    { key: 'length', label: '8-20 Characters', passed: lengthOk },
    { key: 'upper', label: 'At least one capital letter', passed: hasUpper },
    { key: 'number', label: 'At least one number', passed: hasNumber },
    { key: 'special', label: 'At least one special character', passed: hasSpecial },
  ];
}


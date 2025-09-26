import bcrypt from 'bcryptjs'

/**
 * Hasht ein Passwort sicher mit bcrypt
 * @param password Das zu hashende Passwort
 * @returns Promise mit dem gehashten Passwort
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12 // Höhere Sicherheit für 2024+
  return bcrypt.hash(password, saltRounds)
}

/**
 * Verifiziert ein Passwort gegen den Hash
 * @param password Das eingegebene Passwort
 * @param hash Der gespeicherte Hash
 * @returns Promise<boolean> ob das Passwort korrekt ist
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Prüft die Passwort-Stärke
 * @param password Das zu prüfende Passwort
 * @returns Objekt mit Stärke-Informationen
 */
export function checkPasswordStrength(password: string) {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noCommonPatterns: !isCommonPassword(password)
  }

  const score = Object.values(checks).filter(Boolean).length
  
  let strength: 'weak' | 'medium' | 'strong'
  if (score < 3) strength = 'weak'
  else if (score < 5) strength = 'medium'
  else strength = 'strong'

  return {
    strength,
    score,
    checks,
    suggestions: generatePasswordSuggestions(checks)
  }
}

/**
 * Prüft auf häufige/schwache Passwörter
 */
function isCommonPassword(password: string): boolean {
  const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123',
    'password123', 'admin', 'letmein', 'welcome', 'monkey'
  ]
  
  return commonPasswords.includes(password.toLowerCase())
}

/**
 * Generiert Verbesserungsvorschläge
 */
function generatePasswordSuggestions(checks: Record<string, boolean>): string[] {
  const suggestions: string[] = []
  
  if (!checks.minLength) suggestions.push('Mindestens 8 Zeichen verwenden')
  if (!checks.hasUppercase) suggestions.push('Großbuchstaben hinzufügen')
  if (!checks.hasLowercase) suggestions.push('Kleinbuchstaben hinzufügen')
  if (!checks.hasNumbers) suggestions.push('Zahlen hinzufügen')
  if (!checks.hasSpecialChars) suggestions.push('Sonderzeichen hinzufügen')
  if (!checks.noCommonPatterns) suggestions.push('Häufige Passwörter vermeiden')
  
  return suggestions
}

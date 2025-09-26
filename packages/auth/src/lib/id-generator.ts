/**
 * Generiert eine einzigartige Barowa ID im Format XXXX-XXXX
 * 
 * Features:
 * - 4-4 Format für gute Merkbarkeit
 * - ~1 Billion mögliche Kombinationen
 * - Keine verwirrenden Zeichen (0, O, 1, I)
 * - Collision-resistant durch große Keyspace
 */

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 32 Zeichen ohne verwirrende

/**
 * Generiert eine neue Barowa ID
 * @returns String im Format "B7K9-M2X4"
 */
export function generateBarowaId(): string {
  const part1 = generateRandomString(4)
  const part2 = generateRandomString(4)
  
  return `${part1}-${part2}`
}

/**
 * Generiert einen zufälligen String der gegebenen Länge
 */
function generateRandomString(length: number): string {
  return Array.from(
    { length }, 
    () => CHARS[Math.floor(Math.random() * CHARS.length)]
  ).join('')
}

/**
 * Validiert eine Barowa ID
 * @param id Die zu validierende ID
 * @returns true wenn gültig
 */
export function validateBarowaId(id: string): boolean {
  // Regex für XXXX-XXXX Format mit erlaubten Zeichen
  const pattern = /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}$/
  return pattern.test(id)
}

/**
 * Formatiert eine ID für bessere Lesbarkeit
 * @param id Unformatierte ID
 * @returns Formatierte ID oder null bei ungültiger Eingabe
 */
export function formatBarowaId(id: string): string | null {
  // Entferne alle Nicht-Alphanumerischen Zeichen
  const cleaned = id.replace(/[^A-Z0-9]/gi, '').toUpperCase()
  
  if (cleaned.length !== 8) {
    return null
  }
  
  const formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}`
  
  return validateBarowaId(formatted) ? formatted : null
}

/**
 * Kern-Typ für digitale Identitäten in Barowa
 */
export interface DigitalIdentity {
  /** Interne UUID für die Datenbank */
  id: string
  
  /** Öffentliche Barowa ID (z.B. "B7K9-M2X4") */
  barowaId: string
  
  /** Gehashtes Passwort */
  passwordHash: string
  
  /** Zeitstempel der Erstellung */
  createdAt: Date
  
  /** Letzter Login */
  lastLoginAt: Date | null
  
  /** Account Status */
  status: 'active' | 'suspended' | 'pending'
  
  /** Device Fingerprint für Bot-Protection (gehashed) */
  deviceFingerprintHash?: string
  
  /** Optionale Verknüpfungen (nur wenn User das will) */
  email?: string
  phone?: string
  
  /** Öffentliches Profil (optional) */
  publicProfile?: {
    displayName?: string
    bio?: string
    isPubliclySearchable: boolean
  }
}

/**
 * Daten für die Registrierung einer neuen Identität
 */
export interface CreateIdentityRequest {
  password: string
  deviceFingerprint?: string
  email?: string
  publicProfile?: {
    displayName?: string
    bio?: string
  }
}

/**
 * Login-Daten
 */
export interface LoginRequest {
  /** Kann Barowa ID oder E-Mail sein */
  identifier: string
  password: string
  deviceFingerprint?: string
}

/**
 * JWT Token Payload
 */
export interface TokenPayload {
  /** Interne User ID */
  userId: string
  
  /** Barowa ID */
  barowaId: string
  
  /** Token-Typ */
  type: 'access' | 'refresh'
  
  /** Ausstellungsdatum */
  iat: number
  
  /** Ablaufdatum */
  exp: number
}

/**
 * Server-Zuordnung für eine Identität
 */
export interface IdentityServer {
  identityId: string
  serverType: 'hetzner' | 'home' | 'other'
  serverUrl: string
  isPrimary: boolean
  createdAt: Date
}

/**
 * Recovery-Code für Account-Wiederherstellung
 */
export interface RecoveryCode {
  identityId: string
  codeHash: string
  usedAt?: Date
  createdAt: Date
}

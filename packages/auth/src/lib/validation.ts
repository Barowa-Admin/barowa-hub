import { z } from 'zod'

/**
 * Validation Schema für Registrierung
 */
export const registrationSchema = z.object({
  password: z
    .string()
    .min(8, 'Passwort muss mindestens 8 Zeichen haben')
    .max(128, 'Passwort darf maximal 128 Zeichen haben')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Passwort muss Klein-, Großbuchstaben und Zahlen enthalten'
    ),
  confirmPassword: z.string(),
  email: z
    .string()
    .email('Ungültige E-Mail-Adresse')
    .optional(),
  deviceFingerprint: z.string().optional(),
  publicProfile: z.object({
    displayName: z
      .string()
      .min(2, 'Name muss mindestens 2 Zeichen haben')
      .max(50, 'Name darf maximal 50 Zeichen haben')
      .optional(),
    bio: z
      .string()
      .max(200, 'Bio darf maximal 200 Zeichen haben')
      .optional(),
    isPubliclySearchable: z.boolean().default(false)
  }).optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
})

/**
 * Validation Schema für Login
 */
export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Barowa ID oder E-Mail erforderlich')
    .max(100, 'Identifier zu lang'),
  password: z
    .string()
    .min(1, 'Passwort erforderlich'),
  deviceFingerprint: z.string().optional(),
  rememberMe: z.boolean().default(false)
})

/**
 * Validation Schema für Barowa ID
 */
export const barowaIdSchema = z
  .string()
  .regex(
    /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}$/,
    'Ungültige Barowa ID Format'
  )

/**
 * Validation Schema für Passwort-Reset
 */
export const passwordResetSchema = z.object({
  recoveryCode: z
    .string()
    .min(1, 'Recovery-Code erforderlich'),
  newPassword: z
    .string()
    .min(8, 'Passwort muss mindestens 8 Zeichen haben')
    .max(128, 'Passwort darf maximal 128 Zeichen haben'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
})

/**
 * Validation Schema für Profil-Updates
 */
export const profileUpdateSchema = z.object({
  email: z
    .string()
    .email('Ungültige E-Mail-Adresse')
    .optional(),
  phone: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Ungültige Telefonnummer (internationales Format)')
    .optional(),
  publicProfile: z.object({
    displayName: z
      .string()
      .min(2, 'Name muss mindestens 2 Zeichen haben')
      .max(50, 'Name darf maximal 50 Zeichen haben')
      .optional(),
    bio: z
      .string()
      .max(200, 'Bio darf maximal 200 Zeichen haben')
      .optional(),
    isPubliclySearchable: z.boolean()
  }).optional()
})

/**
 * Validation Schema für Server-Zuordnung
 */
export const serverConfigSchema = z.object({
  serverType: z.enum(['HETZNER', 'HOME', 'OTHER']),
  serverUrl: z
    .string()
    .url('Ungültige Server-URL'),
  isPrimary: z.boolean().default(false),
  name: z
    .string()
    .min(1, 'Server-Name erforderlich')
    .max(100, 'Server-Name zu lang')
    .optional()
})

/**
 * Helper: Typ-Extraktion aus Schemas
 */
export type RegistrationData = z.infer<typeof registrationSchema>
export type LoginData = z.infer<typeof loginSchema>
export type PasswordResetData = z.infer<typeof passwordResetSchema>
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>
export type ServerConfigData = z.infer<typeof serverConfigSchema>

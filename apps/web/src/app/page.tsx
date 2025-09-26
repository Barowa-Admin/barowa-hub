'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Schema für die Registrierung
const registrationSchema = z.object({
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen haben'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
})

type RegistrationForm = z.infer<typeof registrationSchema>

// Funktion zur ID-Generierung (später ins Backend)
function generateBarowaId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Ohne verwirrende Zeichen
  const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `${part1}-${part2}`
}

export default function HomePage() {
  const [step, setStep] = useState<'register' | 'success'>('register')
  const [barowaId, setBarowaId] = useState<string>('')
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema)
  })

  const onSubmit = async (data: RegistrationForm) => {
    // Simuliere API-Call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generiere Barowa ID
    const newId = generateBarowaId()
    setBarowaId(newId)
    setStep('success')
  }

  if (step === 'success') {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Willkommen bei Barowa!
            </h1>
            <p className="text-gray-600">
              Deine digitale Identität wurde erfolgreich erstellt.
            </p>
          </div>

          <div className="bg-barowa-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Deine Barowa ID:</p>
            <div className="font-mono text-xl font-bold text-barowa-700 mb-3">
              {barowaId}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => navigator.clipboard.writeText(barowaId)}
                className="btn-secondary text-sm flex-1"
              >
                ID kopieren
              </button>
              <button className="btn-secondary text-sm flex-1">
                QR-Code
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-sm text-gray-600 text-left">
              <strong>⚠️ Wichtig:</strong> Notiere dir diese ID! Du brauchst sie zum Anmelden.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Was möchtest du als erstes?</h3>
            <button className="btn-primary w-full">
              🌐 Domain kaufen
            </button>
            <button className="btn-primary w-full">
              🖥️ Server einrichten
            </button>
            <button className="btn-primary w-full">
              📧 E-Mail erstellen
            </button>
            <button className="btn-secondary w-full">
              Später entscheiden
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏠 Barowa Hub
          </h1>
          <p className="text-xl text-gray-600">
            Deine digitale Grundausstattung
          </p>
        </div>

        {/* Registrierungsform */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Digitale Identität erstellen
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Passwort
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                className="input-primary w-full"
                placeholder="Dein sicheres Passwort"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Passwort bestätigen
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                id="confirmPassword"
                className="input-primary w-full"
                placeholder="Passwort wiederholen"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full mt-6"
            >
              {isSubmitting ? 'Erstelle...' : 'Digitale Identität erstellen'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Mit der Erstellung akzeptierst du unsere{' '}
              <a href="#" className="text-barowa-600 hover:underline">Datenschutzerklärung</a>
              {' '}und {' '}
              <a href="#" className="text-barowa-600 hover:underline">Nutzungsbedingungen</a>
            </p>
          </div>
        </div>

        {/* Info-Bereich */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            🔒 Privacy-first • 🌍 Dezentral • 🚀 Open Source
          </p>
        </div>
      </div>
    </main>
  )
}

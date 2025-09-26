import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { generateBarowaId, hashPassword, verifyPassword } from '@barowa/auth'

// Validation Schemas
const registrationSchema = z.object({
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen haben'),
  email: z.string().email().optional(),
  deviceFingerprint: z.string().optional()
})

const loginSchema = z.object({
  identifier: z.string().min(1, 'Barowa ID oder E-Mail erforderlich'),
  password: z.string().min(1, 'Passwort erforderlich'),
  deviceFingerprint: z.string().optional()
})

export default async function authRoutes(fastify: FastifyInstance) {
  
  // Registrierung
  fastify.post('/register', {
    schema: {
      tags: ['auth'],
      summary: 'Neue digitale Identität erstellen',
      body: {
        type: 'object',
        required: ['password'],
        properties: {
          password: { type: 'string', minLength: 8 },
          email: { type: 'string', format: 'email' },
          deviceFingerprint: { type: 'string' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            barowaId: { type: 'string' },
            message: { type: 'string' },
            recoveryCodes: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        },
        400: {
          type: 'object', 
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const data = registrationSchema.parse(request.body)
      
      // Generiere neue Barowa ID
      const barowaId = generateBarowaId()
      
      // Hash das Passwort
      const passwordHash = await hashPassword(data.password)
      
      // TODO: Prisma Client verwenden um User zu erstellen
      // const user = await prisma.digitalIdentity.create({
      //   data: {
      //     barowaId,
      //     passwordHash,
      //     email: data.email,
      //     deviceFingerprintHash: data.deviceFingerprint ? await hashPassword(data.deviceFingerprint) : undefined
      //   }
      // })
      
      // Generiere Recovery Codes
      const recoveryCodes = Array.from({ length: 6 }, () => 
        `${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`
      )
      
      fastify.log.info(`Neue Identität erstellt: ${barowaId}`)
      
      return reply.status(201).send({
        barowaId,
        message: 'Digitale Identität erfolgreich erstellt',
        recoveryCodes
      })
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          error: 'Validation Error',
          message: error.errors[0].message
        })
      }
      throw error
    }
  })

  // Login
  fastify.post('/login', {
    schema: {
      tags: ['auth'],
      summary: 'Mit Barowa ID oder E-Mail anmelden',
      body: {
        type: 'object',
        required: ['identifier', 'password'],
        properties: {
          identifier: { type: 'string' },
          password: { type: 'string' },
          deviceFingerprint: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                barowaId: { type: 'string' },
                email: { type: 'string' }
              }
            }
          }
        },
        401: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const data = loginSchema.parse(request.body)
      
      // TODO: User aus DB laden
      // const user = await prisma.digitalIdentity.findFirst({
      //   where: {
      //     OR: [
      //       { barowaId: data.identifier },
      //       { email: data.identifier }
      //     ]
      //   }
      // })
      
      // TODO: Passwort verifizieren
      // const isValidPassword = await verifyPassword(data.password, user.passwordHash)
      
      // Simuliere erfolgreichen Login für MVP
      return {
        accessToken: 'jwt_access_token_hier',
        refreshToken: 'jwt_refresh_token_hier',
        user: {
          barowaId: data.identifier.includes('-') ? data.identifier : 'B7K9-M2X4',
          email: data.identifier.includes('@') ? data.identifier : undefined
        }
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          error: 'Validation Error',
          message: error.errors[0].message
        })
      }
      throw error
    }
  })

  // Token Refresh
  fastify.post('/refresh', {
    schema: {
      tags: ['auth'],
      summary: 'Access Token erneuern'
    }
  }, async (request, reply) => {
    // TODO: Refresh Token Logic
    return {
      accessToken: 'new_jwt_access_token_hier'
    }
  })

  // Logout
  fastify.post('/logout', {
    schema: {
      tags: ['auth'],
      summary: 'Abmelden'
    }
  }, async (request, reply) => {
    // TODO: Token invalidieren
    return { message: 'Erfolgreich abgemeldet' }
  })
}

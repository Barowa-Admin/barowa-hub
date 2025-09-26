import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

// Import routes
import authRoutes from './routes/auth'
import identityRoutes from './routes/identity'
import healthRoutes from './routes/health'

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV === 'development' ? {
      target: 'pino-pretty'
    } : undefined
  }
})

// Security & Performance Plugins
fastify.register(helmet, {
  contentSecurityPolicy: false // Wegen Swagger UI
})

fastify.register(cors, {
  origin: process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000'] 
    : [process.env.NEXTAUTH_URL || 'https://hub.barowa.com']
})

fastify.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
})

// API Documentation
fastify.register(swagger, {
  swagger: {
    info: {
      title: 'Barowa Hub API',
      description: 'API für digitale Identitäten und dezentrale Services',
      version: '0.1.0'
    },
    host: process.env.API_HOST || 'localhost:3001',
    schemes: [process.env.NODE_ENV === 'production' ? 'https' : 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'auth', description: 'Authentifizierung' },
      { name: 'identity', description: 'Identitätsverwaltung' },
      { name: 'health', description: 'System-Status' }
    ]
  }
})

fastify.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
})

// Routes registrieren
fastify.register(healthRoutes, { prefix: '/api/health' })
fastify.register(authRoutes, { prefix: '/api/auth' })
fastify.register(identityRoutes, { prefix: '/api/identity' })

// Error Handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error)
  
  // Zod Validation Errors
  if (error.validation) {
    return reply.status(400).send({
      error: 'Validation Error',
      message: 'Ungültige Eingabedaten',
      details: error.validation
    })
  }
  
  // Prisma Errors
  if (error.code === 'P2002') {
    return reply.status(409).send({
      error: 'Conflict',
      message: 'Ressource existiert bereits'
    })
  }
  
  // Generic Error
  reply.status(error.statusCode || 500).send({
    error: error.name || 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Ein unerwarteter Fehler ist aufgetreten'
  })
})

// Server starten
const start = async (): Promise<void> => {
  try {
    const port = parseInt(process.env.API_PORT || '3001')
    const host = process.env.API_HOST || 'localhost'
    
    await fastify.listen({ port, host })
    fastify.log.info(`🚀 Barowa Hub API läuft auf http://${host}:${port}`)
    fastify.log.info(`📚 API Docs verfügbar auf http://${host}:${port}/docs`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

// Graceful Shutdown
process.on('SIGINT', async () => {
  fastify.log.info('Shutting down Barowa Hub API...')
  await fastify.close()
  process.exit(0)
})

start()

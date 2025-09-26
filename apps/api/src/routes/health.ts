import { FastifyInstance } from 'fastify'

export default async function healthRoutes(fastify: FastifyInstance) {
  // Health Check
  fastify.get('/', {
    schema: {
      tags: ['health'],
      summary: 'Health Check',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' },
            version: { type: 'string' },
            services: {
              type: 'object',
              properties: {
                database: { type: 'string' },
                redis: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '0.1.0',
      services: {
        database: 'connected', // TODO: Tatsächliche DB-Prüfung
        redis: 'connected'     // TODO: Tatsächliche Redis-Prüfung
      }
    }
  })

  // Ready Check (für Kubernetes/Docker)
  fastify.get('/ready', {
    schema: {
      tags: ['health'],
      summary: 'Readiness Check'
    }
  }, async (request, reply) => {
    // TODO: Prüfe DB-Verbindung, Redis, etc.
    return { ready: true }
  })

  // Live Check (für Kubernetes/Docker)  
  fastify.get('/live', {
    schema: {
      tags: ['health'],
      summary: 'Liveness Check'
    }
  }, async (request, reply) => {
    return { alive: true }
  })
}

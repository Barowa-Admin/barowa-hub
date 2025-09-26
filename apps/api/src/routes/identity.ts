import { FastifyInstance } from 'fastify'

export default async function identityRoutes(fastify: FastifyInstance) {
  
  // Eigene Identität abrufen
  fastify.get('/me', {
    schema: {
      tags: ['identity'],
      summary: 'Eigene Identitätsdaten abrufen',
      headers: {
        type: 'object',
        properties: {
          authorization: { type: 'string' }
        },
        required: ['authorization']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            barowaId: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string' },
            lastLoginAt: { type: 'string' },
            publicProfile: {
              type: 'object',
              properties: {
                displayName: { type: 'string' },
                bio: { type: 'string' },
                isPubliclySearchable: { type: 'boolean' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    // TODO: JWT Token validieren und User-Daten aus DB laden
    return {
      barowaId: 'B7K9-M2X4',
      email: 'test@example.com',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      publicProfile: null
    }
  })

  // Identität aktualisieren
  fastify.put('/me', {
    schema: {
      tags: ['identity'],
      summary: 'Eigene Identitätsdaten aktualisieren',
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          publicProfile: {
            type: 'object',
            properties: {
              displayName: { type: 'string' },
              bio: { type: 'string' },
              isPubliclySearchable: { type: 'boolean' }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    // TODO: User-Daten aktualisieren
    return { message: 'Identität erfolgreich aktualisiert' }
  })

  // Öffentliche Identität suchen
  fastify.get('/search', {
    schema: {
      tags: ['identity'],
      summary: 'Öffentliche Identitäten suchen',
      querystring: {
        type: 'object',
        properties: {
          q: { type: 'string', minLength: 3 },
          limit: { type: 'number', minimum: 1, maximum: 50, default: 10 }
        },
        required: ['q']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            results: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  barowaId: { type: 'string' },
                  displayName: { type: 'string' },
                  bio: { type: 'string' }
                }
              }
            },
            total: { type: 'number' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { q, limit = 10 } = request.query as { q: string; limit?: number }
    
    // TODO: Öffentliche Profile durchsuchen
    return {
      results: [
        {
          barowaId: 'A1B2-C3D4',
          displayName: 'Max Mustermann',
          bio: 'Developer aus Berlin'
        }
      ],
      total: 1
    }
  })

  // Server zu Identität hinzufügen
  fastify.post('/servers', {
    schema: {
      tags: ['identity'],
      summary: 'Server zu Identität hinzufügen',
      body: {
        type: 'object',
        required: ['serverType', 'serverUrl'],
        properties: {
          serverType: { 
            type: 'string', 
            enum: ['HETZNER', 'HOME', 'OTHER'] 
          },
          serverUrl: { type: 'string', format: 'uri' },
          isPrimary: { type: 'boolean', default: false }
        }
      }
    }
  }, async (request, reply) => {
    // TODO: Server-Zuordnung erstellen
    return { 
      message: 'Server erfolgreich hinzugefügt',
      serverId: 'server_id_hier'
    }
  })

  // Recovery-Codes generieren
  fastify.post('/recovery-codes', {
    schema: {
      tags: ['identity'],
      summary: 'Neue Recovery-Codes generieren',
      response: {
        200: {
          type: 'object',
          properties: {
            codes: {
              type: 'array',
              items: { type: 'string' }
            },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    // Generiere neue Recovery Codes
    const codes = Array.from({ length: 8 }, () => 
      `${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`
    )
    
    // TODO: Alte Codes invalidieren, neue in DB speichern
    
    return {
      codes,
      message: 'Neue Recovery-Codes generiert. Alte Codes sind ungültig.'
    }
  })
}

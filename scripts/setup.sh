#!/bin/bash

# Barowa Hub Setup Script
echo "🏠 Setting up Barowa Hub Development Environment..."

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js ist nicht installiert. Bitte installiere Node.js 18+"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "❌ Docker ist nicht installiert. Bitte installiere Docker"; exit 1; }

echo "✅ Node.js und Docker gefunden"

# Install dependencies
echo "📦 Installiere Dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    echo "📝 Erstelle .env Datei..."
    cp env.example .env
    echo "⚠️  Bitte .env Datei anpassen falls nötig"
fi

# Start database
echo "🗄️  Starte Datenbank..."
docker-compose up -d postgres redis

# Wait for database
echo "⏳ Warte auf Datenbank..."
sleep 5

# Run database migrations
echo "🔄 Führe Datenbank-Migrationen aus..."
cd apps/api && npx prisma migrate dev --name init && cd ../..

# Generate Prisma client
echo "🔧 Generiere Prisma Client..."
cd apps/api && npx prisma generate && cd ../..

echo ""
echo "🎉 Setup erfolgreich abgeschlossen!"
echo ""
echo "Nächste Schritte:"
echo "  npm run dev     # Startet Web + API"
echo "  npm run db:studio # Öffnet Prisma Studio"
echo ""
echo "URLs:"
echo "  Web:     http://localhost:3000"
echo "  API:     http://localhost:3001"
echo "  Docs:    http://localhost:3001/docs"
echo "  Mail:    http://localhost:1080 (Development)"
echo ""

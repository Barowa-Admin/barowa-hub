#!/bin/bash

# Barowa Hub Deployment Script
set -e

echo "🚀 Starting Barowa Hub Deployment..."

# Configuration
REPO_URL="https://github.com/barowa/barowa-hub.git"
APP_DIR="/opt/barowa-hub"
BACKUP_DIR="/opt/backups"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root"
fi

# Check required commands
for cmd in git docker docker-compose; do
    if ! command -v $cmd &> /dev/null; then
        error "$cmd is required but not installed"
    fi
done

# Create directories
log "Creating application directories..."
sudo mkdir -p $APP_DIR $BACKUP_DIR
sudo chown $USER:$USER $APP_DIR $BACKUP_DIR

# Clone or update repository
if [ -d "$APP_DIR/.git" ]; then
    log "Updating existing repository..."
    cd $APP_DIR
    git fetch origin
    git reset --hard origin/main
else
    log "Cloning repository..."
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    warn ".env file not found. Creating from template..."
    cp env.example .env
    echo "Please edit .env file with your configuration:"
    echo "nano .env"
    read -p "Press enter when done..."
fi

# Build Docker images
log "Building Docker images..."
docker-compose -f docker-compose.prod.yml build

# Run database migrations
log "Running database migrations..."
docker-compose -f docker-compose.prod.yml run --rm api npx prisma migrate deploy

# Start services
log "Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
log "Waiting for services to be ready..."
sleep 30

# Health check
log "Performing health check..."
if curl -f http://localhost/health > /dev/null 2>&1; then
    log "✅ Deployment successful! Barowa Hub is running."
    log "🌐 Access your app at: https://hub.barowa.com"
    log "📚 API Docs: https://hub.barowa.com/api/docs"
else
    error "❌ Health check failed. Check logs with: docker-compose -f docker-compose.prod.yml logs"
fi

# Show running containers
log "Running containers:"
docker-compose -f docker-compose.prod.yml ps

log "🎉 Deployment completed successfully!"

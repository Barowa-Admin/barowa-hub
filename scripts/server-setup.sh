#!/bin/bash

# Hetzner Server Setup Script for Barowa Hub
set -e

echo "🏗️  Setting up Hetzner Server for Barowa Hub..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

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
if [[ $EUID -ne 0 ]]; then
   error "This script must be run as root"
fi

# Update system
log "Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
log "Installing essential packages..."
apt install -y \
    curl \
    wget \
    git \
    nano \
    htop \
    ufw \
    fail2ban \
    certbot \
    python3-certbot-nginx \
    unzip

# Install Docker
log "Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker ubuntu

# Install Docker Compose
log "Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Setup firewall
log "Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Configure fail2ban
log "Configuring fail2ban..."
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
EOF

systemctl enable fail2ban
systemctl start fail2ban

# Create application user
log "Creating barowa user..."
useradd -m -s /bin/bash barowa
usermod -aG docker barowa

# Setup SSH key for barowa user (if provided)
if [ -n "$SSH_PUBLIC_KEY" ]; then
    log "Setting up SSH key for barowa user..."
    mkdir -p /home/barowa/.ssh
    echo "$SSH_PUBLIC_KEY" > /home/barowa/.ssh/authorized_keys
    chmod 700 /home/barowa/.ssh
    chmod 600 /home/barowa/.ssh/authorized_keys
    chown -R barowa:barowa /home/barowa/.ssh
fi

# Setup automatic security updates
log "Configuring automatic security updates..."
apt install -y unattended-upgrades
cat > /etc/apt/apt.conf.d/50unattended-upgrades << EOF
Unattended-Upgrade::Allowed-Origins {
    "\${distro_id}:\${distro_codename}-security";
    "\${distro_id}ESMApps:\${distro_codename}-apps-security";
    "\${distro_id}ESM:\${distro_codename}-infra-security";
};
Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
EOF

# Create swap file (for small servers)
log "Creating swap file..."
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

# Setup log rotation
log "Configuring log rotation..."
cat > /etc/logrotate.d/barowa-hub << EOF
/opt/barowa-hub/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 644 barowa barowa
}
EOF

# Setup monitoring (basic)
log "Setting up basic monitoring..."
cat > /etc/cron.d/server-monitoring << EOF
# Check disk space every hour
0 * * * * root df -h | awk 'NF==6{print}' | awk '$5>80{print "ALERT: " $6 " is " $5 " full"}' | mail -s "Disk Space Alert" admin@barowa.com 2>/dev/null || true

# Check memory usage
*/15 * * * * root free | awk 'NR==2{printf "Memory Usage: %.2f%%\n", $3/$2*100}' >> /var/log/memory-usage.log
EOF

# Create SSL certificate directory
log "Creating SSL certificate directory..."
mkdir -p /opt/barowa-hub/ssl
chown barowa:barowa /opt/barowa-hub/ssl

log "✅ Server setup completed!"
log ""
log "Next steps:"
log "1. Login as barowa user: su - barowa"
log "2. Clone the repository"
log "3. Configure .env file"
log "4. Run deployment script"
log "5. Setup SSL certificate: certbot --nginx -d hub.barowa.com"
log ""
log "🔐 Security notes:"
log "- SSH is protected by fail2ban"
log "- Firewall is enabled (ports 22, 80, 443 open)"
log "- Automatic security updates are enabled"
log "- 2GB swap file created"
log ""
log "🎉 Server is ready for Barowa Hub deployment!"

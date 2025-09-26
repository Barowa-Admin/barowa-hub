# Barowa Hub

> Deine digitale Grundausstattung - Identität, Domains, Server

## 🎯 Vision

Barowa Hub ist der erste Baustein für ein dezentrales, offenes Ökosystem. Hier startest du mit deiner digitalen Identität und baust dir deine eigene Infrastruktur auf - ohne Abhängigkeiten, ohne Datenkraken.

## ✨ Features

- **🆔 Digitale Identität** - Einzigartige Barowa ID (z.B. B7K9-M2X4)
- **🌐 Domain Management** - Domains kaufen und verwalten
- **🖥️ Server Setup** - One-Click Server bei Hetzner
- **📧 E-Mail Setup** - Professionelle E-Mail-Adressen
- **🔒 Privacy First** - Minimale Datensammlung, maximale Kontrolle

## 🚀 Quick Start

```bash
# Repository klonen
git clone https://github.com/barowa/barowa-hub.git
cd barowa-hub

# Setup (installiert alles und startet Datenbank)
npm run setup

# Development starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) für die Web-App.

## 📁 Projekt-Struktur

```
barowa-hub/
├── apps/
│   ├── web/          # hub.barowa.com (Next.js)
│   └── api/          # Backend API (Fastify)
├── packages/
│   ├── ui/           # Shared UI Components
│   ├── auth/         # Authentifizierungs-System
│   ├── knipp/        # Knipp.de Domain Integration
│   └── hetzner/      # Hetzner Cloud Integration
├── docs/             # Dokumentation
└── scripts/          # Build & Deploy Scripts
```

## 🛠️ Tech Stack

- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **Backend:** Fastify + PostgreSQL + Prisma
- **Auth:** Custom Identity System
- **Deployment:** Docker + GitHub Actions
- **Hosting:** Hetzner Cloud

## 🤝 Contributing

Barowa ist ein offenes Projekt. Jeder kann beitragen!

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Öffne einen Pull Request

## 📖 Dokumentation

- [API Dokumentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guide](./docs/contributing.md)

## 🌍 Die größere Vision

Barowa Hub ist nur der Anfang:

- **Barowa Cloud** - Deine persönliche Cloud zu Hause
- **Barowa OS** - Offenes Operating System für alle Geräte
- **Barowa Federation** - Dezentrales Netzwerk von Services

## 📄 Lizenz

MIT License - siehe [LICENSE](./LICENSE) für Details.

---

**Gebaut mit ❤️ für eine dezentrale Zukunft**
# Test Deployment

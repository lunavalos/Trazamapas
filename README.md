# TrazaMapas

Proyecto web de TrazaMapas compuesto por una arquitectura desacoplada de Frontend (Next.js) y Backend (Payload CMS 3 sobre PostgreSQL).

---

## 🏗️ Arquitectura del Proyecto

```
Trazamapas/
├── backend/    # Payload CMS 3 (Next.js 16 + React 19 + PostgreSQL) en puerto 3001
└── frontend/   # Sitio web público (Next.js 16 + React 19 + Tailwind CSS) en puerto 3000
```

### Tecnologías Principales
- **Backend**: [Payload CMS 3.88](https://payloadcms.com), Next.js 16 (App Router), PostgreSQL (`@payloadcms/db-postgres`), Lexical RichText, Sharp.
- **Frontend**: Next.js 16 (App Router con Turbopack), React 19, Tailwind CSS v4, Framer Motion, Lucide React.
- **Base de Datos**: PostgreSQL 17 (base de datos `trazamapas`).

---

## ⚙️ Configuración y Variables de Entorno

### Backend (`backend/.env`)
```env
DATABASE_URI=postgresql://postgres:postgres@127.0.0.1:5432/trazamapas
PAYLOAD_SECRET=trazamapas-payload-secret-key-2026-secure
PORT=3001
```

### Frontend (`frontend/.env`)
```env
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
PORT=3000
```

---

## 🚀 Cómo Correr el Proyecto Localmente

### 1. Requisitos previos
- **Node.js** v20 o superior (v26 detectado en el entorno)
- **PostgreSQL** en ejecución localmente (puerto 5432) con la base de datos `trazamapas` y usuario `postgres` (o las credenciales especificadas en `backend/.env`).

### 2. Iniciar el Backend (Payload CMS)
Desde la raíz del proyecto:
```bash
npm run dev:backend
```
O ingresando al directorio:
```bash
cd backend
npm run dev
```
- **Panel de Administración CMS**: [http://localhost:3001/admin](http://localhost:3001/admin)
- **API REST**: [http://localhost:3001/api](http://localhost:3001/api)

### 3. Iniciar el Frontend (Web pública)
En otra pestaña de la terminal, desde la raíz del proyecto:
```bash
npm run dev:frontend
```
O ingresando al directorio:
```bash
cd frontend
npm run dev
```
- **Sitio Web**: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev:backend` | Inicia el servidor de desarrollo del backend en el puerto 3001 |
| `npm run dev:frontend` | Inicia el servidor de desarrollo del frontend en el puerto 3000 |
| `npm run build:backend` | Compila el backend para producción |
| `npm run build:frontend` | Compila el frontend para producción |

# Balto Web

Aplicacion web de Balto construida con Next.js. Contiene la landing publica
para descarga del APK y el punto de partida del backoffice administrativo
privado.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios
- TanStack Query
- React Hook Form + Zod
- Lucide React

## Estructura

```txt
src/
  app/
    (marketing)/       # landing publica
    (dashboard)/       # backoffice administrativo privado
    globals.css
    layout.tsx
    providers.tsx
  features/
    auth/
    dashboard/
    marketing/
    users/
  infrastructure/
    http/
  shared/
    utils/
public/
  downloads/
    version.json
```

## Variables locales

Copia el ejemplo y ajusta los valores:

```bash
cp .env.example .env.local
```

```env
BACKEND_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APK_URL=/downloads/balto.apk
NEXT_PUBLIC_APP_VERSION=1.0.0
```

Si vas a probar contra el backend desplegado, cambia `BACKEND_API_URL`:

```env
BACKEND_API_URL=https://tu-backend/api
```

## Correr localmente

El repo usa `pnpm` mediante Corepack.

```bash
corepack enable
corepack prepare pnpm@10.34.1 --activate
pnpm install
pnpm dev
```

Abre:

```txt
http://localhost:3000
```

## Validacion local

Antes de abrir un pull request o desplegar:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Descarga del APK

Para probar la landing con descarga local, copia el APK generado por Flutter en:

```txt
public/downloads/balto.apk
```

La metadata publica de descarga vive en:

```txt
public/downloads/version.json
```

Si el APK se aloja en otro lugar, cambia:

```env
NEXT_PUBLIC_APK_URL=https://url-publica/balto.apk
```

## Integracion con backend

El backend debe exponer una URL publica o local terminada en `/api`.
El servidor de Next lee esa URL desde `BACKEND_API_URL`.

Para que login y dashboard funcionen en navegador, el backend tambien debe
permitir CORS desde el origen local:

```txt
http://localhost:3000
```

Y, en despliegue, desde el dominio real de la web.

La landing no enlaza al dashboard. El backoffice vive en `/dashboard` y debe
protegerse con login antes de usarse con datos reales.

## Backoffice privado

El navegador no llama directamente al backend para operaciones administrativas.
Usa rutas BFF de Next:

```txt
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/admin/users
GET  /api/admin/verification/businesses
PATCH /api/admin/verification/businesses/:businessId/status
GET  /api/admin/verification/walkers
PATCH /api/admin/verification/walkers/:walkerId/status
```

Estas rutas guardan `accessToken` y `refreshToken` en cookies `httpOnly` e
inyectan `Authorization: Bearer <token>` cuando consumen el backend.

El middleware protege:

```txt
/dashboard
```

Si no hay sesion, redirige a:

```txt
/login
```

El dashboard actual consume usuarios reales desde `/api/users` del backend,
calcula metricas iniciales y permite revisar veterinarias/walkers con sus
documentos para actualizar `verification_status`.

## CI/CD

El repositorio incluye GitHub Actions en `.github/workflows/ci.yml`.

El workflow corre en pull requests y pushes a `main`, `staging`, `dev` y
`feature/**`:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
```

## Despliegue en Vercel

Conecta solamente este repo (`balto-web`) en Vercel:

```txt
Framework Preset: Next.js
Install Command: pnpm install --frozen-lockfile
Build Command: pnpm build
Output Directory: automatico
Node.js Version: 20.x
```

La configuracion base vive en `vercel.json`.

Configura en Vercel las mismas variables de `.env.example` con valores reales:

```env
BACKEND_API_URL=https://tu-backend/api
NEXT_PUBLIC_APK_URL=/downloads/balto.apk
NEXT_PUBLIC_APP_VERSION=1.0.0
```

Para produccion, evita subir APKs o llaves al repositorio. Publica el APK en un
storage, release asset o CDN publico y apunta `NEXT_PUBLIC_APK_URL` a esa URL.

Recomendacion de ramas en Vercel:

```txt
Production Branch: main
Preview Deployments: pull requests
```

Antes de usar `main` como produccion, mergea la rama que contiene el dashboard
actual (`feature/dashboard-foundation`) hacia `main`.

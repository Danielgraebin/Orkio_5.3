# Orkio v5.3 (Clean Deploy Starter)

Este repositório é uma **base limpa e confiável de deploy** (monorepo) para você publicar **Backend + Frontend** sem dor.
- **Backend**: Node.js + Fastify (API JSON, CORS, health, logs)
- **Frontend**: Vite + React (SPA) + página inicial + chamada ao backend
- **Dockerfiles**: um por serviço (compatível com Railway/Render)
- **Local**: `docker compose up --build`

> Objetivo: ter um **pipeline de deploy previsível**. Depois vocês vão trazendo módulos do Orkio V5.2 para dentro.

---

## Estrutura

- `server/` → API (porta 8080)
- `client/` → Web (Nginx na porta 80, build via Vite)

---

## Rodar local (recomendado)

### 1) Variáveis
Crie `server/.env` (exemplo):

```env
PORT=8080
CORS_ORIGIN=http://localhost:5173
```

Crie `client/.env` (exemplo):

```env
VITE_API_BASE_URL=http://localhost:8080
```

### 2) Subir com Docker Compose
```bash
docker compose up --build
```

- Front: http://localhost:8081
- API: http://localhost:8080/health

---

## Deploy no Railway (passo a passo rápido)

### A) Backend (service: orkio-api)
1. Railway → New Project → Deploy from GitHub Repo
2. Selecione o repo
3. Settings do serviço:
   - **Root Directory:** `server`
   - **Builder:** Dockerfile
4. Variables:
   - `PORT=8080`
   - `CORS_ORIGIN=https://SEU-FRONT.railway.app`
5. Deploy → pegue a URL do serviço (ex.: `https://orkio-api.up.railway.app`)

Teste:
- `GET /health` deve retornar JSON.

### B) Frontend (service: orkio-web)
1. Railway → New Service → Deploy from GitHub Repo (mesmo repo)
2. Settings do serviço:
   - **Root Directory:** `client`
   - **Builder:** Dockerfile
3. Variables:
   - `VITE_API_BASE_URL=https://URL-DO-BACKEND`
4. Deploy e abra a URL do front.

---

## Próximo passo: migrar Orkio V5.2 → V5.3
A ideia é ir copiando por blocos:
1) Rotas/routers do backend (tRPC ou REST)  
2) Libs compartilhadas  
3) UI do client (páginas e componentes)

Sem quebrar o deploy.

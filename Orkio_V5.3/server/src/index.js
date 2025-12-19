import Fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";

const app = Fastify({ logger: true });

const PORT = Number(process.env.PORT || 8080);
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

await app.register(cors, {
  origin: (origin, cb) => {
    // permite requests sem origin (curl / server-to-server)
    if (!origin) return cb(null, true);
    if (CORS_ORIGIN === "*") return cb(null, true);

    const allowed = CORS_ORIGIN.split(",").map(s => s.trim()).filter(Boolean);
    return cb(null, allowed.includes(origin));
  },
  credentials: true,
});

app.get("/health", async () => ({
  ok: true,
  service: "orkio-api",
  version: "5.3.0",
  ts: new Date().toISOString(),
}));

app.get("/api/info", async () => ({
  product: "Orkio",
  tagline: "Uma IA executiva que coordena o seu negócio.",
  capabilities: ["Agents", "Connectors", "Governance", "Audit Trail"],
}));

// exemplo de endpoint para testar integração do front
app.post("/api/echo", async (req) => ({
  received: req.body ?? null,
}));

app.listen({ port: PORT, host: "0.0.0.0" });

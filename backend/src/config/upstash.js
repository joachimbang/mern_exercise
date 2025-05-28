// 📦 Import des packages nécessaires
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// 🔐 Chargement des variables d'environnement depuis .env
dotenv.config();

// ✅ Création d'un client Redis à partir des variables d'environnement UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN
const redis = Redis.fromEnv();

// 🕒 Création d'un rate limiter avec la stratégie de "sliding window"
// Ici, 100 requêtes sont autorisées toutes les 60 secondes
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10s"),
  analytics: true, // (optionnel) permet d’avoir des stats sur Upstash
});

// 🚀 Export du rate limiter pour l’utiliser dans les middlewares
export default ratelimit;

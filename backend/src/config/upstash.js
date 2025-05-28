// 📦 Import des packages nécessaires
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// 🔐 Chargement des variables d'environnement depuis .env
dotenv.config();

// 🕒 Création d'un rate limiter avec la stratégie de "sliding window"
// Ici, 100 requêtes sont autorisées toutes les 60 secondes
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

// 🚀 Export du rate limiter pour l’utiliser dans les middlewares
export default ratelimit;

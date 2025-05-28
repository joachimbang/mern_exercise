// 🔒 On importe le module de rate limiting depuis Upstash
// import ratelimit from "../config/upstash.js";
import ratelimit from "../upstash.js";

// Middleware Express pour limiter le nombre de requêtes
const rateLimiter = async (req, res, next) => {
    try {
        // On applique une limite de requêtes à l'identifiant "my-limit-key"
        // Cela retourne un objet avec { success: true/false }
        const { success } = await ratelimit.limit("my-limit-key");

        // Si la limite est dépassée, on bloque la requête
        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try later",
            });
        }

        // Sinon, on laisse passer la requête au middleware suivant
        next();
    } catch (error) {
        //  Si une erreur se produit avec le service Upstash
        console.log("Rate limit error", error);

        // On passe l'erreur à Express pour gestion (middleware d'erreur)
        next(error);
    }
};

export default rateLimiter;
import crypto from "crypto";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || generateSecretKey();
const TOKEN_EXPIRATION = "24h";

// Génère une clé secrète aléatoire si aucune n'est fournie
function generateSecretKey(): string {
  console.warn(
    "Aucune clé JWT_SECRET définie dans les variables d'environnement. Une clé aléatoire a été générée. Cette clé changera à chaque redémarrage du serveur."
  );
  return crypto.randomBytes(64).toString("hex");
}

interface TokenPayload {
  userId: number;
  roleId: number;
  email: string;
  [key: string]: any; // Permet d'ajouter d'autres propriétés
}

const jwtService = {
  /**
   * Génère un token JWT
   * @param payload - Les données à inclure dans le token
   * @returns Le token JWT généré
   */
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRATION,
      issuer: "api.hometracker",
      audience: "hometracker.app",
    });
  },

  /**
   * Vérifie un token JWT
   * @param token - Le token à vérifier
   * @returns Le payload décodé si valide
   * @throws Error si le token est invalide
   */
  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, SECRET_KEY, {
        issuer: "api.hometracker",
        audience: "hometracker.app",
      }) as TokenPayload;
    } catch (error) {
      throw new Error("Token invalide ou expiré");
    }
  },

  /**
   * Renouvelle un token JWT
   * @param token - Le token à renouveler
   * @returns Un nouveau token JWT avec les mêmes données
   * @throws Error si le token est invalide
   */
  refreshToken(token: string): string {
    const payload = this.verifyToken(token);
    delete payload.exp; // Supprimer l'expiration du payload
    delete payload.iat; // Supprimer la date de création du payload
    return this.generateToken(payload);
  },
};

export default jwtService;

import * as crypto from "crypto";

/**
 * Service pour gérer les mots de passe de manière sécurisée
 */
export default {
  /**
   * Hacher un mot de passe de manière sécurisée avec PBKDF2
   * Plus sécurisé que SHA-256, car utilise un sel aléatoire et plusieurs itérations
   * @param password Le mot de passe en clair
   * @returns Le mot de passe haché et le sel, formatés pour stockage
   */
  async hashPassword(password: string): Promise<string> {
    // Générer un sel aléatoire
    const salt = crypto.randomBytes(16).toString("hex");

    // Nombre d'itérations - plus élevé = plus sécurisé mais plus lent
    const iterations = 10000;

    // Longueur de la clé de sortie en octets
    const keyLength = 64;

    // Fonction de hachage utilisée
    const digest = "sha512";

    // Hacher le mot de passe avec PBKDF2 (Password-Based Key Derivation Function 2)
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        iterations,
        keyLength,
        digest,
        (err, derivedKey) => {
          if (err) {
            reject(err);
            return;
          }

          // Format: iterations:salt:hash
          const hash = derivedKey.toString("hex");
          resolve(`${iterations}:${salt}:${hash}`);
        }
      );
    });
  },

  /**
   * Vérifier si un mot de passe correspond au hachage stocké
   * @param password Le mot de passe en clair
   * @param storedHash Le hachage stocké au format iterations:salt:hash
   * @returns true si le mot de passe correspond, false sinon
   */
  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    // Si c'est l'ancien format SHA-256 (compatibilité)
    if (!storedHash.includes(":")) {
      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      return storedHash.trim() === hashedPassword;
    }

    // Sinon, c'est le nouveau format PBKDF2
    try {
      // Décomposer le hachage stocké
      const [iterations, salt, hash] = storedHash.split(":");

      // Convertir les itérations en nombre
      const iterationsNum = parseInt(iterations, 10);

      // Longueur de la clé en octets
      const keyLength = 64;

      // Fonction de hachage
      const digest = "sha512";

      // Vérifier le mot de passe avec les mêmes paramètres
      return new Promise((resolve, reject) => {
        crypto.pbkdf2(
          password,
          salt,
          iterationsNum,
          keyLength,
          digest,
          (err, derivedKey) => {
            if (err) {
              reject(err);
              return;
            }

            const newHash = derivedKey.toString("hex");
            resolve(newHash === hash);
          }
        );
      });
    } catch (error) {
      console.error("Erreur lors de la vérification du mot de passe:", error);
      return false;
    }
  },
};

# Sécurité de l'application HomeTracker

Ce document détaille les mesures de sécurité implémentées dans l'application HomeTracker pour protéger les données des utilisateurs et assurer l'intégrité du système.

## Mesures de sécurité implémentées

### 1. Protection contre les injections XSS (Cross-Site Scripting)

- **Helmet** : Middleware qui configure les en-têtes HTTP pour protéger contre diverses attaques, notamment XSS.
- **Validation et nettoyage des entrées** : Toutes les entrées utilisateur sont validées et nettoyées pour supprimer les balises HTML et les scripts malveillants.
- **Content Security Policy (CSP)** : Configuré via Helmet pour restreindre les sources de contenu exécuté dans l'application.

### 2. Protection contre les injections SQL

- **Prisma ORM** : Utilisation de requêtes paramétrées qui empêchent les injections SQL.
- **Validation des entrées** : Toutes les entrées sont validées avant d'être transmises à la base de données.

### 3. Hachage sécurisé des mots de passe

- **PBKDF2** : Algorithme robuste avec sel unique et nombreuses itérations pour le hachage des mots de passe.
- **Compatibilité rétroactive** : Support des anciens hachages SHA-256 pour assurer la compatibilité avec les comptes existants.

### 4. Authentification par token JWT

- **JSON Web Tokens (JWT)** : Mise en œuvre sécurisée pour l'authentification.
- **Cycle de vie des tokens** : Expiration automatique des tokens après 24 heures.
- **Vérification stricte** : Validation de l'émetteur et de l'audience pour chaque token.

### 5. Protection CSRF (Cross-Site Request Forgery)

- **Tokens CSRF** : Génération et validation de tokens pour toutes les requêtes sensibles.
- **Cookie sécurisé** : Stockage du token dans un cookie sécurisé avec les attributs appropriés (httpOnly, SameSite).
- **Double soumission de token** : Vérification du token à la fois dans le cookie et dans l'en-tête de la requête.

### 6. En-têtes HTTP sécurisés

- **X-Content-Type-Options** : Prévient le MIME-type sniffing.
- **X-Frame-Options** : Protège contre le clickjacking.
- **X-XSS-Protection** : Couche supplémentaire de protection XSS pour les navigateurs plus anciens.
- **Strict-Transport-Security** : Force les connexions HTTPS.

## Bonnes pratiques implémentées

### 1. Validation et sanitisation des entrées

- Toutes les entrées utilisateur sont validées et nettoyées.
- Limites de longueur pour prévenir les attaques par déni de service.
- Suppression des balises HTML dangereuses.

### 2. Gestion des erreurs

- Messages d'erreur génériques pour les utilisateurs.
- Journalisation détaillée côté serveur pour le débogage.
- Pas de divulgation d'informations sensibles dans les réponses d'erreur.

### 3. Stockage sécurisé des données

- Mots de passe hachés avec PBKDF2.
- Sensibilité aux majuscules/minuscules dans les comparaisons de sécurité.
- Nettoyage des données sensibles avant leur stockage.

### 4. Sécurité des communications

- CORS configuré pour limiter les domaines autorisés.
- Support de HTTPS en production.
- Validation stricte des en-têtes d'authentification.

## Recommandations pour le déploiement en production

1. **Activer HTTPS** : Obtenir un certificat SSL et rediriger tout le trafic HTTP vers HTTPS.
2. **Variables d'environnement** : Stocker les clés secrètes (JWT_SECRET, etc.) dans des variables d'environnement.
3. **Surveillance** : Mettre en place un système de surveillance pour détecter les tentatives d'intrusion.
4. **Mises à jour** : Maintenir à jour tous les packages et dépendances.
5. **Sauvegardes** : Établir une routine de sauvegarde régulière de la base de données.

## Audit de sécurité

Il est recommandé de réaliser un audit de sécurité complet par un expert en sécurité avant le déploiement en production, puis à intervalles réguliers (annuellement ou après des modifications majeures).

## Ressources additionnelles

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)

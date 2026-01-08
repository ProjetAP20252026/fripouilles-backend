# Backend - RAM Les Fripouilles

API Backend pour le Relais d'Assistantes Maternelles "Les Fripouilles" - Projet BTS SIO 2025-2026

## 📋 Description

Ce projet est une API REST développée avec NestJS et Prisma pour gérer l'ensemble des services du RAM Les Fripouilles :

- Inscription et gestion des utilisateurs (Parents, Assistantes Maternelles, Admin)
- Gestion des enfants et liens parent-enfant
- Personnes autorisées à récupérer les enfants
- Contrats de garde et rémunération des assistantes maternelles
- Ateliers d'éveil
- Service de crèche (accueil régulier et occasionnel)
- Suivi journalier des enfants

## 🚀 Technologies utilisées

- **NestJS** - Framework Node.js
- **Prisma** - ORM pour PostgreSQL
- **PostgreSQL** - Base de données
- **JWT** - Authentification
- **Swagger** - Documentation API
- **TypeScript** - Langage de développement

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/fripouilles"
JWT_SECRET="votre_secret_jwt_très_sécurisé"
APP_PORT=3000
```

## 🗄️ Base de données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev

# Ouvrir Prisma Studio
npx prisma studio
```

## 🏃 Démarrage

```bash
# Mode développement
npm run start:dev

# Mode production
npm run start:prod
```

L'API sera accessible sur `http://localhost:3000/api`
La documentation Swagger sur `http://localhost:3000/api/doc`

## 📚 Structure du projet

```
src/
├── auth/               # Authentification JWT + Guards
├── assistante/         # Module Assistantes Maternelles
├── parent/            # Module Parents
├── enfant/            # Module Enfants
├── lien-parent-enfant/ # Module Liens Parent-Enfant
├── personne-autorisee/ # Module Personnes Autorisées
├── decorators/        # Décorateurs personnalisés (User, Roles)
├── common/            # Pipes et utilitaires communs
├── prisma/            # Service Prisma
└── swagger/           # Configuration Swagger
```

## 🔐 Authentification

L'API utilise JWT pour l'authentification. Trois rôles sont disponibles :

- `ADMIN` - Accès complet
- `PARENT` - Gestion de ses enfants et inscriptions
- `ASSISTANTE_MATERNELLE` - Suivi des enfants gardés

### Endpoints d'authentification

```
POST /api/auth/register/parent      # Inscription parent
POST /api/auth/register/assistante  # Inscription assistante
POST /api/auth/login                # Connexion
```

## 📖 Modules implémentés

### ✅ Modules complétés

1. **Authentification** (`/api/auth`)
   - Inscription (parents et assistantes)
   - Connexion avec JWT
   - Guards : JwtAuthGuard, RolesGuard, NotAssistanteGuard

2. **Parents** (`/api/parent`)
   - GET `/` - Profil du parent connecté
   - GET `/tous` - Liste tous les parents (Admin)
   - PUT `/` - Mise à jour du profil

3. **Assistantes** (`/api/assistante`)
   - GET `/` - Profil de l'assistante connectée
   - GET `/toutes` - Liste toutes les assistantes
   - PUT `/` - Mise à jour du profil

4. **Enfants** (`/api/enfant`)
   - POST `/` - Créer un enfant (interdit aux assistantes)
   - GET `/` - Liste des enfants (avec filtre parentId optionnel)
   - GET `/mes-enfants` - Enfants du parent connecté
   - GET `/:id` - Détails d'un enfant
   - PUT `/:id` - Modifier un enfant
   - DELETE `/:id` - Supprimer un enfant

5. **Liens Parent-Enfant** (`/api/lien-parent-enfant`)
   - POST `/lien` - Créer un lien (interdit aux assistantes)
   - GET `/lien` - Liste des liens (avec filtres)
   - GET `/lien/:id` - Détails d'un lien
   - PUT `/lien/:id` - Modifier un lien
   - DELETE `/lien/:id` - Supprimer un lien

6. **Personnes Autorisées** (`/api/personne-autorisee`)
   - CRUD complet pour les personnes autorisées à récupérer les enfants

### 🔜 Modules à implémenter

Les schémas de base de données sont prêts, il reste à créer les controllers/services :

- **Contrats de garde** (`ContratGarde`, `SuiviGardeAssistante`)
- **Paie** (`Paie`)
- **Ateliers** (`Atelier`, `InscriptionAtelier`)
- **Crèche** (`InscriptionCreche`, `ReservationCreche`, `CrechePlanning`)
- **Suivi journalier** (`SuiviJournalierEnfant`)

## 🛡️ Sécurité

- Validation automatique des DTOs avec `class-validator`
- Guards personnalisés pour contrôler l'accès par rôle
- Mots de passe hashés avec bcrypt
- Tokens JWT avec expiration

## 🔧 Améliorations récentes

✅ Utilisation de `ParseIntPipe` et `ParseOptionalIntPipe` pour valider les paramètres  
✅ Décorateur `@User` pour récupérer l'utilisateur connecté  
✅ Décorateur `@Roles` pour contrôler l'accès par rôle  
✅ Guards réutilisables (`RolesGuard`, `NotAssistanteGuard`)  
✅ Endpoints contextuels (ex: `/mes-enfants` pour les parents)  
✅ Documentation Swagger complète avec ApiTags

## 📝 TODO

- [ ] Implémenter les modules manquants (Ateliers, Crèche, Paie, etc.)
- [ ] Ajouter des tests unitaires et e2e
- [ ] Implémenter la pagination pour les listes
- [ ] Ajouter un système de notification
- [ ] Créer des rapports et statistiques

## 👥 Équipe

Projet BTS SIO 2025-2026 - Atelier de Professionnalisation

---

Pour plus d'informations, consultez le [contexte du projet](./contexte.md)

$ npm run test

# e2e tests

$ npm run test:e2e

# test coverage

$ npm run test:cov

````

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
````

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

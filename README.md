# Passeport Maison

Application mobile-first permettant aux propriétaires de **documenter, valoriser et partager** leur bien immobilier.

## Vision

Passeport Maison est un passeport numérique immobilier : un inventaire certifié des équipements, matériaux et rénovations d'un logement, avec plan 2D/3D interactif, fiche technique partageable et marketplace d'équipements d'occasion.

## Stack technique

| Rôle | Technologie |
|---|---|
| Framework | SvelteKit 2.5 + Svelte 5 |
| Base de données | PostgreSQL + Prisma ORM |
| Authentification | Magic link (Resend) + JWT httpOnly |
| Intelligence artificielle | Anthropic SDK (Vision) |
| Éditeur de plan | open3dFloorplan (Three.js) |
| Temps réel | Server-Sent Events (SSE) |

## Démarrage rapide

```bash
npm install
cp .env.example .env   # renseigner les variables
npm run dev
```

Variables d'environnement requises :

```
DATABASE_URL=
JWT_SECRET=
RESEND_API_KEY=
ANTHROPIC_API_KEY=
```

## Documentation

| Fichier | Contenu |
|---|---|
| `DOC/wireframes.html` | 32 écrans lo-fi interactifs (périmètre V1) |
| `DOC/CONTRAT_COLLABORATION.md` | Accord de collaboration et cession de droits |
| `DOC/Passeport Maison Design System/` | Tokens couleurs, typographie, assets |
| `DOC/Passeport Maison Design System/ui_kits/mobile/` | Prototype hi-fi React |

Pour lancer le prototype hi-fi :

```bash
npx serve "DOC/Passeport Maison Design System/ui_kits/mobile" -p 8734
```

## Périmètre V1

Voir `DOC/wireframes.html` pour la liste complète des 32 écrans.

**Hors scope V1 :** estimation/devis travaux de construction, paiement en ligne, multi-logements, notifications push.

## Licence

Propriété exclusive de **Bezama Tiaravo Fredo**. Tous droits réservés.  
Voir `DOC/CONTRAT_COLLABORATION.md` pour les conditions de collaboration.

# BiblioTech — Gestion de bibliothèque

Application web de gestion d'une bibliothèque. Le frontend Angular communique avec une API REST Spring Boot qui persiste les auteurs et les livres dans MySQL.

## Fonctionnalités

- Consulter les livres et leurs auteurs.
- Rechercher les livres par auteur.
- Ajouter, modifier et supprimer des livres.
- Consulter, ajouter et modifier des auteurs.
- Bloquer la suppression d'un auteur qui possède encore des livres.
- Afficher sur la page d'accueil le nombre de livres et d'auteurs.

## Architecture

```text
bibliothequeV1/
├── biblio-front/       # Interface Angular
├── src/main/java/      # API Spring Boot (contrôleurs, services, repositories, entités)
├── src/main/resources/ # Configuration et vues du backend
├── postman/            # Ressources Postman
├── pom.xml             # Dépendances et configuration Maven
└── README.md
```

## Prérequis

- Java 21
- Node.js et npm
- MySQL

## Configuration de MySQL

Créez la base de données :

```sql
CREATE DATABASE bibliotheque_db;
```

Le backend lit les identifiants MySQL depuis les variables d'environnement `DB_USERNAME` et `DB_PASSWORD`. Configurez-les dans votre environnement ou dans la configuration de lancement IntelliJ. Ne renseignez pas de vrais identifiants dans un fichier commité.

## Lancement

### Backend

Depuis la racine du projet, dans une invite de commandes Windows :

```cmd
set DB_USERNAME=votre_utilisateur_mysql
set DB_PASSWORD=votre_mot_de_passe_mysql
mvnw.cmd spring-boot:run
```

L'API est disponible à l'adresse `http://localhost:8081`.

### Frontend

Dans un deuxième terminal :

```cmd
cd biblio-front
npm install
npm start
```

L'application Angular est disponible à l'adresse `http://localhost:4200`. Le backend doit être démarré pour charger et enregistrer les données.

## Principaux endpoints REST

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/livres` | Lister les livres |
| `GET` | `/api/livres/auteur/{idAuteur}` | Filtrer les livres par auteur |
| `POST` | `/api/livres` | Ajouter un livre |
| `PUT` | `/api/livres/{id}` | Modifier un livre |
| `DELETE` | `/api/livres/{id}` | Supprimer un livre |
| `GET` | `/api/auteurs` | Lister les auteurs |
| `POST` | `/api/auteurs` | Ajouter un auteur |
| `PUT` | `/api/auteurs/{id}` | Modifier un auteur |
| `DELETE` | `/api/auteurs/{id}` | Supprimer un auteur sans livres associés |

## Dépôt GitHub

Le fichier `.gitignore` exclut les dépendances et fichiers générés. Vérifiez avant chaque push qu'aucun mot de passe ou fichier contenant des secrets n'est ajouté au dépôt.

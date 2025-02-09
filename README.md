# API REST WebSocket

Ce projet implémente une API REST pour la gestion des utilisateurs, utilisée en conjonction avec un serveur WebSocket. L'API permet de gérer les utilisateurs, de les ajouter, de les mettre à jour, et de les récupérer depuis une base de données MySQL.

---

## Prérequis

- **Node.js** : Version 14 ou supérieure
- **MySQL** : Version 5.7 ou supérieure

---

## Installation

### 1. Cloner le projet

Clonez le dépôt sur votre machine locale :

```bash
git clone https://github.com/ton-utilisateur/api-rest.git
cd api-rest
```

### 2. Installer les dépendances

Assurez-vous d'avoir Node.js installé, puis exécutez la commande suivante pour installer toutes les dépendances nécessaires :

```bash
npm install
```

### 3. Configurer la base de données
a. Créer la base de données

Avant de démarrer l'application, assurez-vous que la base de données websocket est créée dans votre instance MySQL. Vous pouvez créer la base de données en utilisant la commande suivante dans MySQL :

```sql
CREATE DATABASE websocket;
```

b. Configurer les variables d'environnement

Copiez le fichier .env.example en .env :
```bash
cp .env.example .env
```

Ouvrez le fichier .env et modifiez-le pour correspondre à votre configuration de base de données MySQL. Par défaut, les paramètres sont les suivants :
```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=websocket
```

Si vous utilisez un autre utilisateur ou une autre base de données, modifiez ces valeurs en conséquence.

### 4. Créer les tables dans la base de données
Dans la base de données websocket, vous devez créer les tables nécessaires pour stocker les utilisateurs. Utilisez le script suivant pour créer la table users :

```sql
Copy
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
latitude DECIMAL(10, 6),
longitude DECIMAL(10, 6),
isConnected BOOLEAN DEFAULT FALSE
);
```

### 5. Démarrer le serveur
   Une fois tout configuré, démarrez le serveur en utilisant la commande suivante :

```bash
npm start
```
L'API sera accessible à l'adresse suivante :
```bash
http://localhost:4000
```

---

## Routes API

### 1. Récupérer tous les utilisateurs

**GET /api/users**

Retourne la liste de tous les utilisateurs enregistrés dans la base de données.

**Exemple de requête :**

```bash
curl -X GET http://localhost:4000/api/users
```

---
### 2. Récupérer les utilisateurs connectés
   GET /api/users/connect

Retourne la liste des utilisateurs actuellement connectés.

Exemple de requête :

```bash

curl -X GET http://localhost:4000/api/users/connect
```

---
### 3. Récupérer un utilisateur par ID
   GET /api/users/:id

Retourne les informations d'un utilisateur spécifique en fonction de son ID.

Exemple de requête :

```bash
curl -X GET http://localhost:4000/api/users/1
```

---

### 4. Créer un utilisateur
POST /api/users

Ajoute un nouvel utilisateur à la base de données.

Exemple de requête :

```bash
curl -X POST http://localhost:4000/api/users \
-H "Content-Type: application/json" \
-d '{
"name": "Jane Doe",
"email": "jane@example.com",
"latitude": 48.8566,
"longitude": 2.3522
}'
```

---

### 5. Mettre à jour un utilisateur
   PUT /api/users/:email

Met à jour les informations d'un utilisateur en fonction de son email.

Exemple de requête :

```bash
curl -X PUT http://localhost:4000/api/users/jane@example.com \
-H "Content-Type: application/json" \
-d '{
"name": "Jane Doe Updated",
"latitude": 48.8566,
"longitude": 2.3522,
"isConnected": true
}'
```

---

### 6. Supprimer un utilisateur
DELETE /api/users/:id

Supprime un utilisateur de la base de données en fonction de son ID.

Exemple de requête :

```bash
curl -X DELETE http://localhost:4000/api/users/1

```

---

### 7. Récupérer un utilisateur par email
GET /api/users/email/:email

Retourne les informations d'un utilisateur en fonction de son email.

Exemple de requête :

```bash
curl -X GET http://localhost:4000/api/users/email/jane@example.com
```

---

### 8. Déconnecter un utilisateur
PUT /api/users/disconnect/:email

Déconnecte un utilisateur en mettant à jour son statut isConnected à false.

Exemple de requête :

```bash
curl -X PUT http://localhost:4000/api/users/disconnect/jane@example.com
```





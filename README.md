# Port de Plaisance Russell

Application web de gestion des réservations de catways pour le Port de Plaisance Russell.

## Technologies utilisées

- Node.js / Express
- MongoDB Atlas / Mongoose
- EJS (moteur de vues)
- bcryptjs (hashage des mots de passe)
- express-session (authentification)

## Installation

1. Cloner le dépôt :
git clone https://github.com/Sqdingg/port-russell.git
cd port-russell

2. Installer les dépendances :
npm install

3. Créer un fichier `.env` :
MONGO_URI=votre_url_mongodb
JWT_SECRET=votre_secret
SESSION_SECRET=votre_session_secret
PORT=3000

4. Importer les données :
node seed.js

5. Lancer le serveur :
node app.js

## Identifiants de test

- **Email :** admin@port-russell.fr
- **Mot de passe :** Admin1234

## Routes API

### Authentification
- POST /login
- GET /logout

### Catways
- GET /catways
- GET /catways/:id
- POST /catways
- PUT /catways/:id
- DELETE /catways/:id

### Réservations
- GET /catways/:id/reservations
- GET /catways/:id/reservations/:idReservation
- POST /catways/:id/reservations
- PUT /catways/:id/reservations/:idReservation
- DELETE /catways/:id/reservations/:idReservation

### Utilisateurs
- GET /users
- GET /users/:email
- POST /users
- PUT /users/:email
- DELETE /users/:email

## Lien de l'application

https://port-russell.onrender.com
# Javascript full-stack 
## Social-Networks
### React / Express / MongoDB

Voici le projet création d'un réseau social d'entreprise : Social-Networks

_____________________________

### Backend config :

* Ouvrez un premier terminal

* Installez les dépendances : `cd backend` + `npm install`

* Créez le fichier `.env` dans `backend/config/` avec les données suivantes

   - PORT=5000 `port localhost`

   - CLIENT_URL="http://localhost:5173" `Votre port client`
   
   - DB_USER_PASS='`Votre identifiant et mot de passe MongoDB`'

   - DB_NAME='`Votre nom base de donnée MongoDB`'

   - TOKEN_SECRET='`Votre token secret`'

   - PATH_PICTURE='`../frontend/public/uploads`'

   - ADMIN_PSEUDO='`Votre pseudo d'Administrateur`'
   - ADMIN_EMAIL='`Votre email d'Administrateur`'

* Démarrer le server : `npm start`
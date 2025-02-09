const express = require("express");
const userController = require("../db/database"); // Assure-toi que ce chemin est correct

const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get("/", userController.getAllUsers);

// Route pour récupérer les utilisateurs connectés
router.get("/connect", userController.connectUser);

// Route pour récupérer un utilisateur par ID
router.get("/:id", userController.getUserById);

// Route pour créer un utilisateur
router.post("/", userController.createUser);

// Route pour mettre à jour un utilisateur
router.put("/:email", userController.updateUser);

// Route pour supprimer un utilisateur
router.delete("/:id", userController.deleteUser);

//Route pour recuperer un utilisateur par email
router.get("/email/:email", userController.getUserByEmail);

//Route pour déconnecter un utilisateur
router.put("/disconnect/:email", userController.disconnectUser);

module.exports = router;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Pour logger les requêtes

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // Remplace body-parser
app.use(morgan("dev")); // Log des requêtes HTTP

// Routes
const usersRoutes = require("./routes/users");
app.use("/api/users", usersRoutes);


// Gestion des routes non trouvées
app.use((req, res, next) => {
    res.status(404).json({ message: "Route non trouvée" });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error("Erreur serveur :", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`🚀 API RESTful disponible sur http://localhost:${port}`);
});

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "websocket",
});

const userController = {

    getAllUsers: async (req, res) => {
        try {
            const [users] = await pool.query("SELECT id, name, email, longitude, latitude FROM users");
            res.status(200).json(users);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    },

    getUserById: async (req, res) => {
        const userId = req.params.id;

        try {
            const [user] = await pool.query("SELECT id, name, email, longitude, latitude FROM users WHERE id = ?", [userId]);

            if (user.length > 0) {
                res.status(200).json(user[0]);
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur:", error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    },

    createUser: async (req, res) => {
        const { name, email, longitude, latitude, isConnected} = req.body;

        if (!name || !email || longitude === undefined || latitude === undefined || isConnected === undefined) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        const longitudeNum = parseFloat(longitude);
        const latitudeNum = parseFloat(latitude);

        if (isNaN(longitudeNum) || isNaN(latitudeNum)) {
            return res.status(400).json({ message: "Les coordonnées doivent être des nombres valides" });
        }

        try {
            const [result] = await pool.execute(
                "INSERT INTO users (name, email, longitude, latitude,isConnected) VALUES (?, ?, ?, ?,?)",
                [name, email, longitudeNum, latitudeNum,isConnected]
            );

            res.status(201).json({ id: result.insertId, name, email, longitude: longitudeNum, latitude: latitudeNum,isConnected: isConnected });
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur:", error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    },

    updateUser: async (req, res) => {
        const userEmail = req.params.email;
        const { name, email, longitude, latitude } = req.body;

        if (!name || !email || longitude === undefined || latitude === undefined) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        const longitudeNum = parseFloat(longitude);
        const latitudeNum = parseFloat(latitude);

        if (isNaN(longitudeNum) || isNaN(latitudeNum)) {
            return res.status(400).json({ message: "Les coordonnées doivent être des nombres valides" });
        }

        try {
            const [result] = await pool.execute(
                "UPDATE users SET name = ?, email = ?, longitude = ?, latitude = ? WHERE email = ?",
                [name, email, longitudeNum, latitudeNum, userEmail]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    },

    deleteUser: async (req, res) => {
        const userId = req.params.id;

        try {
            const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [userId]);

            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Utilisateur supprimé" });
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    },
    connectUser: async (req, res) => {
        try {
            const [users] = await pool.query("SELECT id, name, email, longitude, latitude FROM users WHERE isConnected = true");
            res.status(200).json(users);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    },
    getUserByEmail: async (req, res) => {  // Correction ici : (req, res)
        const email = req.params.email; // ✅ Maintenant, req.params.email est bien défini

        try {
            const [user] = await pool.query(
                "SELECT id, name, email, longitude, latitude FROM users WHERE email = ?",
                [email]
            );

            if (user.length > 0) {
                res.status(200).json(user[0]); // ✅ Retourner le premier utilisateur trouvé
            } else {
                res.status(200).json()
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur:", error);
            res.status(500).json({ message: "Erreur interne du serveur" });
        }
    },
    disconnectUser: async (req, res) => {
        const userEmail = req.params.email;

        try {
            const [result] = await pool.execute(
                "UPDATE users SET isConnected = false WHERE email = ?",
                [userEmail]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({message: "Utilisateur déconnecté avec succès"});
            } else {
                res.status(404).json({message: "Utilisateur non trouvé"});
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion de l'utilisateur:", error);
            res.status(500).json({message: "Erreur interne du serveur"});
        }
    },
};

module.exports = userController;

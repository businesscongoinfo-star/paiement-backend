const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test serveur
app.get("/", (req, res) => {
    res.send("Serveur OK ✅");
});

// paiement
app.post("/payer", async (req, res) => {
    try {
        const { phone, amount } = req.body;

        console.log("Paiement reçu:", phone, amount);

        res.json({
            success: true,
            message: "Paiement simulé réussi ✅"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur serveur"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Serveur lancé sur " + PORT);
});

const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/payer', async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await fetch('https://api.sandbox.pawapay.io/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PAWAPAY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount,
        currency: "XAF",
        payer: {
          type: "MSISDN",
          address: { value: phone }
        }
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Erreur paiement" });
  }
});

app.listen(3000, () => console.log("Serveur lancé"));
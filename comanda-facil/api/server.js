require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'comanda_facil'
});

db.connect(err => {
    if (err) {
        console.error('Falha ao conectar ao Banco de Dados:', err);
    } else {
        console.log('Banco de Dados Conectado!');
    }
});

app.get('/orders', (req, res) => {
    db.query('SELECT * FROM COMANDAS', (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

app.post('/orders', (req, res) => {
    const mesa = req.body.mesa;
    const comanda = req.body.comanda;

    db.query('INSERT INTO COMANDAS (MESA, COMANDA, VALOR_TOTAL, PAGO) VALUES (?, ?, 0.00, FALSE)', [mesa, comanda], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: result.insertId, mesa, comanda });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});
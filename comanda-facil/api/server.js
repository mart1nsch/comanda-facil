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
    console.log('chama consulta comandas');
    db.query('SELECT * FROM COMANDAS ORDER BY COMANDA', (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            console.log('Consultado Comandas');
            res.json(result);
        }
    });
});

app.get('/products', (req, res) => {
    console.log('chama consulta produtos');
    db.query('SELECT * FROM PRODUTOS', (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            console.log('Consultado Produtos');
            res.json(result);
        }
    });
});

app.post('/orders', (req, res) => {
    const mesa = req.body.mesa;
    const comanda = req.body.comanda;
    
    console.log('chama insert comanda');

    db.query('INSERT INTO COMANDAS (MESA, COMANDA, VALOR_TOTAL, PAGO) VALUES (?, ?, 0.00, FALSE)', [mesa, comanda], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            console.log('Inserido Comanda');
            res.json({ id: result.insertId, mesa, comanda });
        }
    });
});

app.post('/products', (req, res) => {
    const descricao = req.body.descricao;
    const vlrUnitario = req.body.vlrUnitario;

    console.log('chama insert produtos');

    db.query('INSERT INTO PRODUTOS (DESCRICAO, VALOR_UNITARIO, SITUACAO) VALUES (?, ?, "ATIVO")', [descricao, vlrUnitario], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            console.log('Inserido Produto');
            res.json({ id: result.insertId, descricao, vlrUnitario });
        }
    });
});

app.post('/orders/itens', (req, res) => {
    const comandaId = req.body.comandaId;
    const produtoId = req.body.produtoId;
    
    console.log('chama insert item comanda');

    db.query('INSERT INTO COMANDAS_ITEM (COMANDAS_ID, PRODUTOS_ID) VALUES (?, ?)', [comandaId, produtoId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            console.log('Inserido Comanda');
            res.json({ id: result.insertId, comandaId, produtoId });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});
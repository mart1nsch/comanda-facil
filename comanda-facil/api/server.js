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
    db.query('SELECT * FROM COMANDAS WHERE PAGO = FALSE ORDER BY COMANDA', (err, result) => {
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
    db.query('SELECT * FROM PRODUTOS WHERE SITUACAO = "ATIVO" ORDER BY DESCRICAO', (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            console.log('Consultado Produtos');
            res.json(result);
        }
    });
});

app.get('/order/items/:id', (req, res) => {
    const id = req.params.id;

    console.log('chama consulta itens comandas', id);

    db.query('SELECT P.DESCRICAO, C.QUANTIDADE FROM PRODUTOS P, COMANDAS_ITEM C WHERE P.ID = C.PRODUTOS_ID AND C.COMANDAS_ID = ?', [id],(err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            console.log('Consultado Comandas');
            res.json(result);
        }
    });
});

app.get('/order/:id', (req, res) => {
    const id = req.params.id;

    console.log('chama consulta uma comanda', id);

    db.query('SELECT * FROM COMANDAS WHERE ID = ?', [id],(err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            console.log('Consultado Comandas');
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

app.post('/add-item', (req, res) => {
    const comandaId = req.body.comandaId;
    const produtoId = req.body.produtoId;
    const vlrUnitario = req.body.vlrUnitario;
    
    console.log('chama insert item comanda');

    db.query('INSERT INTO COMANDAS_ITEM (COMANDAS_ID, PRODUTOS_ID) VALUES (?, ?)', [comandaId, produtoId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            db.query('UPDATE COMANDAS SET VALOR_TOTAL = VALOR_TOTAL + ? WHERE ID = ?', [vlrUnitario, comandaId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: err.message });
                } else {
                    console.log('Inserido Comanda');
                    res.json({ id: comandaId });
                }
            });
        }
    });
});

app.post('/orders/delete', (req, res) => {
    const id = req.body.id;
    
    console.log('chama delete comanda');

    db.query('DELETE FROM COMANDAS_ITEM WHERE COMANDAS_ID = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            db.query('DELETE FROM COMANDAS WHERE ID = ?', [id], (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    console.log('Comanda Deletada');
                    res.json({ id: id });
                }
            });
        }
    });
});

app.post('/orders/finish', (req, res) => {
    const id = req.body.id;
    
    console.log('chama finalizar comanda');

    db.query('UPDATE COMANDAS SET PAGO = TRUE WHERE ID = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            console.log('Comanda Finalizada');
            res.json({ id: id });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});
require('dotenv').config();

const express = require('express');
const path = require('path');
const crypto = require('crypto');

const db = require('./db');
const {user} = require("./config/db.config");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/add', async (req, res) => {
    let { name, lastname, email, birthdate, nickname, tricks } = req.body;

    if (!name || !email || !birthdate || !nickname) {
        return res.status(400).json({ error: 'empty field/s' });
    }

    birthdate = new Date(birthdate);
    if (isNaN(birthdate.getTime())) {
        return res.status(400).json({ error: 'invalid date' });
    }

    tricks = !!tricks;

    const userUUID = crypto.randomUUID();
    const animalUUID = crypto.randomUUID();

    try {
        await db.tx(async t => {

            await t.none(
                'INSERT INTO users (id, name, last_name, email, birthdate) VALUES ($1,$2,$3,$4,$5)',
                [userUUID, name, lastname, email, birthdate]
            );

            await t.none(
                'INSERT INTO animals (id, nickname, cantricks, owner) VALUES ($1,$2,$3,$4)',
                [animalUUID, nickname, tricks, userUUID]
            );
        });

        res.status(201).json({ message: 'OK' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'database error' });
    }
});



app.get('/list', async (req, res) => {
    try {
        const animalsRows = await db.any(`
            SELECT a.id, a.nickname, a.cantricks,a.owner
            FROM animals a
        `);
        let animalRow = animalsRows.map(animal => `
        <tr>
            <td>${animal.id}</td>
            <td>${animal.nickname}</td>
            <td>${animal.cantricks === true ? 'TAK' : 'NIE'}</td>
            <td>${animal.owner}</td>
        </tr>`)

        const usersRows = await db.any(`
            SELECT u.id, u.name, u.last_name,u.email,u.birthdate
            FROM users u
        `);
        let userRow = usersRows.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td>${user.birthdate.toISOString().split('T')[0]}</td>
        </tr>`)
        res.status(200).send(`<!doctype html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LISTA DANYCH</title>
    <style>

    
    table {
        border-collapse: collapse;
        min-width: 360px;
        font-size: 13px;        
    }
    
    th, td {
        border: 1px solid #ccc;
        padding: 4px 8px;      
        text-align: left;
        white-space: nowrap;  
    }
    
    th {
        background: #f2f2f2;
        font-weight: 600;
    }

    tr:nth-child(even) {
        background: #fafafa;
    }

    </style>
</head>

<body>
<nav>
    <ul>
        <li><a href="/">HOME</a></li>
        <li><a href="/list">DANE W TABELI</a></li>

    </ul>
</nav>
<h2>DANE ZWIERZAKOW I ICH WLASCICIELI</h2>
<form action="/add" method="post">
    <div class="container">
            <table id="tanimals">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>PSEUDONIM</th>
                    <th>POTRAFI SZTUCZKI?</th>
                    <th>ID WŁAŚCICIELA</th>
                </tr>
                </thead>
                <tbody>
                ${animalRow}
                </tbody>
            </table>
            <br><br><br>
            <table id="tusers">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>IMIE</th>
                    <th>NAZWISKO</th>
                    <th>EMAIL</th>
                    <th>DATA URODZENIA</th>
                </tr>
                </thead>
                <tbody>
                ${userRow}
                </tbody>
            </table>



    </div>
</form>
</body>
</html>`)
    } catch (err) {
        res.status(500).json({error: 'database error'});

    }
});

app.get('/export-users', async (req, res) => {
    try {
        const usersRows = await db.any(`SELECT * FROM users`)
        res.setHeader('Content-Type','application/json');
        res.setHeader('Content-Disposition','attachment; filename="users.json"')
        res.send(JSON.stringify(usersRows))
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'database error' });
    }
});
app.get('/export-animals', async (req, res) => {
    try {
        const animalsRows = await db.any(`SELECT * FROM animals`)
        res.setHeader('Content-Type','application/json');
        res.setHeader('Content-Disposition','attachment; filename="animals.json"')
        res.send(JSON.stringify(animalsRows))
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'database error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

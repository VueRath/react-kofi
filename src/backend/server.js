const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const e = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'coffee_db'
});

db.connect(err => {
    if(err) {
        console.error('DB connection error: ', err);
    }
    else {
        console.log('Connected to MySQL database');
    }
})

app.post('/register-admin', [
    // Validation rules
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must at least 8 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new admin into the database
        db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, 'admin'], 
            (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ message: 'Username already exists' });
                    }
                    return res.status(500).json({ message: 'Server error', error: err });
                }
                res.status(201).json({ message: 'Admin registered successfully' });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetching all coffees in the database
app.get('/coffees', (req, res) => {
    db.query('SELECT * FROM coffees', (err, results) => {
        if(err){
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        } else {
            res.json(results);
        }
    });
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
})
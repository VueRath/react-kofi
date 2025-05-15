const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const e = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const { body, validationResult } = require('express-validator');

const app = express();

app.use(cors());
app.use(express.json());

// Creating connection to mysql (config)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'coffee_db'
}).promise();

// Connection to Express (config)
db.connect(err => {
    if(err) {
        console.error('DB connection error: ', err);
    }
    else {
        console.log('Connected to MySQL database');
    }
})

// Creating admin
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
        await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, 'admin']);
        res.status(201).json({ message: 'Admin registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetching all coffees in the database
app.get('/coffees', async (req, res) => {
     try {
    const [results] = await db.query('SELECT * FROM coffees');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Fetch all users including admin and users
app.get('/register-admin', async (req, res) => {
     try {
    const [results] = await db.query('SELECT * FROM users');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Login with creating token using POST submit
app.post('/login', async (req, res) => {
    const {username, password} = req.body;

     try {
        // Using promise
    const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    console.log(password, user.password, match);
    console.log(results);

    if (!match) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    console.log(token);

    res.status(200).json({
      message: 'Login Successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
})
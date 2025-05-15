import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
dotenv.config({ path: path.resolve('./.env') });
const SECRET_KEY = process.env.SECRET_KEY;
import { body, validationResult } from 'express-validator';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('ENV file contents: ', fs.readFileSync(path.resolve(__dirname, '.env'), 'utf-8'));

// Token for the login file
if(!SECRET_KEY)
  {
    console.error('Secret key is not defined!');
    process.exit(1);
  }


const app = express();

app.use(cors());
app.use(express.json());

/**
 * Configuration statis to create and connect to the database
 * using also promise to avoid complexity in coding.
 */

// Creating connection to mysql (config)
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'coffee_db'
});

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

/**
 * Getting all the database table ensuring all users other tables are going to 
 * Fetch in my frontend using API so that my frontend can able to communicate in my backend.
 */

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
        console.log('Login attempt: ', {username, password});
    const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    console.log(password, user.password, match);
    console.log(results);

    if (!match) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
       SECRET_KEY, { expiresIn: '1h' }
      );
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

/**
 * Adding Middleware to the system to avoid direct path to the system
 * This ensure also that the system path are blocks whenever someone is trying to access into it.
 */

//Middleware
function authenticateToken(req,res,next)
{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer Token or handle the token

  if(!token) return res.status(401).json({message: 'No token provided'});

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if(err) return res.status(403).json({message: 'Invalid token'});
    req.user = user;
    next();
  });
}

// Protected route here
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({message: `Welcome ${req.user.username}! This is the protected route`});
});


app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
})
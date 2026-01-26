const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
  } else {
    console.log('✓ Connected to PostgreSQL database');
    release();
  }
});

// Create table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS form_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    age INTEGER,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(createTableQuery)
  .then(() => console.log('✓ Table "form_data" is ready'))
  .catch(err => console.error('Error creating table:', err));

// Routes

// GET - Fetch all records from database
app.get('/api/records', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM form_data ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching records from database'
    });
  }
});

// POST - Submit form data
app.post('/api/submit', async (req, res) => {
  const { name, email, age, message } = req.body;

  // Validation
  if (!name || !email || !age || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required'
    });
  }

  try {
    // Insert into database
    const insertQuery = `
      INSERT INTO form_data (name, email, age, message)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(insertQuery, [name, email, age, message]);
    const insertedRecord = result.rows[0];

    // Save to JSON file
    const dataFilePath = path.join(__dirname, 'data.json');
    let existingData = [];

    // Read existing data if file exists
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
      try {
        existingData = JSON.parse(fileContent);
      } catch (e) {
        existingData = [];
      }
    }

    // Add new record
    existingData.push({
      id: insertedRecord.id,
      name,
      email,
      age,
      message,
      created_at: insertedRecord.created_at
    });

    // Write back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

    res.json({
      success: true,
      message: 'Data saved successfully',
      data: insertedRecord
    });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({
      success: false,
      error: 'Error saving data to database'
    });
  }
});

// GET - Check available tables
app.get('/api/tables', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    res.json({
      success: true,
      tables: result.rows.map(row => row.table_name)
    });
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching tables'
    });
  }
});

// POST - Add animal with owner
app.post('/api/add-animal-with-owner', async (req, res) => {
  const { animalName, species, age, description, ownerName, email, phone, address } = req.body;

  // Validation
  const errors = [];

  // Walidacja imienia zwierzęcia
  if (!animalName || !animalName.trim()) {
    errors.push('Imię zwierzęcia jest wymagane');
  } else if (animalName.length < 2 || animalName.length > 50) {
    errors.push('Imię zwierzęcia musi mieć od 2 do 50 znaków');
  }

  // Walidacja gatunku
  if (!species || !species.trim()) {
    errors.push('Gatunek jest wymagany');
  } else if (species.length < 2 || species.length > 50) {
    errors.push('Gatunek musi mieć od 2 do 50 znaków');
  }

  // Walidacja wieku
  const ageNum = parseInt(age);
  if (!age) {
    errors.push('Wiek jest wymagany');
  } else if (isNaN(ageNum) || ageNum < 0 || ageNum > 100) {
    errors.push('Wiek musi być liczbą od 0 do 100');
  }

  // Walidacja opisu (opcjonalne)
  if (description && description.length > 500) {
    errors.push('Opis może mieć maksymalnie 500 znaków');
  }

  // Walidacja imienia właściciela
  if (!ownerName || !ownerName.trim()) {
    errors.push('Imię właściciela jest wymagane');
  } else if (ownerName.length < 2 || ownerName.length > 100) {
    errors.push('Imię właściciela musi mieć od 2 do 100 znaków');
  }

  // Walidacja email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.trim()) {
    errors.push('Email jest wymagany');
  } else if (!emailRegex.test(email)) {
    errors.push('Nieprawidłowy format email');
  }

  // Walidacja telefonu (opcjonalne)
  if (phone) {
    const phoneRegex = /^[0-9\s\-\+\(\)]{9,20}$/;
    if (!phoneRegex.test(phone)) {
      errors.push('Nieprawidłowy format telefonu');
    }
  }

  // Walidacja adresu (opcjonalne)
  if (address && address.length > 200) {
    errors.push('Adres może mieć maksymalnie 200 znaków');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', ')
    });
  }

  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Insert owner
    const userResult = await client.query(
      'INSERT INTO zadanie3.users (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING id',
      [ownerName, email, phone || null, address || null]
    );
    const ownerId = userResult.rows[0].id;

    // Insert animal
    const animalResult = await client.query(
      'INSERT INTO zadanie3.animals (name, species, age, description, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [animalName, species, age, description || null, ownerId]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Animal and owner added successfully',
      data: {
        animal: animalResult.rows[0],
        owner_id: ownerId
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding animal with owner:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  } finally {
    client.release();
  }
});

// POST - Initialize database schema
app.post('/api/init-schema', async (req, res) => {
  try {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Create schema
      await client.query('CREATE SCHEMA IF NOT EXISTS zadanie3');
      
      // Drop existing tables
      await client.query('DROP TABLE IF EXISTS zadanie3.animals CASCADE');
      await client.query('DROP TABLE IF EXISTS zadanie3.users CASCADE');
      
      // Create users table
      await client.query(`
        CREATE TABLE zadanie3.users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          phone VARCHAR(20),
          address TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      // Create animals table with 1:1 relationship
      await client.query(`
        CREATE TABLE zadanie3.animals (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          species VARCHAR(50) NOT NULL,
          age INTEGER,
          description TEXT,
          owner_id INTEGER UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_owner
            FOREIGN KEY (owner_id)
            REFERENCES zadanie3.users(id)
            ON DELETE CASCADE
        )
      `);
      
      // Insert sample data
      await client.query(`
        INSERT INTO zadanie3.users (name, email, phone, address) VALUES
        ('Jan Kowalski', 'jan.kowalski@email.com', '123-456-789', 'ul. Kwiatowa 5, Warszawa'),
        ('Anna Nowak', 'anna.nowak@email.com', '987-654-321', 'ul. Słoneczna 12, Kraków'),
        ('Piotr Wiśniewski', 'piotr.wisniewski@email.com', '555-123-456', 'ul. Leśna 8, Gdańsk'),
        ('Maria Kowalczyk', 'maria.kowalczyk@email.com', '444-555-666', 'ul. Parkowa 3, Wrocław')
      `);
      
      await client.query(`
        INSERT INTO zadanie3.animals (name, species, age, description, owner_id) VALUES
        ('Burek', 'Pies', 5, 'Przyjazny golden retriever', 1),
        ('Mruczek', 'Kot', 3, 'Szary kot perski', 2),
        ('Reksio', 'Pies', 7, 'Energiczny border collie', 3),
        ('Puszek', 'Kot', 2, 'Biały kot norweski', 4)
      `);
      
      await client.query('COMMIT');
      
      res.json({
        success: true,
        message: 'Schema "zadanie3" created with tables users and animals'
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error initializing schema:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Fetch data from animals table (with owner info)
app.get('/api/animals', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        a.id,
        a.name,
        a.species,
        a.age,
        a.description,
        a.owner_id,
        a.created_at,
        u.name as owner_name,
        u.email as owner_email,
        u.phone as owner_phone,
        u.address as owner_address
      FROM zadanie3.animals a
      LEFT JOIN zadanie3.users u ON a.owner_id = u.id
      ORDER BY a.id
    `);
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching animals:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching animals from database'
    });
  }
});

// GET - Fetch data from users table
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM zadanie3.users ORDER BY id');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching users from database'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   - POST /api/init-schema            - Initialize database schema`);
  console.log(`   - POST /api/add-animal-with-owner  - Add animal with owner`);
  console.log(`   - GET  /api/records                - Fetch all form submissions`);
  console.log(`   - POST /api/submit                 - Submit new form data`);
  console.log(`   - GET  /api/tables                 - Check available tables`);
  console.log(`   - GET  /api/animals                - Fetch animals with owners`);
  console.log(`   - GET  /api/users                  - Fetch users data\n`);
});

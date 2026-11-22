const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'UP', database: 'UP' });
  } catch (error) {
    res.status(500).json({ status: 'DOWN', database: 'DOWN' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM taches ORDER BY id');
    res.json({ tasks: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { titre } = req.body;
    const result = await pool.query(
      'INSERT INTO taches (titre, fait) VALUES ($1, false) RETURNING *',
      [titre]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('API tp3 demarree sur le port 3000');
});

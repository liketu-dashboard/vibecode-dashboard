// server.js
const express = require('express');
const path    = require('path');
const sql     = require('mssql');
const cors    = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const config = {
  user: process.env.HIVESQL_USER,
  password: process.env.HIVESQL_PASSWORD,
  server: process.env.HIVESQL_SERVER || 'vip.hivesql.io',
  database: process.env.HIVESQL_DATABASE || 'DBHive',
  port: parseInt(process.env.HIVESQL_PORT || '1433', 10),
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

app.get('/api/daily-posts', async (req, res) => {
  const days = parseInt(req.query.days || '90', 10);
  const query = [
    "SELECT",
    "CAST(created AS DATE) AS post_date,",
    "COUNT(*) AS daily_posts",
    "FROM Comments",
    "WHERE depth = 0",
    "AND created >= DATEADD(day, -" + days + ", GETDATE())",
    "AND CONTAINS(Comments.json_metadata, 'app:liketu')",
    "GROUP BY CAST(created AS DATE)",
    "ORDER BY post_date;"
  ].join(' ');

  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);
    await pool.close();
    const formatted = result.recordset.map(r => ({ date: r.post_date, posts: r.daily_posts }));
    res.json(formatted);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch daily posts', message: err.message });
  }
});

app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

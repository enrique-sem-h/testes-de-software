import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).promise();

export async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}

export async function getUser(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

export async function createUser(name, email, password) {
  const [result] = await pool.query('INSERT IGNORE INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
  return getUser(result.insertId);
}

export async function deleteUser(id) {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return getUser(result.insertId);
}

console.log(await createUser("Enrique", "enrique@a.com", "1234"));

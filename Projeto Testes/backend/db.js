import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

// database connection pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).promise();

// database functions
async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}

async function getUser(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
}

async function createUser(name, email, password) {
  const [result] = await pool.query('INSERT IGNORE INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
  return getUser(result.insertId);
}

async function deleteUser(id) {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return getUser(result.insertId);
}

async function getMaterial(id) {
  const [rows] = await pool.query(`SELECT * FROM materials WHERE id = ?`, [id]);
  return rows[0];
}

async function createMaterial(title, description, subject, level, type, file_path, author_id, size) {
  if (description === undefined) {
    description = '';
  }
  const [result] = await pool.query('INSERT INTO materials (title, description, subject, level, type, file_path, author_id, size) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, description, subject, level, type, file_path, author_id, size]);
  return getMaterial(result.insertId);
}

async function getAllMaterials() {
  const [rows] = await pool.query('SELECT * FROM materials');
  return rows;
}

async function getAllMaterialsWithAuthors() {
  const [materials] = await pool.query('SELECT m.*, u.name AS author_name FROM materials AS m INNER JOIN users AS u ON m.author_id = u.id');
  return materials;
}

export {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  getMaterial,
  createMaterial,
  getAllMaterials,
  getAllMaterialsWithAuthors
};

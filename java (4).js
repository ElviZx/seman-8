const { query } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  create: async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const result = await query(
      `INSERT INTO users (email, password, full_name, role_id) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, full_name, role_id, created_at`,
      [userData.email, hashedPassword, userData.full_name, userData.role_id]
    );
    
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await query(
      `SELECT users.*, roles.name as role_name 
       FROM users 
       LEFT JOIN roles ON users.role_id = roles.id 
       WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await query(
      `SELECT users.*, roles.name as role_name 
       FROM users 
       LEFT JOIN roles ON users.role_id = roles.id 
       WHERE users.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },

  updateLastLogin: async (userId) => {
    await query(
      'UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [userId]
    );
  }
};

module.exports = User;
const { query } = require('../config/database');

const Role = {
  findAll: async () => {
    const result = await query('SELECT * FROM roles ORDER BY name');
    return result.rows;
  },

  findById: async (id) => {
    const result = await query('SELECT * FROM roles WHERE id = $1', [id]);
    return result.rows[0];
  },

  findByName: async (name) => {
    const result = await query('SELECT * FROM roles WHERE name = $1', [name]);
    return result.rows[0];
  }
};

module.exports = Role;
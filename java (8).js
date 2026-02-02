const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const authMiddleware = require('../middlewares/auth.middleware');

// Get all roles (public)
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected admin route example
router.get('/admin-only', 
  authMiddleware.authenticate, 
  authMiddleware.authorize('admin'),
  (req, res) => {
    res.json({ 
      message: 'Welcome admin!',
      user: req.user 
    });
  }
);

module.exports = router;
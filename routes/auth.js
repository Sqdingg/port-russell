const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('index', { error: 'Veuillez remplir tous les champs' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.render('index', { error: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('index', { error: 'Email ou mot de passe incorrect' });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    res.redirect('/dashboard');
  } catch (error) {
    res.render('index', { error: 'Erreur serveur' });
  }
});

// GET /logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
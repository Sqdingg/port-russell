const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isAuthenticated = require('../middleware/auth');

// GET /users
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.render('users/list', { users, user: req.session.user });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// GET /users/:email
router.get('/:email', isAuthenticated, async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.params.email }).select('-password');
    if (!foundUser) return res.status(404).send('Utilisateur non trouvé');
    res.render('users/details', { foundUser, user: req.session.user });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// POST /users
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.redirect('/users');
  } catch (error) {
    const users = await User.find().select('-password');
    res.render('users/list', { users, user: req.session.user, error: error.message });
  }
});

// PUT /users/:email
router.post('/edit/:email', isAuthenticated, async (req, res) => {
  try {
    const { username, email } = req.body;
    await User.findOneAndUpdate(
      { email: req.params.email },
      { username, email },
      { new: true, runValidators: true }
    );
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// DELETE /users/:email
router.post('/delete/:email', isAuthenticated, async (req, res) => {
  try {
    await User.findOneAndDelete({ email: req.params.email });
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
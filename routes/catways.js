const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');
const isAuthenticated = require('../middleware/auth');

// GET /catways
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('catways/list', { catways, user: req.session.user });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// GET /catways/:id
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).send('Catway non trouvé');
    res.render('catways/details', { catway, user: req.session.user });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// POST /catways
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    const newCatway = new Catway({ catwayNumber, catwayType, catwayState });
    await newCatway.save();
    res.redirect('/catways');
  } catch (error) {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('catways/list', { catways, user: req.session.user, error: error.message });
  }
});

// PUT /catways/:id (uniquement catwayState)
router.post('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const { catwayState } = req.body;
    await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState },
      { new: true, runValidators: true }
    );
    res.redirect('/catways');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// DELETE /catways/:id
router.post('/delete/:id', isAuthenticated, async (req, res) => {
  try {
    await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    res.redirect('/catways');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
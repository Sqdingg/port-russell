const express = require('express');
const router = express.Router({ mergeParams: true });
const Reservation = require('../models/Reservation');
const isAuthenticated = require('../middleware/auth');

// GET /catways/:id/reservations
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.render('reservations/list', { reservations, catwayId: req.params.id, user: req.session.user });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// GET /catways/:id/reservations/:idReservation
router.get('/:idReservation', isAuthenticated, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) return res.status(404).send('Réservation non trouvée');
    res.render('reservations/details', { reservation, catwayId: req.params.id, user: req.session.user });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// POST /catways/:id/reservations
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { clientName, boatName, startDate, endDate } = req.body;
    const newReservation = new Reservation({
      catwayNumber: req.params.id,
      clientName,
      boatName,
      startDate,
      endDate
    });
    await newReservation.save();
    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.render('reservations/list', { reservations, catwayId: req.params.id, user: req.session.user, error: error.message });
  }
});

// PUT /catways/:id/reservations/:idReservation
router.post('/edit/:idReservation', isAuthenticated, async (req, res) => {
  try {
    const { clientName, boatName, startDate, endDate } = req.body;
    await Reservation.findByIdAndUpdate(
      req.params.idReservation,
      { clientName, boatName, startDate, endDate },
      { new: true, runValidators: true }
    );
    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// DELETE /catways/:id/reservations/:idReservation
router.post('/delete/:idReservation', isAuthenticated, async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.idReservation);
    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
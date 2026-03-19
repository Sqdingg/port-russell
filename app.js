require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const catwayRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservations');
const Reservation = require('./models/Reservation');
const isAuthenticated = require('./middleware/auth');

const app = express();

// Connexion MongoDB
connectDB();

// Moteur de vues
app.set('view engine', 'ejs');
app.set('views', './views');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Documentation
app.get('/docs', (req, res) => {
  res.render('docs');
});

// Page d'accueil
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

// Tableau de bord
app.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const today = new Date();
    const reservations = await Reservation.find({
      startDate: { $lte: today },
      endDate: { $gte: today }
    });
    res.render('dashboard', {
      user: req.session.user,
      reservations,
      today: today.toLocaleDateString('fr-FR')
    });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
});

// Routes
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/catways/:id/reservations', reservationRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
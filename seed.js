require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');
const User = require('./models/User');

const catways = [
  { catwayNumber: 1, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 2, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 3, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 4, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 5, catwayType: "long", catwayState: "bon état" },
  { catwayNumber: 6, catwayType: "short", catwayState: "En cours de réparation. Ne peut être réservée actuellement" },
  { catwayNumber: 7, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 8, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 9, catwayType: "long", catwayState: "Plusieurs grandes tâches de peinture bleue sur le ponton" },
  { catwayNumber: 10, catwayType: "long", catwayState: "bon état" },
  { catwayNumber: 11, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 12, catwayType: "short", catwayState: "grosse tâche d'huile et trou en fin de ponton" },
  { catwayNumber: 13, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 14, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 15, catwayType: "long", catwayState: "bon état" },
  { catwayNumber: 16, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 17, catwayType: "short", catwayState: "2 planches bougent lorsqu'on marche dessus" },
  { catwayNumber: 18, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 19, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 20, catwayType: "long", catwayState: "bon état" },
  { catwayNumber: 21, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 22, catwayType: "short", catwayState: "bon état" },
  { catwayNumber: 23, catwayType: "short", catwayState: "La bite d'amarrage est légèrement désolidarisée" },
  { catwayNumber: 24, catwayType: "short", catwayState: "bon état" }
];

const reservations = [
  { catwayNumber: 1, clientName: "Thomas Martin", boatName: "Carolina", startDate: "2024-05-21", endDate: "2024-10-27" },
  { catwayNumber: 2, clientName: "John Doe", boatName: "Groeland", startDate: "2024-05-18", endDate: "2024-11-30" },
  { catwayNumber: 3, clientName: "Margareth Wurtz", boatName: "Sirène", startDate: "2024-06-20", endDate: "2024-08-27" },
  { catwayNumber: 7, clientName: "Ralph Laurent", boatName: "Surcouf", startDate: "2024-07-01", endDate: "2024-10-13" },
  { catwayNumber: 11, clientName: "Jack Sparrow", boatName: "Black perl", startDate: "2024-08-13", endDate: "2024-09-13" },
  { catwayNumber: 13, clientName: "Jacky Snow", boatName: "Léandra", startDate: "2024-09-18", endDate: "2024-12-23" }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connecté à MongoDB Atlas');

    await Catway.deleteMany({});
    await Reservation.deleteMany({});
    await User.deleteMany({});

    await Catway.insertMany(catways);
    console.log('✅ Catways importés');

    await Reservation.insertMany(reservations);
    console.log('✅ Réservations importées');

    const hashedPassword = await bcrypt.hash('Admin1234', 10);
    await User.collection.insertOne({
      username: 'admin',
      email: 'admin@port-russell.fr',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('✅ Utilisateur admin créé');

    console.log('🎉 Base de données prête !');
    process.exit();
  } catch (error) {
    console.error('Erreur :', error.message);
    process.exit(1);
  }
};

seed();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');

const catRoutes = require('../routes/cat.routes');
const adoptionRoutes = require('../routes/adoption.routes');
const volunteerRoutes = require('../routes/volunteer.routes');
const userRoutes = require('../routes/user.routes');
const donationRoutes = require('../routes/donation.routes');
const authRoutes = require('../routes/auth.routes');
const eventRoutes = require('../routes/event.routes');

class Server {
  constructor() {
    this.app  = express();
    this.port = process.env.PORT;

    this.middlewares();
    connectDB();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api/cats', catRoutes);
    this.app.use('/api/adoptions', adoptionRoutes);
    this.app.use('/api/volunteers', volunteerRoutes);
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/donations', donationRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/events', eventRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
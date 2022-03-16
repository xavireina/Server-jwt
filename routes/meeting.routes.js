const express = require('express');
const User = require('../models/User.model');
const Meeting = require('../models/Meeting.model');
//const isLoggedIn = require('../middlewares');

function meetingRoutes() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    
    try {
      const allmeetings = await Meeting.find({});
      
      res.json({ meetings: allmeetings });
    } catch (e) {
      next(e);
    }
  });

  router.post('/:id/join', async (req, res, next) => {
    const { id } = req.params;
    const user = req.payload;
    try {
      const meeting = await Meeting.findById(id);
      // Comprovem que l'usuari no estigui unit ja
      if (!meeting.usersJoined.includes(user._id)) {
        meeting.usersJoined.push(user._id);
        meeting.save();
      }
      return res.json({ updated: meeting });
    } catch (e) {
      next(e);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const meeting = await Meeting.findById(id);
      return res.json({ meeting: meeting });
    } catch (e) {
      next(e);
    }
  });

// Estas rutas no se usan por el momento...
  router.post('/', async (req, res, next) => {
    const { name, location, date, duration, description, users } = req.body;
    const user = req.payload;
    try {
      if (!name || !location || !date || !duration || !description || !users) {
        return next(new Error('missing something from body') )
      }
      const meeting = await Meeting.create({ name, location, date, duration, description, users: user._id });
      res.json({ created: meeting });
    } catch (e) {
      next(e);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const user = req.payload;
    const { name, location, date, duration, description, users } = req.body;
    try {
      if (!name || !location || !date || !duration || !description || !users) {
        return next(new Error('missing something from body') )
      }
      const editMeeting = await Meeting.findByIdAndUpdate(
        id,
        { name, location, date, duration, description, users },
        { new: true },
      );
      return res.json({ updated: editMeeting });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = meetingRoutes;
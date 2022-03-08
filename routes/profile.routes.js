const express = require('express');
const User = require('../models/User.model');
// const isLoggedIn = require('../middlewares');

function profileRoutes() {
  const router = express.Router();

  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const profile = await User.findById(id);
      return res.json({ profile: profile });
    } catch (e) {
      next(e);
    }
  });
  
  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, age, gender, image } = req.body;
    try {
      if (!name || !age || !gender || !image ) {
        return next(new Error('missing something from body') )
      }
      const editUser = await Meeting.findByIdAndUpdate(
        id,
        { name, age, gender, image },
        { new: false },
      );
      return res.json({ updated: editUser });
    } catch (e) {
      next(e);
    }
  });

  return router;
}

module.exports = profileRoutes;
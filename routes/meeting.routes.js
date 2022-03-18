const router = require('express').Router();
const Meeting = require('../models/Meeting.model');

router.get('/', async (req, res, next) => {
  try {
    const allmeetings = await Meeting.find({});
    return res.json({ meetings: allmeetings });
  } catch (e) {
    next(e);
  }
});

router.post('/:id/join', async (req, res, next) => {
  const { id } = req.params;
  const user = req.payload;
  try {
    await Meeting.findById(id).then(meeting => {
      // Comprovem que l'usuari no estigui unit ja
      if (!meeting.users.includes(user._id)) {
        meeting.users.push(user);
        meeting.save();
      }
      return res.json({ updated: meeting });
    });
  } catch (e) {
    res.status(401).json({ message: 'Unable to join the meeting' });
  }
});

router.post('/:id/unjoin', async (req, res, next) => {
  const { id } = req.params;
  const user = req.payload;
  try {
    await Meeting.findById(id).then(meeting => {
      // Comprovem que l'usuari estigui unit ja
      var index = meeting.users.indexOf(user._id);
      if (index !== -1) {
        meeting.users.splice(index, 1);
        meeting.save();
      }
      return res.json({ updated: meeting });
    });
  } catch (e) {
    res.status(401).json({ message: 'Unable to join the meeting' });
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const meeting = await Meeting.findById(id);
    return res.json({ meeting: meeting });
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

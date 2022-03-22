const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json('All good in heres');
});

module.exports = router;

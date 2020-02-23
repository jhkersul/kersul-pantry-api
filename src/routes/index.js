import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ index: 'welcome' });
});

module.exports = router;

const {Router} = require('express');
const router = Router();

router.get('/index', (req, res) => {
  const data = {
    name: 'Maxi',
    website: 'maxi.com',
  };
  res.json(data);
});

module.exports = router;

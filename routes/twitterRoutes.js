const router = require('express').Router();
const twitterController = require('../controllers/twitterController');

router.post('/oauth', twitterController.oauth);
router.get('/callback', twitterController.callback);
router.get('/count', twitterController.count);

module.exports = router;
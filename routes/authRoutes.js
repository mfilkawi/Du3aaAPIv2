const router = require('express').Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../utils/jwt');
const Disabled = require('../utils/Disabled');

router.get('/user', Disabled, userController.index);
router.post('/user', userController.new);
router.post('/login', userController.login);

router.post('/verify', authenticateToken, (req, res) => {
    res.json({
        verified: res.locals.verified,
        payload: res.locals.payload
    })
})

module.exports = router;
const router = require('express').Router();
const du3aaController = require('../controllers/du3aaController');
const authenticateToken = require('../utils/jwt');



router.get('/', du3aaController.random);

router.get('/du3aa', du3aaController.index);
router.get('/du3aa/:du3aa_id', du3aaController.view);

router.post('/du3aa', authenticateToken, du3aaController.new);
router.put('/du3aa/:du3aa_id', authenticateToken, du3aaController.update);
router.delete('/du3aa/:du3aa_id', authenticateToken, du3aaController.delete);

module.exports = router;
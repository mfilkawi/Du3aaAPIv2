const router = require('express').Router();
const du3aaController = require('../controllers/du3aaController');
const authenticateToken = require('../utils/jwt');
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile('./routes/help.txt', (err, data) => {
        if (err) { console.log(err) }
        res.setHeader('Content-type', 'application/json');
        res.send(data.toString());
    })
})

router.get('/v2', du3aaController.random);

router.get('/v2/du3aa', du3aaController.index);
router.get('/v2/du3aa/:du3aa_id', du3aaController.view);

router.post('/v2/du3aa', authenticateToken, du3aaController.new);
router.put('/v2/du3aa/:du3aa_id', authenticateToken, du3aaController.update);
router.delete('/v2/du3aa/:du3aa_id', authenticateToken, du3aaController.delete);

module.exports = router;
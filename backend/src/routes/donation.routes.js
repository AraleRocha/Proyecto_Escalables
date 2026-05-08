const { Router } = require('express');
const { getAll, create } = require('../controllers/donation.controller');
const { verifyJWT } = require('../middleware/verifyJWT');

const router = Router();

router.get('/', [verifyJWT],  getAll);
router.post('/', create);

module.exports = router;
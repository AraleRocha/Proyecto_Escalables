const { Router } = require('express');
const { getAll, create, updateStatus } = require('../controllers/volunteer.controller');
const { verifyJWT } = require('../middleware/verifyJWT');

const router = Router();

router.get('/', [verifyJWT], getAll);
router.post('/', create);
router.put('/:id', updateStatus);

module.exports = router;
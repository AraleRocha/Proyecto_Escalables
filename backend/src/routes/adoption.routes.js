const { Router } = require('express');
const { getAll, create, getByUser, updateStatus } = require('../controllers/adoption.controller');
const { verifyJWT } = require('../middleware/verifyJWT');

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.get('/user/:userId', [verifyJWT], getByUser);
router.put('/:id', [verifyJWT], updateStatus);

module.exports = router;
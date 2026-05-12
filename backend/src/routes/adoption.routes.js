const { Router } = require('express');
const { getAll, create, getByUser, updateStatus } = require('../controllers/adoption.controller');
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyAdminRole } = require('../middleware/verifyAdminRole');

const router = Router();

router.get('/', [verifyJWT], getAll);
router.post('/', [verifyJWT], create);
router.get('/user/:userId', [verifyJWT], getByUser);
router.put('/:id', [verifyJWT, verifyAdminRole], updateStatus);

module.exports = router;
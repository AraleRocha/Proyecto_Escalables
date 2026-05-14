const { Router } = require('express');
const { getAll, create, updateStatus, remove } = require('../controllers/volunteer.controller');
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyAdminRole } = require('../middleware/verifyAdminRole');

const router = Router();

router.get('/', [verifyJWT], getAll);
router.post('/', [verifyJWT], create);
router.put('/:id', [verifyJWT, verifyAdminRole], updateStatus);
router.delete('/:id', [verifyJWT], remove);

module.exports = router;
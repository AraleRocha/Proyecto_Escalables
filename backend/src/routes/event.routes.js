const { Router } = require('express');
const { getAll, getById, create, update, remove } = require('../controllers/event.controller');
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyAdminRole } = require('../middleware/verifyAdminRole');

const router = Router();

router.get('/', getAll);
router.get('/:id', [verifyJWT, verifyAdminRole], getById);
router.post('/', [verifyJWT, verifyAdminRole], create);
router.put('/:id', [verifyJWT, verifyAdminRole], update);
router.delete('/:id', [verifyJWT, verifyAdminRole], remove);

module.exports = router;
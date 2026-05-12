const { Router } = require('express');
const { getAll, getById, create, remove } = require('../controllers/cat.controller');
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyAdminRole } = require('../middleware/verifyAdminRole');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', [verifyJWT, verifyAdminRole], create);
router.delete('/:id', [verifyJWT, verifyAdminRole], remove);

module.exports = router;
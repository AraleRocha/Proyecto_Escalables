const { Router } = require('express');
const { getAll, getById, create, remove } = require('../controllers/cat.controller');
const { verifyJWT } = require('../middleware/verifyJWT');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', [verifyJWT],create);
router.delete('/:id', [verifyJWT], remove);

module.exports = router;
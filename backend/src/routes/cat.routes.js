const { Router } = require('express');
const { getAll, getById, create, remove } = require('../controllers/cat.controller');

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.delete('/:id', remove);

module.exports = router;
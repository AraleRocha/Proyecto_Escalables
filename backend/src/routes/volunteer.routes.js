const { Router } = require('express');
const { getAll, create, updateStatus } = require('../controllers/volunteer.controller');

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.put('/:id', updateStatus);

module.exports = router;
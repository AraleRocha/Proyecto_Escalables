const { Router } = require('express');
const { getAll, create, getFirst } = require('../controllers/user.controller');

const router = Router();

router.get('/first', getFirst); 
router.get('/', getAll);
router.post('/', create);

module.exports = router;
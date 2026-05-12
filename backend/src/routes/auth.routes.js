const { Router } = require('express');
const { login, register, update, remove } = require('../controllers/auth.controller');
const { verifyJWT } = require('../middleware/verifyJWT');

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.put('/update/:id', [verifyJWT], update);
router.delete('/delete/:id', [verifyJWT], remove);

module.exports = router;
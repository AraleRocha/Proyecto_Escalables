const { Router } = require('express');
const { getAll, create, getByUser } = require('../controllers/donation.controller');
const { verifyJWT } = require('../middleware/verifyJWT');
const { verifyAdminRole } = require('../middleware/verifyAdminRole');

const router = Router();

router.get('/user/:userId', getByUser);
router.get('/', getAll);
router.post('/', create);

module.exports = router;
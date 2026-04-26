const express = require('express');
const { getTips, getTipById, createTip, getMyTips } = require('../controllers/tipController');
const { protect, authorize, requireApproved } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getTips);
router.get('/:id', getTipById);

// Protected routes (providers and admins)
router.use(protect);

router.get('/my/tips', authorize('provider', 'admin'), getMyTips);
router.post('/', authorize('provider', 'admin'), requireApproved, createTip);

module.exports = router;

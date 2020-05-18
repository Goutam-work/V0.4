const express = require('express');
const router = express.Router();

const uiController = require('../controllers/ui');

router.post('/getSports',uiController.getSports);
router.post('/getAllSports',uiController.getAllSports);
router.post('/setCart',uiController.setCart);

module.exports = router;
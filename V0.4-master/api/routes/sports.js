const express = require('express');
const router = express.Router();

const sportsController = require('../controllers/sportsController');
var Authenticate = require('../../middleware/authenticate');

router.post('/getArena',sportsController.getArena);
router.post('/getCourts',sportsController.getCourts)
router.post('/getSportsArena',sportsController.getSportsArena);
router.post('/getCourtSlots',sportsController.getCourtSlots);

module.exports = router;
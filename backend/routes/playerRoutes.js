const express = require('express');
const playerController = require('../controllers/playerController');
const statsController = require('../controllers/statsController');
const injuryController = require('../controllers/injuryController');
const router = express.Router();


//player routes
router.post('/', playerController.createPlayer);
router.get('/', playerController.getAllPlayers);
router.put('/players/:id', playerController.updatePlayer);
router.delete('/players/:id', playerController.deletePlayer);
router.get('/players/search', playerController.searchPlayer);
router.get('/players/expiring-contracts', playerController.contractExpiryNotification);
router.put('/players/:id/extend-contract', playerController.extendContract);
router.get('/players/export-csv', playerController.exportPlayersCSV);



//player stats routes
router.post('/players-stats', statsController.createPlayerStats);
router.get('/players-stats/:id', statsController.getPlayerStats);
router.put('/players-stats/:id', statsController.updatePlayerStats);
router.delete('/players-stats/:id', statsController.deletePlayerStats);
router.get('/players/:id/performance-analysis', statsController.performanceAnalysis);




//injury routes
router.post('/injuries', injuryController.createInjury);
router.get('/injuries/:playerId', injuryController.getPlayerInjuries);
router.put('/injuries/:id', injuryController.updateInjury);
router.delete('/injuries/:id', injuryController.deleteInjury);
router.get('/players/:playerId/Injury-report', injuryController.injuryReport);




module.exports = router;

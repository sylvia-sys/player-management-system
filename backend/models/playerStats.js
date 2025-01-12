const mongoose = require( 'mongoose');

const playerStatsSchema = new mongoose.Schema({
    goals: Number,
    assists: Number,
    appearances: Number,
    yellowCards: Number,
});

const PlayerStats = mongoose.model('PlayerStats', playerStatsSchema);

module.exports = PlayerStats;
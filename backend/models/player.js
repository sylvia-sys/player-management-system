const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required:true },
    position: {type: String, required:true },
    dateOfBirth: Date,
    contractStart: Date,
    contractEnd: Date,
    perfomanceStats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlayerStats',

    },
    injuries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Injury',

    }],
});

const player = mongoose.model('player', PlayerSchema);

module.exports = player;
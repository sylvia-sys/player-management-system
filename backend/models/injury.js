const mongoose = require('mongoose');

const InjurySchema = new mongoose.Schema({
    injuryType: String,
    dateReported: Date,
    dateReturned: Date,
});

const Injury = mongoose.model('Injury', InjurySchema);
module.exports = Injury;
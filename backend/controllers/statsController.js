const PlayerStats = require('../models/playerStats');

//create new player stats

exports.createPlayerStats = async (req, res) => {
    try{
        const newStats = new PlayerStats(req.body);
        await newStats.save();
        res.status(201).json(newStats);
    }catch (err){
        res.status(400).json({ error: err.message });
    }
};

//get stats for specific player by id
exports.getPlayerStats = async (req, res) => {
    try{
        const stats = await PlayerStats.findById(req.params.id); 
        res.json(stats); 
            
        } catch(err) {
          res.status(404).json({ error: 'Stats not found'});
        }
    

};
//update player stats
exports.updatePlayerStats = async (req,res) => {
    try{
       const updatedStats = await PlayerStats.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedStats);
    }catch (err) {
        res.status(400).json({ error: err.message});
    }
};

//delete player stats
exports.deletePlayerStats = async (req, res) => {
    try {
        await PlayerStats.findByIdAndDelete(req.params.id);
        res.status(200).send('Stats deleted');
    }catch (err) {
        res.status(500).json({ error: err.message });
    }

};
exports.performanceAnalysis = async (req,res) => {
    try{
        const stats = await PlayerStats.findOne({ plyerId: req.params.id});
         
        if(!stats) {
            return res.status(404).json({ message: 'No stats found for this plaayer'});
        }
        const avgGoals = stats.goals / stats.matchesPlayed;
        const avgAssists = stats.assists / stats.matchesPlayed;

        res.json({
            totalGoals: stats.goals,
            totalAssists: stats.assists,
            avgGoalsPerMatch: avgGoals.toFixed(2),
            avgAssistsPerMatch: avgAssists.toFixed(2),
        });
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};
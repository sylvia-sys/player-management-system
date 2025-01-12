const Player = require('../models/player');
const { Parser } = require('json2csv');

//create a new player
exports.createPlayer = async (req,res)=> {
    try{
        const newPlayer = new Player(req.body);
        await newPlayer.save();
        res.status(201).json(newPlayer);
    } catch(err) {
        res.status(400).json ({ error: err.message });
    }
};

//get all players
exports.getAllPlayers = async ( req, res ) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//update a player
exports.updatePlayer = async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPlayer);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

//delete a player
exports.deletePlayer = async (req,res) =>{
    try {
        await Player.findByIdAndDelete(req.params.id);
        res.status(200).send('Player deleted');
    } catch (err){
        res.status(500).json({ error: err.message});
    }
};
//search and filter players
exports.searchPlayer = async (req,res) => {
    try{ 
        const { name, position, contractStatus } = req.query;

        let query = {};

        //filter by name
        if(name) {
            query.name = { $regex: name, $options: 'i'};
        }

        //filter by position
        if(position) {
            query.position = position;
        }

        //filter by contract status
        if(contractStatus) {
            const today = new Date();
            if(contractStatus === 'active') {
                query.contractEnd = { $gte: today};

            }else if (contractStatus === 'expired') {
                query.contractEnd = {$lt: today};
            }
        }
        const players = await Player.find(query);
        res.json(players);
    }catch (err) {
        res.status(500).json({ error: err.message});
    }

    
};

exports.contractExpiryNotification = async (req, res) => {
    try{
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
          

        const players = await Player.find({
            contractEnd: {$gte: today, $lte: nextMonth },
        });

        res.json(players);
    }catch (err) {
        res.status(500).json({ error: err.message});
        }


};
exports.extendContract = async (req,res) =>{
    try{
        const { newEndDate } = req.body;

        if(!newEndDate) {
            return res.status(400).json({ error: 'New contract end date is required'});

        }
        const player = await Player.findByIdAndUpdate(req.params.id,
            { contractEnd: new Date(newEndDate) },
            { new: true } 

        );
        res.json(player);
    }catch (err) {
        res.status(500).json({ error: err.message })
    }
};

exports.exportPlayersCSV = async (req, res ) => {
    try{
        const players = await Player.find().populate('perfomanceStats').populate('injuries');
        const fields = ['name','position','contractStart','contractEnd','perfomanceStats.goals','injuries.type'];
        const json2csv = new Parser({ fields});
        const csv = json2csv.parse(players);

        res.header('Content-Type', 'text/csv');
        res.attachment('players_report.csv');
        res.send(csv);
    }catch (err){
        res.status(500).json({ error: err.message});
    }
}; 
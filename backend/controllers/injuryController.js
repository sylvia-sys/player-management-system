const Injury = require ('../models/injury');

//create a new injury record
exports.createInjury = async (req, res) => {
    try {
        const newInjury = new Injury(req.body);
        await newInjury.save();
        res.status(201).json(newInjury);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//get all injuries for a specific player
exports.getPlayerInjuries = async (req, res) => {
    try {
        const injuries = await Injury.find({ player: req.params.playerId });
        res.json(injuries);
    } catch (err) {
        res.status(404).json({ error: 'Injuries not found' });


    }
};
//update an injury record
exports.updateInjury = async (req,res ) =>{
    try {
        const updatedInjury = await Injury.findByIdAndUpdate (req.params.id, req.body, {new: true });
        res.json(updatedInjury);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//delete an injury record
exports.deleteInjury = async (req,res) => {
try {
    await Injury.findByIdAndDelete(req.params.id);
    res.status(200).send('Injury record deleted');
} catch (err) {
    res.status(500).json({ error: err.message });
}
};
exports.injuryReport = async (req, res) =>{
    try {
        const injuries = await Injury.find({ playerId: req.params.playerId }).sort({ dateReported: -1 });

        if(injuries.length === 0) {
            return res.status(404).json({ message: 'No injuries found for this player'});

        }
        res.json(injuries);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};
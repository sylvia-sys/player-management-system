const express = require('express');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/playerRoutes');
const dotenv = require('dotenv');

//Load environment variables
dotenv.config();
console.log(process.env.PORT);       // Should print 5000
console.log(process.env.MONGO_URI);  // Should print mongodb://localhost:27017/playerdb


const app = express();



//Middleware
app.use(express.json());
app.use('/', playerRoutes);
app.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    next();
});


//connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    
}).then (() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


//simple route
app.get('/', (req, res) => {
    res.send("Player Management System API");
});

const PORT  = process.env.PORT || 5000;


app.listen(PORT,() => {
    console.log(`Server running on http://localhost: ${PORT}`);

});


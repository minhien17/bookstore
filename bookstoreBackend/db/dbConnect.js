const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect(){
    mongoose
    .connect(process.env.URL)
    .then(()=>{
        console.log('Successfully connected to MongoDB Atlas!')
    })
    .catch((error) => {console.error(error)})
}
module.exports = dbConnect;
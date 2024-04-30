const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'})

const conectarDb = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.info("DB conected");
    }catch(error){
        console.log(error);
        process.exit(1);        
    }
}

module.exports = conectarDb;
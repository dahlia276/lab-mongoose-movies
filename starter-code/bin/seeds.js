const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.model');
const DB_NAME = 'celebrity-project';
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebreties = [
    {
        name: "micheal doglas",
        occupation: "actor" ,
        catchPhrase: "here we go again"
    },
    {
        name: "beyonce",
        occupation: "singer" ,
        catchPhrase: "put a ring on it"
    },
    {
        name: "arnold",
        occupation: "actor" ,
        catchPhrase: "ill be back"
    }

]

Celebrity.create(celebreties)
.then(celebretiesFromDB => {
    console.log(`${celebretiesFromDB.length} celebrity created`)
    mongoose.connection.close();
})
.catch(err => console.log(`an error has occured ${err}`))
const express = require('express')
const {connectToDb, getDb} = require('./db')

const PORT = 3000;

const app = express();

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening on port ${PORT}`);
            db = getDb();
        })
    } else {
        console.log(`DB error ${err}`)
    }
})

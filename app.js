const express = require('express')
const mongoose = require('mongoose')
const Movie = require('./models/movie')

const PORT = 3000;
const URL = "mongodb://127.0.0.1:27017/moviebox"

mongoose.set('strictQuery', false)

const app = express();
app.use(express.json())

mongoose.connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`))

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`App is running on port ${PORT}`)
    }
})

const handleError = (res, error) => {
    res.status(500).json({
        error
    })
}

app.get('/movies', (req, res) => {
    Movie.find()
        .sort({
            title: 1
        })
        .then((movies) => {
            res.status(200)
                .json(movies)
        })
        .catch(() => handleError(res, "Error"))
})

app.get('/movies/:id', (req, res) => {
    Movie
        .findById(req.params.id)
        .then((movie) => {
            res.status(200)
                .json(movie)
        })
        .catch(() => handleError(res, "Error"))
})

app.delete('/movies/:id', (req, res) => {
        Movie
            .findByIdAndDelete(req.params.id)
            .then((result) => {
                res.status(200)
                    .json(result)
            })
            .catch(() => handleError(res, "Error"))
})

app.post('/movies', (req, res) => {
    const movie = new Movie(req.body);

    movie
        .save()
        .then((result) => {
            res.status(201)
                .json(result)
        })
        .catch(() => handleError(res, "Error POST"))
});

app.patch('/movies/:id', (req, res) => {
    Movie
        .findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.status(200)
                .json(result)
        })
        .catch(() => handleError(res, "Error PATCH"))
})
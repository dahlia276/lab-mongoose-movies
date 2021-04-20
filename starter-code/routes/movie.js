const express = require("express");
const router = express.Router();
const Movie = require("../models/movies.model");

router.get("/movies/create", (req,res) => {
  res.render("celebrities/movie-create");
});

router.post('/movies/create', async (req, res) => {
  const { title, genre,  plot  } = req.body;
  await Movie.create({
    title,
    genre,
    plot 
  });
  res.redirect('/celebrities')
});


module.exports = router;

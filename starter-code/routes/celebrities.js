const express = require("express");
const router = express.Router();
const Celebrity = require("../models/celebrity.model");
const moviesModel = require("../models/movies.model");

router.get("/celebrities", async(req,res) => {
   try {
    const celebritiesFromDB = await Celebrity.find();
    res.render("celebrities/index", {celebritiesFromDB});
   } catch(e) {
       res.render("error")
       console.log(`An error occured ${e}`);
   }
})


router.get("/celebrities/create", async(req,res) => {
    const allMovies = await moviesModel.find();
    res.render("celebrities/new", {allMovies})
})

router.post("/celebrities/create", async(req,res) => {
  try{
    const {name, occupation, catchPhrase, movie} = req.body;
    await Celebrity.create({name, occupation, catchPhrase, movie});
    res.redirect("/celebrities");
  }  catch(e) {
    res.redirect("/celebrities")
  }
  });

  router.post('/celebrities/:celebId/delete', async (req, res, next) => {
    const celebId = req.params.celebId;
    console.log('deleting', celebId);
    await Celebrity.findByIdAndRemove(celebId)
    res.redirect("/celebrities")
  });

  router.get("/celebrities/:celebId", async (req,res) => {
    try{
      const celebrity = await Celebrity.findById(req.params.celebId).populate('movie')
      res.render("celebrities/show", {celebrity})
    }  catch(e) {
      res.render("error")
      console.log(`An error occured ${e}`);
    }
  });

  module.exports = router;

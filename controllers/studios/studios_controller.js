const studioModel = require("../../models/studios/studios");

const controller = {
  createStudio: async (req, res) => {
    // create the user and store in db
    //using mongoose lib auto creat and store in dbs
    try {
      await studioModel.create({
        name: req.body.name,
        img: req.body.img,
        description: req.body.description, //put in the hash, not the plan text pass word
        // createdBy: req.body.createdBy,
        // reviews: req.body.reviews
      });
    } catch (err) {
      console.log(err);
      res.send("failed to create user");
      return;
    }
    res.send("studio created");
  },

  showListOfStudios: async (req, res) => {
    const studios = await studioModel.find({});
    console.log(studios);
    res.render("studios/index", { studios });
  },

  //the  studio_id would be in the index(showing list of studios, in the ahref link)
  //"/studios/studio_id"
  getStudio: async (req, res) => {
    const studio = await studioModel.findById(req.params.studio_id);
    console.log(studio);
    console.log(studio.address);
    //const ratings = await productRatingModel.find({product_id: req.params.product_id})

    // todo: aggregation of ratings

    res.render("studios/show", {
      studio,
      tab: "info"
    });
  },

 
};

module.exports = controller;

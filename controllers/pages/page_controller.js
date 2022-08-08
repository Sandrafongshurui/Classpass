const controller = {
  showHome: (req, res) => {
      res.render("pages/home");
    }


  // showListOfStudios: (req, res) => {
  //     res.render('pages/listofstudios')
  // },

  // //different tabs is here
  // showProfile: (req, res) => {
  //     res.render('pages/profile')
  // },

  // //info and class tab is here
  // showStudio: (req, res) => {
  //     res.render('pages/studio')
  // },
};

module.exports = controller;

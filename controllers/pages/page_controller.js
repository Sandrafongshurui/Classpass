const controller = {

   

  
    showHome: (req, res) => {
        console.log(req.app.locals.loginError)
        //if theres no login error set to null
        if(!req.app.locals.loginError){
          req.app.locals.loginError = null;
        }

        //login error, render the pages to modal appear on load to show eeor to user
        if(req.app.locals.loginError){
            console.log("error")
            //set to null so that if user goes to another page, modal wont appear onload
            req.app.locals.loginError = null
            res.render('pages/home', {myModalId: "myLoginModal-error", formAction: req.path});
          }else{//no error modal dont appear on load
            console.log("noo-error")
            res.render('pages/home', {myModalId: "myLoginModal", formAction: req.path});
          }
    },

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
}

module.exports = controller
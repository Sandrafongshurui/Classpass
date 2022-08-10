module.exports = {
    setRedirectPath: (req, res, next) => {
        req.session.redirect = req.path

        next()
    },    
    setLocalsRedirectPath:(req, res, next) => {
        //incase user goes straight to login page without a previous path      
        res.locals.redirect = "/"
          if (req.session.redirect) {
              res.locals.redirect= req.session.redirect
          }
  
          next()
      },
}
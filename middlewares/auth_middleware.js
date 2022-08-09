module.exports = {
//check theres user in the session, in the backend
    isAuthenticated: (req, res, next) => {
        if (!req.session.user) {
            console.log("not autheticated")
            //save the redirect so tha tafter login will go back to page
            res.redirect('/login')
            
            return
        }
        console.log(req.session.user)
        console.log("autheticated")
        next()
    },
    setAuthUserVar: (req, res, next) => {
        res.locals.authUser = null//res.locals make it availble to all the templates
        res.locals.redirect = "/"
        //if got session user, set the null = the user name
        //give the authUser which is made avil to this request the new user name, cos its been autheticated , means login 
        if (req.session.username) {
            res.locals.authUser = req.session.username//this session is saved in login
        }
        if (req.session.redirect){
            res.locals.redirect = req.session.redirect
        }

        next()
    },

}
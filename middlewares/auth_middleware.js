module.exports = {
//check theres user in the session, in the backend
    isAuthenticated: (req, res, next) => {
        if (!req.session.user) {
            res.redirect('/login')
            return
        }
        
        next()
    },

    setAuthUserVar: (req, res, next) => {
        res.locals.authUser = null//res.locals make it availble to all the templates
        //if got session user, set the null = the user name
        //give the authUser which is made avil to this request the new user name, cos its been autheticated , means login 
        if (req.session.user) {
            res.locals.authUser = req.session.user
        }

        next()
    }

}
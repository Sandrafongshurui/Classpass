module.exports = {
    setRedirectPath: (req, res, next) => {
        req.session.redirect = req.path

        next()
    }
}
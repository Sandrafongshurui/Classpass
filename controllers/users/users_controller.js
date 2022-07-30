const bcrypt = require('bcrypt')
const userModel = require('../../models/users/users')
const userValidators = require('../validators/users')

const controller = {

    showRegistrationForm: (req, res) => {
        res.render('pages/register')
    },

    register: async (req, res) => {
        // validations
        const validationResults = userValidators.registerValidator.validate(req.body)

        if (validationResults.error) {
            res.send(validationResults.error)
            console.log(validationResults.error)
            return
        }

        const validatedResults = validationResults.value

        // ensure that password and confirm_password matches, or can use joi validat for passwords to match
        if (validatedResults.password !== validatedResults.confirm_password) {
            res.send('passwords do not match')
            return
        }

        // hash the password
        const hash = await bcrypt.hash(validatedResults.password, 10)

        // create the user and store in db
        //using mongoose lib auto creat and store in dbs
        try {
            await userModel.create({
                name: validatedResults.fullname,
                email: validatedResults.email,
                hash: hash,//put in the hash, not the plan text pass word
            })
        } catch (err) {
            console.log(err)
            res.send('failed to create user')
            return
        }

        res.redirect('/users/login')
    },

    showLoginForm: (req, res) => {
        res.render('pages/login')
    },
    //actual log in
    //type in username and pw, req sent to server, server create session, session id returned
    //browser will store the cookie 
    ///all subsequent request will contain the cookies

    login: async (req, res) => {
        // validations here ...
        const validatedResults = req.body

        let user = null

        // get user with email from DB, user model is the mongoose lib to interact with db
        try {
            user = await userModel.findOne({ email: validatedResults.email })
        } catch (err) {
            res.send('failed to get user')
            return
        }

        // use bcrypt to compare the given password with the one store as has in DB
        console.log(validatedResults.password)
        console.log(user.hash)

        const pwMatches = await bcrypt.compare(validatedResults.password, user.hash)

        if (!pwMatches) {
            res.send('incorrect password')
            return
        }

        // log the user in by creating a session
        //guard against sessions fixations
        req.session.regenerate(function (err) {
            if (err) {
                res.send('unable to regenerate session')
                return
            }

            // store user information in session, typically a user id
            req.session.user = user.email

            // backend send -> s%3A2v3yqeOSO-bgFCRHfk3KeVF90M84M0_a.IV4EbakG06Zakhhe3p1GR9FD%2FiFpFv9tDxYKgYwx6Qo
            // front saves as cookie
            // subsequent req. to backend -> included the cookie in request: s%3A2v3yqeOSO-bgFCRHfk3KeVF90M84M0_a.IV4EbakG06Zakhhe3p1GR9FD%2FiFpFv9tDxYKgYwx6Qo

            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err) {
                if (err) {
                    return next(err)
                }

                res.redirect('/users/dashboard')
            })
        })
    },
    //oncce cookies is stores, it will persist
    //subsequest request will conatin the cookies
    showDashboard: (rw, res) => {

        //verify that the session user exits, this is put in a aseparte middleware.js and inserted in teh server.js
        // if(!req.session.user){
        //     res.send("you are not autheticated")
        //     return
        // }
        res.send('welcome to your protected dashboard')
    },

    showProfile: async (req, res) => {
        //verify that the session user exits, this is put in a aseparte middleware.js and inserted in teh server.js
        // if(!req.session.user){
        //     res.send("you are not autheticated")
        //     return
        // }

        // get user data from db using session user
        let user = null

        try {
            user = await userModel.findOne({ email: req.session.user })//use mongoose library to find
        } catch (err) {
            console.log(err)
            res.redirect('/users/login')
            return
        }

        res.render('users/profile', { user })
    },
    
    logout: async (req, res) => {
        //invalidate the session, not clear, means theres still a session use no user saved inside
        req.session.user = null
        //so the currents session is invalid
        req.session.save(function (err) {
            if (err) {
                res.redirect('/users/login')
                return
            }

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) {
                    res.redirect('/users/login')
                    return
                }
                
                res.redirect('/')
            })
        })
    }

}

module.exports = controller
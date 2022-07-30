require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()
const port = 3000
const connStr = "mongodb://172.17.21.14:27017"

const pageController = require('./controllers/pages/page_controller')
const studiosController = require('./controllers/studios/studios_controller')
const userController = require('./controllers/users/users_controller')
// const lessonsRatingController = require('./controllers/product_ratings/product_rating_controller')
// const authMiddleware = require('./middlewares/auth_middleware')// middleware for the authentication -----> cookies session

// Set view engine
app.set('view engine', 'ejs')

// Apply middlewares, this is doing it globally, but no need on each one
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
//this is for cookies(browser) sessions(server), store the id of the session, so that when user returns to same website(same request to server),
// web browser returns that data to the web server in the form of a cookie. 
// This is when your browser will send it back to the server to recall data from your previous sessions. 
//check that it has cookies and let it log in atumatically
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false }
}))

// //studios routes
//shows the home page
app.get('/', pageController.showHome)
// //shows studios list
app.get('/studios', studiosController.showListOfStudios)
// //shows studio's classes
//app.get('/studios/:studio_id/classes', pageController.showStudios)

// //login Routes
// //show login modal at home page
app.get('/login', userController.showLoginForm)
app.post('/login', userController.login)
app.delete('/logout', userController.logout)


//signup routes
//show sign up modal
app.get('/signup', userController.showRegistrationForm)
app.post('/signup', userController.signUp)


//profile routes
// app.get('/users/:user_id/upcoming', userController.showUpcomingTab)
// app.post('/users/:user_id/profile', userController.deleteLesson)
// app.get('/users/:user_id/profile', userController.showProfileTab)
// app.post('/users/:user_id/profile', userController.saveProfileTab)
// app.get('/users/:user_id/history', userController.showHistoryTab)
// app.post('/users/:user_id/history', userController.createReview)
// app.get('/users/:user_id/shoppingcart', userController.showShoppingCartTab)


// Reviews Routes
// app.post('/studios/:studio_id/reviews', productRatingController.createRating)

// //apply the middleware in the middle, for each rout that needs it, res.locals would only work for this request
// app.get('/users/dashboard', authMiddleware.isAuthenticated, userController.showDashboard)
// app.get('/users/profile', authMiddleware.isAuthenticated, userController.showProfile)

app.post('/studios', studiosController.createStudio)

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: 'classpass'})
    } catch(err) {
        console.log(`Failed to connect to DB`)
        process.exit(1)
    }

    console.log(`Example app listening on port ${port}`)
})
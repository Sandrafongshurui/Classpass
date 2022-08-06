require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

//use this tpo fake th form(get post) to use as a put, cos the form will go to middleware, and sees _method and bring it to this method overi
//include the method-override package
const methodOverride = require('method-override');
const app = express()
const port = 3000
// const connStr = "mongodb://172.18.175.7:27017"
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@classpass.by0wzf8.mongodb.net/test`


const pageController = require('./controllers/pages/page_controller')
const studiosController = require('./controllers/studios/studios_controller')
const userController = require('./controllers/users/users_controller')
const lessonsController = require('./controllers/lessons/lessons_controller')
const reviewsController = require('./controllers/reviews/reviews_controller')
const validationMiddleware = require('./middlewares/validation_middleware.js')
const authMiddleware = require('./middlewares/auth_middleware')// middleware for the authentication, to check if theres a session

// Set view engine
app.set('view engine', 'ejs')

// Apply middlewares, this is doing it globally, but no need on each one
//use methodOverride.  We'll be adding a query parameter to our edit form named _method
app.use(methodOverride('_method'));
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
    cookie: { secure: false, httpOnly: false,  maxAge: 24 * 60 * 60 * 1000 }// 24 hours  }
}))
app.use(authMiddleware.setAuthUserVar)

// //studios routes
//shows the home page
app.get('/', pageController.showHome)
// //shows studios list
app.get('/studios', studiosController.showListOfStudios)
app.get('/studios/:studio_id', studiosController.getStudio)
// //shows studio's classes, need authetication then can
app.get('/studios/:studio_id/lessons', lessonsController.getLessons)


// //login Routes
// //show login modal at home page
app.get('/login', userController.showLoginForm)
app.post('/login', userController.login)
app.delete('/logout', userController.logout)


//signup routes
//show sign up modal
app.get('/signup', userController.showRegistrationForm)
app.post('/signup', userController.signUp)


//users routes
app.get('/users/history', authMiddleware.isAuthenticated, userController.showHistory)
//app.get('/users/:user_id/history', userController.showHistory)
app.get('/users/history/:lesson_id/review', authMiddleware.isAuthenticated, reviewsController.showReviewForm)
// app.get('/users/:user_id/history/:lesson_id/review', reviewsController.showReviewForm)
app.post('/users/history/:lesson_id/review', validationMiddleware.reviewIsValidated, reviewsController.createReview)
// app.post('/users/:user_id/history/:lesson_id/review', validationMiddleware.reviewIsValidated, reviewsController.createReview)
app.get('/users/shoppingcart/:lesson_id', authMiddleware.isAuthenticated, userController.showShoppingCartTab)
// app.get('/users/:user_id/shoppingcart/:lesson_id', userController.showShoppingCartTab)
app.get('/users/shoppingcart/:lesson_id/message', authMiddleware.isAuthenticated, userController.showThankYouMessage)
// app.get('/users/:user_id/shoppingcart/:lesson_id/message', userController.showThankYouMessage)
app.get('/users/upcoming',authMiddleware.isAuthenticated, userController.showUpcomingLessons)
// app.get('/users/:user_id/upcoming', userController.showUpcomingLessons)
app.delete('/users/upcoming/:lesson_id/cancel', authMiddleware.isAuthenticated, userController.deleteUpcomingLesson)
// app.delete('/users/:user_id/upcoming/:lesson_id/cancel', userController.deleteUpcomingLesson)


// Reviews Routes
// app.post('/studios/:studio_id/reviews', authMiddleware.isAuthenticated, reviewsController.createReview)
// app.post('/studios/:studio_id/classes/:class_id/reviews', authMiddleware.isAuthenticated, reviewsController.createReview)
// app.post('/studios/:studio_id/classes/:class_id/reviews', authMiddleware.isAuthenticated, reviewsController.createReview)

// //apply the middleware in the middle, for each rout that needs it, res.locals would only work for this request
// app.get('/users/dashboard', authMiddleware.isAuthenticated, userController.showDashboard)
// app.get('/users/profile', authMiddleware.isAuthenticated, userController.showProfile)

//for sandra
app.post('/studios', studiosController.createStudio)
app.post('/lessons', lessonsController.createLesson)
//app.get('/editLessons', lessonsController.editDateOfLesson)
//app.get('/addStudents/:user_id', lessonsController.addStudents)

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: 'classpass'})
    } catch(err) {
        console.log(`Failed to connect to DB`)
        process.exit(1)
    }

    console.log(`Example app listening on port ${port}`)
    
})
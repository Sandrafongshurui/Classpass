require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

//use this t0o fake th form(get post) to use as a put, cos the form will go to middleware, and sees _method and bring it to this method overi
//include the method-override package
const methodOverride = require('method-override');
const app = express()
const port = process.env.PORT || 3000
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@classpass.by0wzf8.mongodb.net/test`

//controllers
const helperController = require('./controllers/helper/helper_controller')
const pageController = require('./controllers/pages/page_controller')
const studiosController = require('./controllers/studios/studios_controller')
const userController = require('./controllers/users/users_controller')
const lessonsController = require('./controllers/lessons/lessons_controller')
const reviewsController = require('./controllers/reviews/reviews_controller')


//middlewares
const authMiddleware = require('./middlewares/auth_middleware')// middleware for the authentication, to check if theres a session
const redirectMiddleware = require('./middlewares/redirect_middleware')//middle ware for dircting user back to the page before log in
const validationMiddleware = require('./middlewares/validation_middleware.js')

// Set view engine
app.set('view engine', 'ejs')

// Apply middlewares, this is doing it globally, but no need on each one
//use methodOverride.  We'll be adding a query parameter to our edit form named _method
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false,  maxAge: 3600000 }// 1 hr  
}))
app.use(authMiddleware.setAuthUserVar)
app.use(redirectMiddleware.setLocalsRedirectPath)//so that the redirect path can be used for the login pages


//home
app.get('/', redirectMiddleware.setRedirectPath, pageController.showHome)

//studios routes
app.get('/studios', redirectMiddleware.setRedirectPath, studiosController.showListOfStudios)
app.post('/studios', studiosController.showListOfStudios)
app.get('/studios/:studio_id',redirectMiddleware.setRedirectPath, studiosController.getStudio)
app.get('/studios/:studio_id/lessons', redirectMiddleware.setRedirectPath, lessonsController.getLessons)
app.post('/studios/:studio_id/lessons', lessonsController.getLessons)


//login Routes
app.get('/login', userController.showLoginForm)
app.post('/login', userController.login)
app.get('/logout', authMiddleware.isAuthenticated, userController.logout)


//signup routes
app.get('/signup', userController.showSignUpForm)
app.post('/signup', userController.signUp)


//users routes
app.get('/users/history', authMiddleware.isAuthenticated, userController.showHistory)

app.get('/users/profile', authMiddleware.isAuthenticated, userController.showProfile)
app.post('/users/profile', authMiddleware.isAuthenticated, userController.showProfile)
app.put('/users/profile', authMiddleware.isAuthenticated, userController.showProfile)

app.get('/users/history/:lesson_id/review', authMiddleware.isAuthenticated, reviewsController.showReviewForm)
app.post('/users/history/:lesson_id/review', authMiddleware.isAuthenticated, validationMiddleware.reviewIsValidated, reviewsController.createReview)
app.get('/users/shoppingcart/:lesson_id', authMiddleware.isAuthenticated, userController.showShoppingCartTab)
app.get('/users/shoppingcart/:lesson_id/message', authMiddleware.isAuthenticated, userController.confirmBooking)
app.get('/users/shoppingcart', authMiddleware.isAuthenticated, userController.showEmptyCart)
app.get('/users/upcoming',authMiddleware.isAuthenticated, userController.showUpcomingLessons)
app.delete('/users/upcoming/:lesson_id/cancel', authMiddleware.isAuthenticated, userController.deleteUpcomingLesson)


//for sandra
// app.post('/studios', studiosController.createStudio)
// app.post('/lessons', lessonsController.createLesson)
// app.get('/editLessons', helperController.editDateOfLesson)
// app.get('/editAmenities', helperController.editStudiosAmenities)
// app.get('/addStudents/:user_id', helperController.addStudents)
// app.get('/editField', helperController.editField)

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: 'classpass'})
    } catch(err) {
        console.log(`Failed to connect to DB`)
        process.exit(1)
    }

    console.log(`Example app listening on port ${port}`)
    
})
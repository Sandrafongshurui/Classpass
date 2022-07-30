require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()
const port = 3000
const connStr = "mongodb://localhost:27017"

const pageController = require('./controllers/pages/page_controller')
const productController = require('./controllers/products/products_controller')
const userController = require('./controllers/users/users_controller')
const productRatingController = require('./controllers/product_ratings/product_rating_controller')
const authMiddleware = require('./middlewares/auth_middleware')// middleware for the authentication -----> cookies session

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

app.get('/', pageController.showHome)
app.get('/contact', pageController.showContact)

app.post('/products', productController.createProduct)
app.get('/products', productController.listProducts)
app.get('/products/:product_id', productController.getProduct)

// Users Routes
app.get('/users/register', userController.showRegistrationForm)
app.post('/users/register', userController.register)
app.get('/users/login', userController.showLoginForm)
app.post('/users/login', userController.login)

// Rating Routes
app.post('/products/:product_id/ratings', authMiddleware.isAuthenticated, productRatingController.createRating)


//apply the middleware in the middle, for each rout that needs it, res.locals would only work for this request
app.get('/users/dashboard', authMiddleware.isAuthenticated, userController.showDashboard)
app.get('/users/profile', authMiddleware.isAuthenticated, userController.showProfile)

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: 'biscoff_bakery'})
    } catch(err) {
        console.log(`Failed to connect to DB`)
        process.exit(1)
    }

    console.log(`Example app listening on port ${port}`)
})
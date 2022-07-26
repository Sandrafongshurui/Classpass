require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const app = express()
const port = 3000
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.d73ns.mongodb.net/?retryWrites=true&w=majority`

const pageController = require('./controllers/pages/page_controller')
const productController = require('./controllers/products/products_controller')
const userController = require('./controllers/users/users_controller')

// Set view engine
app.set('view engine', 'ejs')

// Apply middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
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

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: 'biscoff_bakery'})
    } catch(err) {
        console.log(`Failed to connect to DB`)
        process.exit(1)
    }

    console.log(`Example app listening on port ${port}`)
})
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.d73ns.mongodb.net/?retryWrites=true&w=majority`

const pageController = require('./controllers/pages/page_controller')
const productController = require('./controllers/products/products_controller')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', pageController.showHome)
app.get('/contact', pageController.showContact)

app.post('/products', productController.createProduct)
app.get('/products', productController.listProducts)
app.get('/products/:product_id', productController.getProduct)

app.listen(port, async () => {
    try {
        await mongoose.connect(connStr, { dbName: 'biscoff_bakery'})
    } catch(err) {
        console.log(`Failed to connect to DB`)
        process.exit(1)
    }

    console.log(`Example app listening on port ${port}`)
})
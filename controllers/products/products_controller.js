const productModel = require('../../models/products/products')
const productValidators = require('../validators/products')

const controller = {

    createProduct: async (req, res) => {
        // validations
        const validationResults = productValidators.createProductValidator.validate(req.body)

        if (validationResults.error) {
            res.send('validation error occurred')
            return
        }
        //no error continue, validation using mongoose lib and its funtions
        const validatedResults = validationResults.value
        //try to create with the passed validations
        try {
            await productModel.create(validatedResults)//returns a promise so need the await
        } catch (err) {
            console.log(err)
        }

        // todo: redirect to products page
        res.send('asd')
    },

    listProducts: async (req, res) => {
        const products = await productModel.find().exec()

        res.render('products/index', { products })
    },

    getProduct: async (req, res) => {
        const product = await productModel.findById(req.params.product_id)

        res.render('products/show', { product })
    }

}

module.exports = controller
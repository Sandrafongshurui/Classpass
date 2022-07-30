const productRatingModel = require('../../models/ratings/ratings')
const userModel = require('../../models/users/users')

module.exports = {

    createRating: async (req, res) => {
        // validation

        const productID = req.params.product_id
        const validatedValues = req.body

        // get user from DB
        let user = null

        //only allow users to submit reviews
        //is this to check authorisation? means authorisation can be a middlarew i write myslef also?
        try {
            user = await userModel.findOne({email: req.session.user})
        } catch(err) {
            res.redirect('/users/login')
            return
        }

        // create the ratings
        try {
            await productRatingModel.create({
                user_id: user._id,
                product_id: productID,
                rating: validatedValues.rating
            })
        } catch(err) {
            res.redirect('/users/login')
            return
        }

        res.redirect('/products')
    }

}
module.exports = {
    //check theres user in the session, in the backend
        isCustomer: (req, res, next) => {
            let user = null
            user = await userModel.findOne({ _id: req.session.user});
             
            if(user.role !== "Customer"){
                res.send("only customers can post a review")
            } 
            next()
        },
    }
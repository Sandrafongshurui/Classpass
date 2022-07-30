const studioModel = require('../../models/studios/studios')

const controller = {

    createStudio: async (req, res) => {
          // create the user and store in db
        //using mongoose lib auto creat and store in dbs
        try {
            await studioModel.create({
                name: req.body.name,
                description: req.body.description,//put in the hash, not the plan text pass word      
                createdBy: req.body.name.createdBy
            })
        } catch (err) {
            console.log(err)
            res.send('failed to create user')
            return
        }
        res.send('studio created')
    },

    showListOfStudios: async (req, res) => {
        const studios = await studioModel.find().exec()
        console.log(studios)
        res.render('studios/index', {studios})       
    }

}

module.exports = controller
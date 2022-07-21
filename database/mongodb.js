const mongoose = require('mongoose')

const connStr = "mongodb+srv://mcspicy:ILoveMcspicy@cluster0.d73ns.mongodb.net/?retryWrites=true&w=majority"
const DB = mongoose.connect(connStr, { dbName: 'biscoff_bakery'})

module.exports = DB

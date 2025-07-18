const mongoose = require('mongoose')
const Schema = mongoose.Schema
const doctorSchema = new Schema({
    name:{type: String, required: true},
    speciality:{type: String,required:true}
})

const Doctor = mongoose.model('Doctor',doctorSchema)

module.exports = Doctor
const { Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    todos: [{type: Types.ObjectId, ref: 'Todo'}],
    nickname: [{type: String, required: false}],
    birthday: [{type: Date, required: false}],
    FIO: [{type: String, required: false}],
    address: [{type: String, required: false}],
    city: [{type: String, required: false}],
    isAdmin: [{type: Boolean, default: true}],
    image: [{type: String, required: false}],
    phone: [{type: String, required: false}]
    

},
{ timestamps: true })

module.exports = model('User', userSchema)
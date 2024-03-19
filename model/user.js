const { default: mongoose } = require('mongoose');
const db = require('./db');

const userChema = new db.mongoose.Schema(
    {
        username: { type: String },
        email: { type: String },
        phone: { type: Number },
        password: { type: String },
        role:{type:String},
        cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productModel' }],
        wishlist:[{type: mongoose.Schema.Types.ObjectId, ref: 'productModel'}],
        address:[{type:String}],
    }, {
    collection: 'users'
}
)

let userModel = db.mongoose.model('userModel', userChema);

module.exports = { userModel }
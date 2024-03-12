const { default: mongoose } = require('mongoose');
const db = require('./db');

const oderSchema = new db.mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        total: { type: Number },
        oderDate: { type: Date },
        status: { type: String },
    }
)

let oderModel = db.mongoose.model('oderModel', oderSchema);
module.exports = { oderModel }
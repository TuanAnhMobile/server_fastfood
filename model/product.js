const db = require('./db');

const productSchame = new db.mongoose.Schema(
    {
        productname: { type: String },
        description: { type: String },
        price: { type: Number },
        imageproduct: { type: String },
        // category:{type:db.mongoose.Schema.Types.ObjectId,ref:'categoryModel'}
    }, {
    collection: "products",
}
);

const categoryChema = new db.mongoose.Schema(
    {
        category: { type: String },
    },
    {
        collection: "categories",
    }
);

let categoryModel = db.mongoose.model('categoryModel',categoryChema);
let prodcuctModel = db.mongoose.model('productModel', productSchame);
module.exports = { prodcuctModel, categoryModel }
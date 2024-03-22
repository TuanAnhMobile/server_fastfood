const myMd = require('../model/product');

exports.addProduct = async(req,res,next) => {
 try {
    const {productname,description,price,imageproduct} = req.body;

    const newProduct = new myMd.prodcuctModel({
        productname,
        description,
        price,
        imageproduct,
    });

    await newProduct.save();

    console.log("Sản phẩm mới : "+newProduct);
    res.status(201).json({ message: 'Product added successfully' });
 } catch (error) {
    console.log("Đã có lỗi xảy ra khi thêm sản phẩm mới : "+error);
 }
}

exports.getProduct = async(req,res,next) => {
    try {
        const products = await myMd.prodcuctModel.find();
        console.log("Danh sách sản phẩm : " +products);
        res.status(200).json(products);
    } catch (error) {
        console.log("Đã có lỗi khi lấy danh sách sản phẩm : " +error);
    }
}

exports.editProduct = async(req,res,next) => {
    
}
exports.findProduct = async(req,res) => {
    try {
        const productname = req.body.productname;
        const searchCondition = {};
        if(productname){
            searchCondition.productname = productname;
        }

        const product = await myMd.prodcuctModel.find(searchCondition);
        res.status(200).json(product);
        console.log("Kết quả tìm kiếm : " +product);
    } catch (error) {
        console.log("Đã có lỗi khi xử lý yêu cầu tìm kiếm của bạn " ,error);
    }
};

exports.getInfoProdut = async (req,res) => {
    const {productId} = req.body;

    const product = await myMd.prodcuctModel.findById(productId);
    if(!product){
        console.log("Product not found");
    }
    console.log("Thông tin sản phẩm : "+product);
    res.status(200).json(product);
}


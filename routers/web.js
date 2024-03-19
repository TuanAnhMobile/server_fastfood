const express = require('express');
const router = express.Router();
const userApi = require('../api/user.api');
const productAppi = require('../api/product.api');
const orderApi = require('../api/order.api');
const productController = require('../controller/product.controller');
const userController = require('../controller/user.controller');
const oderCotroller = require('../controller/oder.controller');
const multer = require('multer');
var upload = multer({dest:'../upload'});

// const upload = multer({
//     storage:multer.diskStorage({
//         destination:(req,file,cb) => {
//             cb(null,'upload/');
//         },
//         filename:(req,file,cb) => {
//             const uniqueSuffix = Date.now() + '-' + uuid.v4();
//             cb(null,uniqueSuffix + '-' + file.originalname);
//         },
//     })
// });

const initRouter = (app) => {
    //userApi.
    router.post('/api/register',userApi.register);
    router.post('/api/login',userApi.login);
    router.get('/api/getInfo',userApi.getInfomation);
    router.post('/addAddress',userApi.addAddress);
    router.get('/getAddress',userApi.getAddress);
    



    //user routes
    router.get('/home',userController.handelHello);
    router.post('/api/addproducts',productAppi.addProduct);
    router.post('/register',userController.register);
    router.get('/register',userController.register);
    router.get('/',userController.login);
    router.post('/',userController.login);
    router.get('/listU',userController.getAllUser);
    router.post('/deleteU/:idU',userController.deleteUser);



    //controller product
    router.get('/listproducts',productController.getProduct);
    router.post('/addProduct',upload.single('imageproduct'),productController.addProduct);
    router.post('/deleteproduct/:idP',productController.deleteProduct);
    router.post('/addCat',productController.addCat);
    router.get('/findProduct',productController.findProduct);


    //product api
    router.get('/findProduct',productAppi.findProduct);
    

    //oder
    router.post('/addOrder',oderCotroller.addOder);
    router.get('/getOrder',oderCotroller.getOder);
    router.get('/getPreparing',oderCotroller.getPreparingGoods);
    router.get('/getAreDelivering',oderCotroller.getAreDelivering);
    router.get('/getDelived',oderCotroller.getDelived);
    router.post('/updateStatus/:orderId',oderCotroller.updateStatus);
    router.post('/deleteOrder/:idOrder',oderCotroller.deleteOrder);
    router.post('/api/addOrder',orderApi.addOder);
    return app.use('/',router);
}

module.exports = initRouter;
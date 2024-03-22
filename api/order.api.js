const myMd = require('../model/oders');
const msg = "";

exports.addOder = async (req, res) => {
    try {
        const {username,total,address,orderId} = req.body;
        
        if(!Array.isArray(items)){
            console.log("Item is not an array");
        }
        const newItems = items.map(item => ({
            productname:item.productname,
            quantity:item.quantity,
            price:item.price,
        }));
        const newOrder = new myMd.oderModel({
            username,
            total,
            oderDate:Date.now(),
            address,
            items:newItems,
            status:"Confirm",
        });

        const saveOrder = await newOrder.save();
        console.log(saveOrder);
        console.log("Đơn hàng đã được đặt thành công");
        res.status(200).json({newOrder,msg:`Đơn hàng ${saveOrder._id} đặt hàng thành công`});
    } catch (error) {
        console.log("Đã xảy ra lỗi khi tạo đơn hàng :" + error);
    }
};

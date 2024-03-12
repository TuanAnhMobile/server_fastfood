const myMd = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req,res,next) => {
    try {
        const {username,email,phone,password} = req.body;
        const existingUser = await myMd.userModel.findOne({email});
        if(existingUser){
            console.log("Email đã được đăng ký!");
            return res.status(400).json({ message: "Email đã được đăng ký." });
        }

        const newUser = new myMd.userModel({
            username,
            email,
            phone,
            password,
            role:"1",
            cart:[],
            wishlist:[],
        });

        await newUser.save();
        console.log("Đăng ký người dùng thành công!");
        res.status(201).json({ message: "Người dùng đã được tạo thành công." });

    } catch (error) {
        console.log("Đã xảy ra lỗi khi xử lý yêu cầu của bạn! : "+error);
    }
}

exports.login = async(req,res,next) => {
    try {
        const {email,password} = req.body;
        const user = await myMd.userModel.findOne({email:email});
        if(!user){
            console.log("Người dùng không tồn tại");
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        if(user.password !== password) {
            console.log("Sai mật khẩu");
            return res.status(401).json({ message: "Sai mật khẩu" });
        }

        const userPayload = {userid:user.id,username:user.username,email:user.email,phone:user.phone,cart:user.cart,wishlist:user.wishlist};
        const token = jwt.sign(userPayload,'ijbfehgvfhgvdw',{expiresIn:'1h'});
        console.log(userPayload);
        console.log(("Đăng nhập thành công"));
        res.status(200).json({ message: "Đăng nhập thành công", token: token, user: userPayload });
    } catch (error) {
        console.log("Đã xảy ra lỗi khi xử lý yêu cầu của bạn :" +error);
    }
};

exports.getInfomation = async(req,res,next) =>{
    try {
        const token = req.headers.authorization.split('')[1];
        const decoded = jwt.verify(token,'ijbfehgvfhgvdw');
        const {userId,username,email,phone} = decoded;
        console.log("Thông tin người dùng",userId,username,email,phone);
        res.status(200).json({ userId, username, email, phone });
    } catch (error) {
        
    }
}
const express = require('express')
const User = require('../db/userModel')
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyToken = require('./authorization')

require('dotenv').config();

router.use(express.json());

router.get('/users', async(req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(500).send(error);
    }
})

router.get('/infor', verifyToken, (req, res) => {
    const infor = req.user;
    res.json(infor);
})

router.post('/login', async(req,res) =>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user){
            res.status(400).send({message: 'Tên đăng nhập không tồn tại!'})
            return;
        }
        if(user.password !== req.body.password){
            res.status(400).send({message: 'Sai mật khẩu!'})
            return;
        }

        jwt.sign({user}, process.env.key, {expiresIn: '1h'}, (err,token) =>{
            if(err){
                res.status(500).send('error generation token');
            }else{
                res.status(200).send({message:'login ok', token: token})
            }
        })

    }catch(error){
        res.status(500).send({message: 'Tên người dùng không tồn tại!'})
    }
})

router.post('/signup', async(req, res) => {
    try {
        const checkuser = await User.findOne({username: req.body.username});
        if(checkuser){
            res.status(400).send({message: 'Tên đăng nhập đã tồn tại!'})
            return;
        }

        const user = new User(req.body);
        await user.save();
        console.log('sign up ok');
        res.status(200).send('ok');
    } catch (error) {
        res.status(500).send({message: 'Lỗi đăng ký'})
        // res.status(500).send(error)
    }
})

// function verifyToken(req,res,next){
//     const token = req.headers['authorization'];
//     if(typeof token !== 'undefined'){
//         jwt.verify(token.split(' ')[1], process.env.key, (err, decoded) => {
//             if(err){
//                 res.status(403).send('Invalid token');

//             }else{
//                 req.user = decoded.user;
//                 next();
//             }
//         })
//     }
// }

module.exports = router;
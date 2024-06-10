// bình luận sách và bình luận về sản phẩm
const express = require('express')
const Post = require('../db/postModel')
const router = express.Router()
const Review = require('../db/reviewModel');
const Product = require('../db/productModel');
const User = require('../db/userModel')
const jwt = require('./authorization');

router.use(express.json());

// bai post

router.get('/post/:slug', async(req,res) =>{
    //const  = req.params.slug;
    const post = await Post.findOne({slug: req.params.slug});
    res.json(post);
})

// review san pham

router.get('/review/:slug', async(req,res) => {
    const reviews = await Review.findOne({slug: req.params.slug});
    res.json(reviews)
})

router.post('/review/:slug', async(req,res) => {
    const data = req.body;// data chua cmt + userid
    
    try{
        const checkCmt = await Review.findOne({slug: req.params.slug});
    
        // neu khong co slug
        if(!checkCmt){
            const cmtInfor = { slug : req.params.slug, comments: data}
            const newcmt = new Review(cmtInfor);
            await newcmt.save();
            res.status(200).send('add new product cmt')
            return; 
        }
        
        // neu da co
        try {
            checkCmt.comments.push(data);
            await checkCmt.save();
            res.status(200).send('add cmt successed!')
        } catch (error) {
            console.log(error);
        }
        
    }catch(error){
        console.log(error);
    }
    
})

// xem them sua xoa san pham - admin

router.get('/all', async(req,res) => {
    const products = await Product.find();
    res.json(products);
})

router.post('/:slug', async(req,res) =>{
    const data = {
        name: req.body.name,
        slug: req.body.slug,
        price: req.body.price,
        src: req.body.src,
        quantity: req.body.quantity,
        rate: req.body.rate
    };
    try {
        const product = new Product(data);
        await product.save();
        res.status(200).send('add success')
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
})

router.get('/:slug', async(req,res) => {
    const products = await Product.findOne({slug: req.params.slug});
    res.json(products);
})



module.exports = router;
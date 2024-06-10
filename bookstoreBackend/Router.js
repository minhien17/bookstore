const express = require('express');
const Post = require('./db/postModel');
const Login = require('./db/userModel');
const router = express.Router();

router.use(express.json());


router.get("/posts", async(req,res)=> {
    try{
        const posts = await Post.find({});
        res.send(posts);
    }catch(error){
        res.status(500).send(error)
    }
})

router.get("/posts/:slug", async(req,res) => {
    try{
        const post = await Post.findOne({slug: req.params.slug});
        res.send(post);
    }catch(error){
        res.status(500).send(error);
    }
})

router.post('/newpost', async(req,res) => {
    try{
        const post = new Post(req.body);
        await post.save();
        console.log('post ok')
        res.status(200).send({message:'post ok'})
    }catch(error){
        res.status(500).send(error)
    }
})

router.delete('/posts/:slug', async(req,res) => {
    try{
        const kt = await Post.deleteOne({slug: req.params.slug});
        if(kt) res.status(200).send('ok')
    }catch(error){
        res.status(500).send(error)
    }
})

router.patch('/posts/:slug',async(req,res)=>{
    try{
        const kt = await Post.findOneAndUpdate({slug: req.params.slug},req.body,{new:true});
        
        if(kt){
            res.status(200).send('ok');
            console.log('edit ok')
        }
    }catch(error){
        console.error(error);
    }
})

module.exports = router;
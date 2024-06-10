const express = require('express')
const cors = require('cors');
const app = express();
const port = 8080;
const dbConnect = require('./db/dbConnect');
const UserRouter = require('./router/userRouter');
const CommentRouter = require('./router/productRouter');

dbConnect();

app.use(cors());
app.use(UserRouter);
app.use('/book', CommentRouter);


app.get('/',function(req,res){
    res.send('bookstore server')
})

app.listen(port,function(){
    console.log(port)
})
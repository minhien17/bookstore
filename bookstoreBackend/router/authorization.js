// dinh danh nguoi dung

const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    const token = req.headers['authorization'];
    if(typeof token !== 'undefined'){
        jwt.verify(token.split(' ')[1], process.env.key, (err, decoded) => {
            if(err){
                res.status(403).send('Invalid token');

            }else{
                req.user = decoded.user;
                next();
            }
        })
    }
}
module.exports = verifyToken;
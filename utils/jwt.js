const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    if(typeof authHeader !== 'undefined'){
        const token = authHeader && authHeader.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err){
                res.status(401).send({
                    status: 401,
                    message: err.message,
                    name: err.name
                })
            }else{
                res.locals.payload= decoded;
                res.locals.verified = true;
                next();
            }
        })
    }else{
        res.status(403).send({
            status: 403,
            message: "Forbidden"
        });
    }
}

module.exports = authenticateToken;
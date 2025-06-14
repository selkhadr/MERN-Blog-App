const jwt = require("jsonwebtoken");


function verifyToken(req, res, next){
    const authToken = req.headers.authorization;
    if(authToken){
        const token = authToken.split(" ")[1];
        try{
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedPayload;
            next();
        }catch(error){
            res.status(401).json({message: "invalid token, access deneid"});
        }
    }else{
        return res.status(401).json({message: "no token provided, access denied"});
    }
}

function verifyTokenAndAdmin(req, res, next){
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin)
            next();
        else
            return res.status(403).json({message: "not allowed , only admin"});
    });
    
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin
}

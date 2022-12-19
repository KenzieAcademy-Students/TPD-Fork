const jwt = require('jsonwebtoken')

exports.verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization //check for both capitalization

    if(!authHeader?.startsWith('Bearer')){
        return res.status(401).json({message: 'Not Authorized'})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) =>{
            if (err) {
                return res.status(403).json({message: 'Forbidden'})
            }
            req.user = decoded.UserInfo.username,
            req.role = decoded.UserInfo.role
            next()
        }
    )
}


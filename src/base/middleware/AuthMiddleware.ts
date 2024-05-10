import JWT from 'jsonwebtoken'


module.exports = async(req, res, next) => {

    const token = req.headers["authorization"].split("")[1]
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if(err){
            return res.status(200).send({
                message:'Auth Fialed',
                success: false
            })
        } else {
            req.body
        }
    })
}
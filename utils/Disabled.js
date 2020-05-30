function Disabled(req, res, next){
    res.status(403).send({
        status: 403,
        message: 'This endpoint is disabled for a limited time'
    })
}

module.exports = Disabled;
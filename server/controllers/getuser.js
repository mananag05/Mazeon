

async function GetUser (req , res) {
    if(req.body){
        res.status(200).json(req.body)
    } else {
        res.status(403).json({msg : "forbidden"})
    }
}

module.exports = {
    GetUser
}
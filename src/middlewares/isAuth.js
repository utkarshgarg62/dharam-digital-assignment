module.exports.isAuth = (req, res, next) => {
    try {
        if (req.session.isAuth) {
            next()
        } else {
            res.status(401).send("You are not authenticate. please Login first.")
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}
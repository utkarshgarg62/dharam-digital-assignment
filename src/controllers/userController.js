const userModel = require("../models/userModel")

module.exports.createUser = async function (req, res) {
    try {
        let name = req.body.name
        let userName = req.body.userName
        let password = req.body.password
        let dataToBeCreated = {
            name: name,
            userName: userName,
            password: password
        }
        if (!name) return res.status(400).send("Enter Name")
        if (!userName) return res.status(400).send("Enter userName")
        if (!password) return res.status(400).send("Enter password")
        let checkUser = await userModel.findOne({ userName: userName })
        if (checkUser) return res.status(400).send(`Already have an account from ${userName}. Please Login`)
        let userDetails = await userModel.create(dataToBeCreated)
        res.status(201).send(userDetails)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports.userLogin = async function (req, res) {
    try {
        let userName = req.body.userName
        let password = req.body.password
        if (!userName) return res.status(400).send("Enter userName")
        if (!password) return res.status(400).send("Enter password")

        let userDetails = await userModel.findOne({
            $and: [{ userName: userName }, { password: password }]
        })
        if (!userDetails) return res.status(401).send("Invalid User Name or Password")
        req.session.isAuth = true
        res.redirect("/api/admin")
    }
    catch (err) {
        res.status(500).send(err)
    }
}


module.exports.adminDashboard = async function (req, res) {
    try {
        res.status(200).send("Welcome Admin")
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.send("You have been Logout")
    });
}
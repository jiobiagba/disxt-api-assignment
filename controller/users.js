
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user").UserModel

const adminMaker = (async () => {
    const check = await User.findOne({ role: "admin" })
    if( !check) {
        const info = {
            username: "admin",
            password: "admin",
            name: "Main",
            lastname: "Admin",
            role: "admin",
            age: 100
        }
        info.password = bcrypt.hashSync(info.password, 10)
        await User.create(info)
    }
})()

const registerUser = async(req, res) => {
    try { 
        const info = typeof req.body.data === 'string' ? 
                        JSON.parse(req.body.data) : 
                        req.body.data
        if( !info.password || !info.username) throw "Please provide username AND password"
        info.password = bcrypt.hashSync(info.password, 10)
        if( info.role) info.role = "client"
        const result = await User.create(info)

        res.status(201).send({
            error: false,
            message: "User Successfully Added",
            result: {
                _id: result._id,
                name: result.name,
                username: result.username,
                role: result.role
            }
        })
    }
    catch (e) {
        res.status(400).send({ error: true, message: e })
    }
}


const logUserIn = async(req, res) => {
    try {
        const info = typeof req.body.data === 'string' ? 
                        JSON.parse(req.body.data) : 
                        req.body.data

        const check = await User.findOne({ username: info.username })
        if (!check) throw "User does not exist"
        const checkPassword = bcrypt.compareSync(info.password, check.password)
        if( !checkPassword) throw "Wrong Password"

        const payload = { 
            username: check.username, 
            _id: check._id, 
            role: check.role
         }
        const token = jwt.sign(payload, String(process.env.DISXT_SECRET), {
            expiresIn: "1h"
        })

        res.status(201).send({
            error: false,
            message: "Login Successful",
            result: {
                _id: check._id,
                username: check.username,
                token: token
            }
        })
    }
    catch (e) {
        res.status(400).send({ error: true, message: e })
    }
}


const updateUser = async (req, res) => {
    if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10)
    (await UserModel.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }).select("-password"))
        .then((result) => {
            res.status(200).send({ error: false, message: "Update Successful", result: result })
        })
        .catch((e) => {
            res.status(400).send({ error: true, message: e })
        })
}


exports.registerUser = registerUser
exports.logUserIn = logUserIn
exports.updateUser = updateUser
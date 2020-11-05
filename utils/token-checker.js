
const jwt = require("jsonwebtoken")
const User = require("../models/user").UserModel

exports.tokenChecker = async (token) => {
    const payload = jwt.verify(token, String(process.env.DISXT_SECRET))
    const checked = await User.findOne({ _id: payload._id, username: payload.username })
    if( !checked) return "unknown"
    return [checked.role, checked._id]
}
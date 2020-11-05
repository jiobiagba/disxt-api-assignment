const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    age: Number,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "client"],
        default: "client"
    }
},
{
    timestamps: { 
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const UserModel = mongoose.model("User", UserSchema)

exports.UserModel = UserModel
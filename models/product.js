const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    created_by: { 
        type: ObjectId,
        ref: "User",
        required: true
     }
},
{
    timestamps: { 
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

const ProductModel = mongoose.model("Product", ProductSchema)

exports.ProductModel = ProductModel
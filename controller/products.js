
const Product = require("../models/product").ProductModel

exports.createProduct = async (req, res) => {
    await Product.create(
        typeof req.body.data === 'string' ? 
        JSON.parse(req.body.data) : 
        req.body.data
    )
    .then((result) => {
        res.status(201).send({ error: false, message: "Product(s) Creation Successful", result: result })
    })
    .catch((e) => {
        res.status(400).send({ error: true, message: e })
    })
}

exports.listProducts = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 100
    const page = req.query.page ? parseInt(req.query.page) : 0

    req.role === "admin" ?
    await Product.find().skip(limit * page).limit(limit).exec()
    .then((result) => {
        res.status(200).send({ error: false, message: "Fetch Successful", result: result })
    })
    .catch((e) => {
        res.status(400).send({ error: true, message: e })
    }) :
    await Product.find().select("-created_by").skip(limit * page).limit(limit).exec()
    .then((result) => {
        res.status(200).send({ error: false, message: "Fetch Successful", result: result })
    })
    .catch((e) => {
        res.status(400).send({ error: true, message: e })
    })
}

exports.getProduct = async (req, res) => {
    req.role === "admin" ?
    await Product.findById({ _id: req.params.id }).populate({ path: "created_by", select: "-password" }).exec()
    .then((result) => {
        res.status(200).send({ error: false, message: "Fetched Successfully", result: result })
    })
    .catch((e) => {
        res.status(400).send({ error: true, message: e })
    }) :
    await Product.findById({ _id: req.params.id }).select("-created_by").exec()
    .then((result) => {
        res.status(200).send({ error: false, message: "Fetched Successfully", result: result })
    })
    .catch((e) => {
        res.status(400).send({ error: true, message: e })
    })
}

exports.updateProduct = async (req, res) => {
    await Product.findByIdAndUpdate(
        req.params.id,
        typeof req.body.data === 'string' ? 
        JSON.parse(req.body.data) : 
        req.body.data,
        { new: true }
    )
    .exec()
    .then((result) => {
        res.status(200).send({ error: false, message: "Updated Successfully", result: result })
    })
    .catch((e) => {
        res.status(400).send({ error: true, message: e })
    })
}

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => {
        res.status(200).send({ error: false, message: "Deleted Successfully", result: result })
    })
    .catch((e) => {
        res.status(400).send({ error: true, message: e })
    })
}
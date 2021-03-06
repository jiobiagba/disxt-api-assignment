const app = require("../index").app
const expect = require("expect")
const request = require("supertest")
const User = require("../models/user").UserModel
const Product = require("../models/product").ProductModel
const testData = require("../test-data")

let id = null, adminId = null, productId1 = null, productId2 = null, token = null

describe("USERS' TESTS", function() {
    it("should allow anyone to register", function(done) {
        request(app)
            .post("/users/register")
            .send({ data: testData.user1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result.role).toBe("client")
                expect(res.body.result).not.toHaveProperty("password")
                id = res.body.result._id
                done()
            })
    })
    it("should login of default admin without external creation of the admin", function(done) {
        request(app)
            .post("/users/login")
            .send({ data: { username: "admin", password: "admin" } })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result.username).toBe("admin")
                expect(res.body.result).toHaveProperty("token")
                adminId = res.body.result._id
                token = res.body.result.token
                done()
            })
    })
    it("should log created user in successfully", function(done) {
        request(app)
            .post("/users/login")
            .send({ data: { username: "user1", password: "user1" } })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)

            .expect(201)
            .end((err, res) => {
                expect(res.body.result.username).toBe("user1")
                expect(res.body.result._id).toBe(id)
                expect(res.body.result).toHaveProperty("token")
                done()
            })
    })
})


describe("PRODUCTS' TESTS", function() {
    it("should add one product", function(done) {
        const data1 = testData.product1
        data1.created_by = adminId

        request(app)
            .post("/products/add")
            .set("Authorization", token)
            .send({ data: data1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.result.created_by).toBe(adminId)
                expect(res.body.result.name).toBe(testData.product1.name)
                productId1 = res.body.result._id
                done()
            })
    })
    it("should add two or more products at once", function(done) {
        const dataArray = [
            testData.product2,
            testData.product3,
            testData.product4
        ]
        .map((data) => {
            data.created_by = adminId
            return data
        })

        request(app)
            .post("/products/add")
            .set("Authorization", token)
            .send({ data: dataArray })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                for (let result of res.body.result) {
                    expect(result.created_by).toBe(adminId)
                    expect(result).toHaveProperty("name")
                    expect(result).toHaveProperty("description")
                    expect(result).toHaveProperty("price")
                }
                productId2 = res.body.result[0]._id
                done()
            })
    })
    it("should fetch all products", function(done) {
        request(app)
            .get("/products/list-products")
            .set("Authorization", token)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result.length).toBe(4)
                done()
            })
    })
    it("should get one product by the product's id", function(done) {
        request(app)
            .get("/products/list-one-by-id/" + productId1)
            .set("Authorization", token)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result.name).toBe(testData.product1.name)
                done()
            })
    })
    it("should update one product by the product's id", function(done) {
        const data2 = testData.product5
        data2.created_by = adminId

        request(app)
            .put("/products/update-one-by-id/" + productId1)
            .set("Authorization", token)
            .send({ data: data2 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result.name).toBe(testData.product1.name)
                expect(res.body.result.price).toBe(testData.product5.price)
                done()
            })
    })
    it("should delete one product by the product's id", function(done) {
        request(app)
            .delete("/products/delete-one-by-id/" + productId2)
            .set("Authorization", token)
            .expect(200)
            .end((err, res) => {
                expect(res.body.result.name).toBe(testData.product2.name)
                done()
            })
    })
})

after("Clean Up Database", function(done) {
    User.deleteMany({}).exec()
    Product.deleteMany({}).exec()
    done()
})

setTimeout(() => process.exit(0), 10000)
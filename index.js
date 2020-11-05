
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Router = require("./all-routes").allRoutes

const port = process.env.PORT || 5500

mongoose.connect(
    process.env.DISXT_MAIN,
    {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,   
    },
    (e) => {
        if (e) {
            console.error("\nDataBase Connection Error:   ", e.stack)
            process.exit(1)
        }
    }
)

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", Router)

app.use("*", (req, res) => {
    res.status(404).send({
        error: true,
        message: "Invalid Route"
    })
})

app.listen(port, () => {
    console.log(`Node app live on port ${port}`)
})

exports.app = app
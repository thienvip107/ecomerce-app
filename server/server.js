const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const {readdirSync} = require("fs")
require("dotenv").config();

const app = express()

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
.then(() => console.log("DB COnnected"))
.catch(err => console.log("DB COnnect ERR", err))

// middlewares
app.use(morgan("dev"))
app.use(bodyParser.json({limit: "2mb"}))
app.use(cors())

//route
app.get("/api", (req, res) => {
    res.json({
        data: "hey you hit node API"
    })
})
readdirSync('./routes').map(r=>app.use("/api", require('./routes/'+r)))
const port = process.env.PORT || 8080

app.listen(port , () => console.log(`server is running on port ${port}`))

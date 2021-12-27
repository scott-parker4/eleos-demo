require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

const app = express()

app.use(express.json()); //Used to parse JSON bodies

const url = `mongodb+srv://eleosadmin:${process.env.MONGO_PASS}@cluster0.uylzw.mongodb.net/Eleos?retryWrites=true&w=majority`

const database = mongoose
    .connect(url)
    .then(console.log("Database Connected..."))
    .catch(err => console.log(err))

const User = require('./Schemas/User')

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/:token', (req, res) => {
    const jwtDecode = jwt_decode(req.params.token)
    User.findOne({ full_name: jwtDecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] })
        .then((user) => {
            console.log(user)
            console.log(req.params.token)
        }).catch((err) => {
            console.log(err)
            res.status(401)
        });
})

const PORT = process.env.port || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




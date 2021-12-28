require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const jwt_encode = require('jwt-encode')

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

app.get('/authenticate/:token', (req, res) => {
    const jwtDecode = jwt_decode(req.params.token)
    User.findOne({ username: jwtDecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] })
        .then((user) => {
            user.api_token = jwt_encode({ "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": user.username, "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": user.full_name }, 'secret')
            res.json(user)
            console.log(user)
        }).catch((err) => {
            console.log(err)
            res.status(401)
        });
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt_decode = require('jwt-decode')
const jwt_encode = require('jwt-encode')

const app = express()

app.use(express.json()); // Used to parse JSON bodies

const url = `mongodb+srv://eleosadmin:${process.env.MONGO_PASS}@cluster0.uylzw.mongodb.net/Eleos?retryWrites=true&w=majority`

const database = mongoose // Connect to Mongo DB
    .connect(url)
    .then(console.log("Database Connected..."))
    .catch(err => console.log(err))

const User = require('./Schemas/User')
const Load = require('./Schemas/Loads')

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

// This endpoint allows the Eleos Platform to verify a user API token
app.get('/authenticate/:token', (req, res) => {
    const jwtDecode = jwt_decode(req.params.token)
    User.findOne({ full_name: jwtDecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] })
        .then((user) => {
            user.api_token = jwt_encode({ "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": user.username, "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": user.full_name }, `${process.env.TOKEN_SECRET}`)
            res.json(user)
            console.log(user)
        }).catch((err) => {
            console.log(err)
            res.status(401)
        });
})

// This endpoint will enumerate loads for the Eleos Mobile Platform
app.get('/loads', (req, res) => {
    tokenAuth(req.header.token)
    .then(Load.find)
    .then(res.json(Load))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// Authenticate a token
const tokenAuth = (token) => {
    const jwtDecode = jwt_decode(req.params.token)
    return new Promise((res, rej) => {
        User.findOne({ full_name: jwtDecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] })
        .then(res("Authorized"))
        .catch(rej("Unauthorized"))
    })
}




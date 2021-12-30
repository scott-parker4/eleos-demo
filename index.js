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

// Load Database Schemas
const User = require('./Schemas/User')
const Load = require('./Schemas/Loads')
const Message = require('./Schemas/Messages')
const MyTruck = require('./Schemas/MyTruck')

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
            res.status(401).send('Not Authorized')
        })
})

// This endpoint will enumerate loads for the Eleos Mobile Platform
app.get('/loads', (req, res) => {

    const headerToken = req.header('Authorization').split('=')[1] // Retrieve token from request header
    
    tokenAuth(headerToken)
        .then(
            Load.find({})
        .then((load) => {
            res.json(load)
            console.log(load)
        })
        ).catch((err) => {
            console.log(err)
            res.status(401)
    })
})

// This service allows the Eleos Mobile Platform to transmit messages from drivers to backend
app.put('/messages/:handle', (req, res) => {
    if(req.header('Eleos-Platform-Key') !== process.env.ELEOS_KEY) { // Validate Header Platform key
        res.status(401).send('Not Authorized')
    } else {
        const message = new Message({
            direction: req.body.direction,
            username: req.body.username,
            composed_at: req.body.composed_at,
            read_at: req.body.read_at,
            message_type: req.body.message_type,
            body: req.body.body
        })
        message.save()
            .then(res.json(req.params.handle)
            ).catch((err) => {
            console.log(err)
            res.status(401)
    })
    }
})

// Return status related to truck repairs and location
app.get('/truck', (req, res) => {
    const headerToken = req.header('Authorization').split('=')[1] // Retrieve token from request header
    
    tokenAuth(headerToken)
        .then(
            MyTruck.find({})
            .then((truck) => {
            res.json(truck[0])
            console.log(truck)
        })
        ).catch((err) => {
            console.log(err)
            res.status(401)
    })
})

loadnew = new Load({
    "id": "test load 2",
    "display_identifier": "Test 2",
    "sort": 2,
    "order_number": "001",
    "load_status": "Ready",
    "load_status_label": "Status",
    "active": true,
    "current": true,
    "stops": [{
      "stop_number": 1,
      "stop_type": "Stop",
      "name": "Mr. Stop",
      "city": "Clemson",
      "state": "SC"
    }]
  })
    
    loadnew.save().then(result => {
      console.log('load saved!')
      mongoose.connection.close()
    })
    
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// Function that authenticates a token
const tokenAuth = (token) => {
    const jwtDecode = jwt_decode(token)
    return new Promise((resolve, reject) => {
        User.findOne({ full_name: jwtDecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] })
        .then(resolve("Authorized"))
        .catch(reject("Unauthorized"))
    })
}




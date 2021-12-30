const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationModelSchema = new Schema(
    {
        latitude: {
            type: mongoose.Decimal128,
            required: true
        },
        longitude: {
            type: mongoose.Decimal128,
            required: true
        }
    }
)
mongoose.model('location',LocationModelSchema ,'location' )

const TruckSchema = new Schema(
    {
        summary: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        location: {
            type: mongoose.Schema.Type.ObjectId,
            ref: 'location'
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
            delete ret._id;
            },
            versionKey: false,
        },
    })

module.exports = MYTRUCK = mongoose.model('mytruck', TruckSchema)


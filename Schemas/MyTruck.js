const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationModelSchema = new Schema(
    {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    }
)

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
            type: LocationModelSchema,
            required: true
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


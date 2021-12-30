const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
            delete ret._id;
            }
        },
    });

module.exports = MYTRUCK = mongoose.model('mytruck', TruckSchema)
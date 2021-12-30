const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoadSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        display_identifier: {
            type: String,
            required: true
        },
        sort: {
            type: Number,
            required: true
        },
        order_number: {
            type: String,
            required: true
        },
        load_status: {
            type: String,
            required: true
        },
        load_status_label: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        current: {
            type: Boolean,
            required: true
        },
        stops: [
            {
                stop_number: {
                    type: Number,
                    required: true
                },
                stop_type: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                city: {
                    type: String,
                    required: true
                },
                state: {
                    type: String,
                    required: true
                }
            }
        ]
    },
        {
            toJSON: {
                transform(doc, ret) {
                delete ret._id;
                },
                versionKey: false,
            },
        })


module.exports = LOAD = mongoose.model('load', LoadSchema)
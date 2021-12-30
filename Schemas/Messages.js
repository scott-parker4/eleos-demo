const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema(
    {
        direction: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        message_type: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: false
        },
        form_code: {
            type: String,
            required: false
        },
        form_data: {
            type: String,
            required: false
        },
        contact: {
            type: String,
            required: false
        },
        composed_at: {
            type: Date,
            default: Date.now,
            required: true
        },
        read_at: {
            type: Date,
            default: Date.now,
            required: false
        },
        deleted_at: {
            type: Date,
            default: Date.now,
            required: false
        },
        platform_received_at: {
            type: Date,
            default: Date.now,
            required: true
        },
        in_reply_to_handle: {
            type: String,
            required: false
        },
        workflow_action: {
            type: Boolean,
            required: false
        }
    },
        {
            toJSON: {
                transform(doc, ret) {
                delete ret._id;
                },
                versionKey: false,
            },
        })


module.exports = MESSAGE = mongoose.model('message', MessageSchema)
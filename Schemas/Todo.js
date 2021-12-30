const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema(
    {
        handle: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: true
        },
        due_date: {
            type: Date,
            default: Date.now,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        properties: {
            metadata_form_code: {
                type: String,
                required: false
            },
            scan_type: {
                type: String,
                required: false
            },
            form_code: {
                type: String,
                required: false
            },
            add_page_uses_document_type: {
                type: Boolean,
                required: false
            },
            data: {
                type: Schema.Types.Mixed,
                required: false
            },
            video_handle: {
                type: String,
                required: false
            },
            _id: false
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

module.exports = TODO = mongoose.model('todo', TodoSchema)
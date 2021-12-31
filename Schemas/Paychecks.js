const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaySchema = new Schema(
    {
     paychecks: [
         {
            check_date: {
                    type: Date,
                    required: true
                },
            amount: {
                    type: String,
                    required: false
                },
                details_title: {
                    type: String,
                    required: false
                },
                _id: false,
                details: [
                    {
                        label: {
                            type: String,
                            required: true
                        },
                        label_type: {
                            type: String,
                            required: false
                        },
                        value: {
                            type: String,
                            required: false
                        },
                        value_type: {
                            type: String,
                            required: false
                        },
                        details_title: {
                            type: String,
                            required: false
                        },
                        details_inline: {
                            type: Boolean,
                            required: false
                        },
                        details: {
                            type: Schema.Types.Mixed,
                            required: false
                        },
                        _id: false
                    }
                ]  
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

module.exports = PAYCHECK = mongoose.model('paycheck', PaySchema)
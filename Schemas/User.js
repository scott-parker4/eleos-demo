const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        full_name: {
            type: String,
            required: true
        },
        menu_code: {
            type: String
        },
        dashboard_code: {
            type: String
        },
        custom_settings_form_code: {
            type: String
        },
        api_token: {
            type: String
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
            delete ret._id;
            }
        },
    });

    module.exports = USER = mongoose.model('USER', UserSchema)

 /*    {
        "username": "SCOTT-DEM0",
        "full_name": "Scott Parker",
        "menu_code": "DEFAULT-MENU",
        "dashboard_code": "DEFAULT-DASHBOARD",
        "custom_settings_form_code": "SETTINGS",
        "api_token": "xMlSxxXKR7hQl1lsXLEuS8tLqvUDT2zh7qBoudc04Iv"

    } */


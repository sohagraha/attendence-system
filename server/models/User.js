const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{1,20})?$/.test(value);
            },
            message: (props) => {
                return `${props.value} is not a valid email`
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        required: true,
        default: ['user']
    },
    accountStatus: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'active', 'rejected'],
        default: 'pending'
    },

});

const User = model('User', userSchema);
module.exports = User;
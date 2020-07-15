const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', userSchema)

module.exports = Task

const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    perceivedEffort: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.export = mongoose.model('workout', WorkoutSchema);
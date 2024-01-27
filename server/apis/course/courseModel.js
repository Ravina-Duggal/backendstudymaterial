const mongoose = require('mongoose')
const courseSchema = mongoose.Schema({

    courseId: { type: Number, default: 0 },

    name: { type: String, default: "" },
    totalSemesters: { type: Number, default: 0 },

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }

})


const course = module.exports = mongoose.model('course', courseSchema)

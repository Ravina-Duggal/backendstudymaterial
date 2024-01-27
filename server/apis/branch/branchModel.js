const mongoose = require('mongoose')
const branchSchema = mongoose.Schema({
    branchId: { type: Number, default: 0 },
    courseId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'course' },
    name: { type: String, default: "" },
    status: { type: Boolean, default: true },

    createdAt: { type: Date, default: Date.now }

})

const branch = module.exports = mongoose.model('branch', branchSchema)

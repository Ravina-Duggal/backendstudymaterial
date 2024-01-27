const mongoose = require('mongoose')
const studentSchema = mongoose.Schema({
    studentId: { type: Number, default: 0 },
    
    name: { type: String, default: "" },
    rollNo: { type: String, default: "" },
    contact: { type: String, default: "" },

    email: { type: String, default: "" },
    password: { type: String, default: "" },

    courseId: { type: mongoose.Schema.Types.ObjectId, ref:'course', default: null },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref:'branch', default: null },

    userId: { type: mongoose.Schema.Types.ObjectId, ref:'user', default: null },
    createdAt: { type: Date, default: Date.now }

})

const student = module.exports = mongoose.model('student', studentSchema)

   
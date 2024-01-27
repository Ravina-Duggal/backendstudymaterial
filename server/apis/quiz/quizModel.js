const mongoose = require('mongoose')
const quizSchema = mongoose.Schema({
    quizId: { type: Number, default: 0 },
    courseId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'course' },
    branchId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'branch' },
    semester: { type: Number, default: "" },
    
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    totalQuestions: { type: Number, default: "" },

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }

})


const quiz = module.exports = mongoose.model('quiz', quizSchema)

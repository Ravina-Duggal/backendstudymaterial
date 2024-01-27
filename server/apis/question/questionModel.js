const mongoose = require('mongoose')
const questionSchema = mongoose.Schema({
    questionNo: { type: Number, default: 0 },
    quizId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "quiz" },
    question: { type: String, default: "" },
    option1: { type: String, default: "" }, 
    option2: { type: String, default: "" }, 
    option3: { type: String, default: "" }, 
    option4: { type: String, default: "" }, 
    answer: { type: String, default: "" },

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }

})



const question = module.exports = mongoose.model('question', questionSchema)
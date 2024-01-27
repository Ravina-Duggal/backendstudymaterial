const mongoose = require('mongoose')
const submissionSchema = mongoose.Schema({
    submissionId: { type: Number, default: 0 },
    quizId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "quiz" },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "user" },
    totalQuestions: { type: Number, default: 0 },
    correctQuestions: { type: Number, default: 0},

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }

})



const submission = module.exports = mongoose.model('submission', submissionSchema)
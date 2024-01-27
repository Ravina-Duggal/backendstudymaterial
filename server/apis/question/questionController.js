const QuizQuestion = require('./questionModel')
const Quiz = require('../quiz/quizModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    await QuizQuestion.find(req.body).populate("quizId").then(res => {
            resp.send({ success: true, status: 200, message: "All Quiz Questions loaded", data: res })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
}



exports.getSingle = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await QuizQuestion.findOne(query)
            .populate("quizId")
            .then(res => {
                if (!!res) {
                    resp.send({ success: true, status: 200, message: "Quiz Question loaded Successfully", data: res })
                }
                else
                    resp.send({ success: false, status: 404, message: "No Quiz Question Found" })
            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }


}



exports.addQuestion = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.questionNo)
        validation += "questionNo is required,"
    if (!formData.quizId)
        validation += "quizId is required,"
    if (!formData.question)
        validation += "question is required,"
    if (!formData.option1)
        validation += "option1 is required,"
    if (!formData.option2)
        validation += "option2 is required,"
    if (!formData.option3)
        validation += "option3 is required,"
    if (!formData.option4)
        validation += "option4 is required,"
    if (!formData.answer)
        validation += "answer is required,"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {

        let quizData = await Quiz.findOne({ _id: formData.quizId })
        if (quizData == null) {
            resp.send({ success: false, status: 404, message: "No Quiz Found" })
        } else {
            // let total = await QuizQuestion.countDocuments()
            let quizQuestionData = {
                questionNo: formData.questionNo,
                quizId: formData.quizId,
                question: formData.question,
                option1: formData.option1,
                option2: formData.option2,
                option3: formData.option3,
                option4: formData.option4,
                answer: formData.answer
            }
            let quizQuestion = new QuizQuestion(quizQuestionData)
            quizQuestion.save().then(res => {
                resp.send({ success: true, status: 200, message: "QuizQuestion added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })

        }
    }
}



exports.updateQuestion = async (req, resp) => {
    // if (!!req.decoded && req.decoded.userType == 2) {
    //     resp.send({ success: false, status: 404, message: "Unauthorized access" })
    // } else {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await QuizQuestion.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.questionNo)
                    res.questionNo = formData.questionNo
                if (!!formData.quizId)
                    res.quizId = formData.quizId
                if (!!formData.question)
                    res.question = formData.question
                if (!!formData.option1)
                    res.option1 = formData.option1
                if (!!formData.option2)
                    res.option2 = formData.option2
                if (!!formData.option3)
                    res.option3 = formData.option3
                if (!!formData.option4)
                    res.option4 = formData.option4
                if (!!formData.answer)
                    res.answer = formData.answer
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Quiz Question updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Quiz Question Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
    //   }


}


exports.changeStatus = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!formData.status)
        validation += "status is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await QuizQuestion.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.status)
                    res.status = formData.status
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "QuizQuestion Status Changed Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No QuizQuestion Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}

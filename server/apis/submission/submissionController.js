const Submission = require('./submissionModel')
const Quiz = require('../quiz/quizModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    await Submission.find(req.body).populate("quizId")
        .populate("userId").then(res => {
            resp.send({ success: true, status: 200, message: "All Submissions loaded", data: res })
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
        await Submission.findOne(query)
            .populate("quizId")
            .populate("userId")
            .then(res => {
                if (!!res) {
                    resp.send({ success: true, status: 200, message: "Submission loaded Successfully", data: res })
                }
                else
                    resp.send({ success: false, status: 404, message: "No Submission Found" })
            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }


}



exports.addSubmission = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.quizId)
        validation += "quizId is required,"
    if (!formData.userId)
        validation += "userId is required,"
    if (!formData.totalQuestions)
        validation += "totalQuestions is required,"
    if (!formData.correctQuestions)
        validation += "correctQuestions is required,"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {

        let quizData = await Quiz.findOne({ _id: formData.quizId })
        if (quizData == null) {
            resp.send({ success: false, status: 404, message: "No Quiz Found" })
        } else {
            let total = await Submission.countDocuments()
            let submissionData = {
                submissionId: total + 1,
                quizId: formData.quizId,
                userId: formData.userId,
                totalQuestions: quizData.totalQuestions,
                correctQuestions: formData.correctQuestions
            }
            let submission = new Submission(submissionData)
            submission.save().then(res => {
                resp.send({ success: true, status: 200, message: "Submission added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })

        }
    }
}



exports.updateSubmission = async (req, resp) => {
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
        await Submission.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.quizId)
                    res.quizId = formData.quizId
                if (!!formData.userId)
                    res.userId = formData.userId
                if (!!formData.totalQuestions)
                    res.totalQuestions = formData.totalQuestions
                if (!!formData.correctQuestions)
                    res.correctQuestions = formData.correctQuestions
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Submission updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Submission Found" })
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
        await Submission.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.status)
                    res.status = formData.status
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Submission Status Changed Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Submission Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}

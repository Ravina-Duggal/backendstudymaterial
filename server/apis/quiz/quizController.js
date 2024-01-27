const Quiz = require('./quizModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    console.log(req.body);
    await Quiz.find(req.body)
        .populate("courseId")
        .populate("branchId")
        .then(res => {
            resp.send({ success: true, status: 200, message: "All Quizes loaded", data: res })
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

    let query = { _id: formData._id }
    await Quiz.findOne(query)
        .populate("courseId")
        .populate("branchId")
        .then(res => {
            if (!!res) {
                resp.send({ success: true, status: 200, message: "Quiz loaded Successfully", data: res })
            }
            else
                resp.send({ success: false, status: 404, message: "No Quiz Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })

}




exports.addQuiz = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.courseId)
        validation += "courseId is required,"
    if (!formData.branchId)
        validation += "branchId is required,"
    if (!formData.semester)
        validation += "semester is required,"
    if (!formData.title)
        validation += "title is required,"
    if (!formData.description)
        validation += "description is required,"
    if (!formData.totalQuestions)
        validation += "totalQuestions is required,"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await Quiz.countDocuments()
        let quizData = {
            quizId: total + 1,
            courseId: formData.courseId,
            branchId: formData.branchId,
            semester: formData.semester,
            title: formData.title,
            description: formData.description,
            totalQuestions: formData.totalQuestions,
        }
        let quiz = new Quiz(quizData)
            quiz.save().then(res => {
                resp.send({ success: true, status: 200, message: "Quiz added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }


}



exports.updateQuiz = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await Quiz.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.courseId)
                    res.courseId = formData.courseId
                if (!!formData.branchId)
                    res.branchId = formData.branchId
                if (!!formData.semester)
                    res.semester = formData.semester
                if (!!formData.title)
                    res.title = formData.title
                if (!!formData.description)
                    res.description = formData.description
                if (!!formData.totalQuestions)
                    res.totalQuestions = formData.totalQuestions
                    
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Quiz updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }

            else
                resp.send({ success: false, status: 404, message: "No Quiz Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }

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
        await Quiz.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.status)
                    res.status = formData.status
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Quiz Status Changed Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Quiz Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}
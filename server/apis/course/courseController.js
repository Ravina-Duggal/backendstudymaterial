const Course = require('./courseModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    await Course.find(req.body).then(res => {
        resp.send({ success: true, status: 200, message: "All Courses loaded", data: res })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })
}



exports.getSingle = async (req, resp) => {
    let formData = req.body
    console.log(formData)
    let validation = ""
    if (!formData._id)
        validation += "_id is required"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })

    let query = { _id: formData._id }
    await Course.findOne(query).then(res => {
        if (!!res) {
            resp.send({ success: true, status: 200, message: "Course loaded Successfully", data: res })
        }
        else
            resp.send({ success: false, status: 404, message: "No Course Found" })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })

}



exports.addCourse = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.name)
        validation += "name is required,"
    if (!formData.totalSemesters)
        validation += "totalSemesters is required,"


    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await Course.countDocuments()
        let courseData = {
            courseId: total + 1,
            name: formData.name,
            totalSemesters:  formData.totalSemesters
        }
        let course = new Course(courseData)
        let prevCourse = await Course.findOne({ name: formData.name })
        if (prevCourse)
            resp.send({ success: false, status: 409, message: "Course already exists with same name" })
        else
            course.save().then(res => {
                resp.send({ success: true, status: 200, message: "Course added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }
}

exports.updateCourse = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await Course.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.name)
                    res.name = formData.name
                if (!!formData.totalSemesters)
                    res.totalSemesters = formData.totalSemesters
                let id = res._id
                let prevCourse = await Course.findOne({ $and: [{ name: res.name }, { _id: { $ne: id } }] })
                if (prevCourse)
                    resp.send({ success: false, status: 409, message: "Course already exists with same name" })
                else
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Course updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Course Found" })
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
        await Course.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.status)
                    res.status = formData.status
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Course Status Changed Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Course Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}


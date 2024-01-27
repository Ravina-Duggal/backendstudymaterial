const Branch = require('./branchModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    await Branch.find(req.body)
        .populate("courseId")
        .then(res => {
            resp.send({ success: true, status: 200, message: "All Branches loaded", data: res })
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
    await Branch.findOne(query)
        .populate("courseId")
        .then(res => {
            if (!!res) {
                resp.send({ success: true, status: 200, message: "Branch loaded Successfully", data: res })
            }
            else
                resp.send({ success: false, status: 404, message: "No Branch Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })

}

exports.addBranch = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.name)
        validation += "name is required,"
    if (!formData.courseId)
        validation += "courseId is required,"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await Branch.countDocuments()
        let branchData = {
            branchId: total + 1,
            courseId: formData.courseId,
            name: formData.name,
        }
        let branch = new Branch(branchData)
            branch.save().then(res => {
                resp.send({ success: true, status: 200, message: "Branch added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }
}


exports.updateBranch = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
            
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await Branch.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.name)
                    res.name = formData.name
                if (!!formData.courseId)
                    res.courseId = formData.courseId
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Branch updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }

            else
                resp.send({ success: false, status: 404, message: "No Branch Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }

}

exports.changeStatus = async (req, resp) => {
    // console.log(req.body)
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
        await Branch.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.status)
                    res.status = formData.status
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Branch Status Changed Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Branch Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}
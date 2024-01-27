const Material = require('./materialModel')
const helper = require('../../utilities/helpers')


exports.getAll = async (req, resp) => {
    await Material.find(req.body)
        .populate("courseId")
        .populate("branchId")
        .then(res => {
            resp.send({ success: true, status: 200, message: "All Materials loaded", data: res })
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
        await Material.findOne(query)
            .populate("courseId")
            .populate("branchId").then(res => {
                if (!!res) {
                    resp.send({ success: true, status: 200, message: "Material loaded Successfully", data: res })
                }
                else
                    resp.send({ success: false, status: 404, message: "No Material Found" })
            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }


}



exports.addMaterial = async (req, resp) => {
    // console.log(req.decoded)
    let formData = req.body
    let validation = ""
    if (!formData.materialType)
        validation += "materialType is required,"
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
    if (!formData.image)
        validation += "image is required,"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await Material.countDocuments()
        let materialData = {
            materialId: total + 1,
            userId: req.decoded._id,
            materialType: formData.materialType,
            courseId: formData.courseId,
            branchId: formData.branchId,
            semester: formData.semester,
            title: formData.title,
            description: formData.description,
            image: "material/" + formData.image
        }
        let material = new Material(materialData)
        
        material.save().then(res => {
            resp.send({ success: true, status: 200, message: "Material added Successfully", data: res })

        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}



exports.updateMaterial = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await Material.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.materialType)
                    res.materialType = formData.materialType
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
                if (!!formData.image)
                    helper.unlinkImage(res.image)
                    res.image = "material/" + formData.image
                let id = res._id
                // let prevMaterial = await Material.findOne({ $and: [{ name: res.name }, { _id: { $ne: id } }] })
                // console.log(prevMaterial)
                // if (prevMaterial)
                //     resp.send({ success: false, status: 409, message: "Material already exists with same name" })
                // else
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Material updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Material Found" })
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
        await Material.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.status)
                    res.status = formData.status
                
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Material Status Changed Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Material Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }
}
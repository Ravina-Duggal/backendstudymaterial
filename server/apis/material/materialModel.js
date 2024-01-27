const mongoose = require('mongoose')
const materialSchema = mongoose.Schema({
    materialId: { type: Number, default: 0 },
    materialType: { type: String, default: "" }, //notes, question paper, lab file
    
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    branchId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'branch' },
    courseId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'course' },
    semester: { type: Number, default: 0 },
    
    title: { type: String, default:''},
    description: { type: String, default:''},
    image: { type: String, default: "material/default.jpg"},
    
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }

})


const material = module.exports = mongoose.model('material', materialSchema)

const router = require('express').Router()
const helper = require('../utilities/helpers')


//controllers
const userController = require('../apis/user/userController')
const studentController = require('../apis/student/studentController')
const courseController = require('../apis/course/courseController')
const branchController = require('../apis/branch/branchController')
const materialController = require('../apis/material/materialController')
const quizController = require('../apis/quiz/quizController')
const questionController = require('../apis/question/questionController')
const submissionController = require('../apis/submission/submissionController')
const dashboardController = require('../apis/dashboard/dashboardController')

//auth
router.post('/user/login', userController.login)


//student
router.post('/student/add', studentController.addStudent)


//course
router.post('/course/all', courseController.getAll)
router.post('/course/single', courseController.getSingle)

//branch
router.post('/branch/all', branchController.getAll)
router.post('/branch/single', branchController.getSingle)




router.use(require('../middleware/tokenChecker'))

//dashboard
router.get('/dashboard', dashboardController.dashboard)

//student
router.post('/student/update', studentController.updateStudent)
router.post('/student/all', studentController.getAll)
router.post('/student/single', studentController.getSingle)
router.post('/student/changeStatus', studentController.changeStatus)


//course

router.post('/course/add', courseController.addCourse)
router.post('/course/update',  courseController.updateCourse)
router.post('/course/changeStatus', courseController.changeStatus)
//branch

router.post('/branch/add',branchController.addBranch)
router.post('/branch/update', branchController.updateBranch)
router.post('/branch/changeStatus', branchController.changeStatus)

//material

router.post('/material/add', helper.uploadImageFun.single('material_image'), materialController.addMaterial)
router.post('/material/update', helper.uploadImageFun.single('material_image'), materialController.updateMaterial)
router.post('/material/all', materialController.getAll)
router.post('/material/single', materialController.getSingle)
router.post('/material/changeStatus', materialController.changeStatus)

//quiz
router.post('/quiz/all', quizController.getAll)
router.post('/quiz/single', quizController.getSingle)
router.post('/quiz/add', quizController.addQuiz)
router.post('/quiz/update', quizController.updateQuiz)
router.post('/quiz/changeStatus', quizController.changeStatus)

//quiz-question
router.post('/question/all', questionController.getAll)
router.post('/question/single', questionController.getSingle)
router.post('/question/add', questionController.addQuestion)
router.post('/question/update', questionController.updateQuestion)
router.post('/question/changeStatus', questionController.changeStatus)


// quiz-question
router.post('/submission/all', submissionController.getAll)
router.post('/submission/single', submissionController.getSingle)
router.post('/submission/add', submissionController.addSubmission)
router.post('/submission/update', submissionController.updateSubmission)
router.post('/submission/changeStatus', submissionController.changeStatus)



router.all('*', (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router
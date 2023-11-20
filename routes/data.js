const express = require('express')
const router = express.Router()
const {getQuestions,addQues,addQuestions,delQues,reset,getScores,addScore} = require('../controllers/data')



router.get('/questions',getQuestions)
router.post('/addQues',addQues)
router.post('/addQuestions',addQuestions)
router.delete('/delQues/:id',delQues)
router.delete('/reset',reset)

router.get('/questions',getScores)
router.get('/questions',addScore)


module.exports = router







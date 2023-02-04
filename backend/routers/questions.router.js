import express from 'express'
import { Faculty } from '../models/facultySchema.js'
import { Subject } from '../models/SubjectsSchema.js'
import { Question } from '../models/questionSchema.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { generate } from '../utils/generateQuestons.js'

const router = express.Router()

router.post('/generateQP', authorizeUser, async (req, res) => {
  try {
    const { subject, type } = req.body
    const facultyId = req.userId
    const subjectId = await Subject.findOne({ code: subject })
    const questions = await Question.findOne({
      facultyId: facultyId,
      subjectId: subjectId._id,
    }).select('questions -_id')
    const generated = await generate(questions.questions, type)
    res.status(200).send(generated)
  } catch (err) {
    res.status(500).send({ message: 'internal server error', err })
  }
})
export const questionRouter = router

import express from 'express'
import { Subject } from '../models/SubjectsSchema.js'
import { Question } from '../models/questionSchema.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { generate } from '../utils/generateQuestons.js'
import { Faculty } from '../models/FacultySchema.js'

import HtmlDocx from 'html-docx-js'
import fs from 'fs'

const router = express.Router()

// const htmlContent = fs.readFileSync("input.html", "utf-8");

// Convert the HTML file to a Word document
router.post('/convertToWord', authorizeUser, async (req, res) => {
  const wordFile = HtmlDocx.asBlob(req.body.htmlContent)
  const wordDoc = await wordFile.arrayBuffer()

  // formatting date
  const timestamp = Date.now()
  const date = new Date(timestamp)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const dateString = date.toLocaleDateString('en-US', options)

  // Write the Word file to disk
  const fileName = dateString + 'output.docx'
  const file = fs.writeFileSync(fileName, Buffer.from(wordDoc))
  // console.log(fileName)
  const recentWord = fs.readFileSync(fileName, 'base64')
  const updateDoc = await Faculty.findOneAndUpdate(
    { _id: req.userId },
    {
      recentWord,
      $push: { generatedWords: recentWord },
    }
  )
  // console.log(updateDoc)
  fs.unlinkSync(fileName)
  return res.status(200).send(recentWord)
})

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

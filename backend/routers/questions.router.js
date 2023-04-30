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
  const { generateDetails, htmlContent } = req.body
  const { subject, type } = generateDetails
  const wordFile = HtmlDocx.asBlob(htmlContent)

  const wordDoc = await wordFile.arrayBuffer()

  // formatting date
  const timestamp = Date.now()
  const date = new Date(timestamp)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const dateString = date.toLocaleDateString('en-US', options)
  const fileName = dateString + ' ' + subject + ' ' + type

  // Write the Word file to disk
  const file = fs.writeFileSync(fileName, Buffer.from(wordDoc))

  const recentWord = fs.readFileSync(fileName, 'base64')
  const updateDoc = await Faculty.findOneAndUpdate(
    { _id: req.userId },
    {
      recentWord,
      $push: {
        generatedWords: { word: recentWord, subject, examType: type, fileName },
      },
    }
  )
  // console.log(updateDoc)
  fs.unlinkSync(fileName)
  return res.status(200).send(recentWord)
})

router.post('/generateQP', authorizeUser, async (req, res) => {
  try {
    const { subject, type } = req.body
    if (!subject) {
      return res.status(402).send({ message: 'Please select the subject' })
    }
    if (!type) {
      return res
        .status(402)
        .send({ message: 'Please select the examination type' })
    }
    const facultyId = req.userId
    const subjectId = await Subject.findOne({ code: subject }).populate(
      'deptId'
    )
    const questions = await Question.findOne({
      facultyId: facultyId,
      subjectId: subjectId._id,
    }).select('questions -_id')
    const generated = await generate(questions.questions, type)
    res.status(200).send({ generated, subjectId })
  } catch (err) {
    res.status(500).send({ message: 'internal server error', err })
  }
})

router.get('/generatedPapers', authorizeUser, async (req, res) => {
  try {
    const generated = await Faculty.findOne({ _id: req.userId }).select(
      'generatedWords -_id'
    )
    res.status(200).send(generated)
  } catch (err) {
    res.status(500).send({ message: 'internal server error', err })
  }
})

router.post('/qpHeaderDetails', authorizeUser, async (req, res) => {
  try {
    const { subject, type } = req.body
    if (!subject) {
      return res.status(402).send({ message: 'Please select the subject' })
    }
    if (!type) {
      return res
        .status(402)
        .send({ message: 'Please select the examination type' })
    }
    const facultyId = req.userId
    const subjectId = await Subject.findOne({ code: subject })
    res.status(200).send()
  } catch (err) {
    res.status(500).send({ message: 'internal server error', err })
  }
})
export const questionRouter = router

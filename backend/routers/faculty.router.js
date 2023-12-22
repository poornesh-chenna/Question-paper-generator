import express from 'express'
import { upload } from '../middlewares/multer.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { uploadFile, getFileStream } from '../utils/s3.js'
import fs from 'fs'
import xlsx from 'xlsx'
import { Question } from '../models/questionSchema.js'
import { resolve } from 'path'
import { rejects } from 'assert'
import { Subject } from '../models/SubjectsSchema.js'
import { Faculty } from '../models/FacultySchema.js'

const router = express.Router()

router.get('/faculty', async (req, res) => {
  try {
    const faculty = await Faculty.find({}).populate('subjects')
    res.status(200).send(faculty)
  } catch (err) {
    res.status(500).send({ message: 'internal server error' })
  }
})

router.get('/faculty/details', authorizeUser, async (req, res) => {
  try {
    const facultydetails = await Faculty.findById({ _id: req.userId }).populate(
      'subjects'
    )
    res.status(200).send(facultydetails)
  } catch (err) {
    res.status(500).send({ message: 'internal server error' })
  }
})

router.post(
  '/faculty/questionsUpload',
  authorizeUser,
  upload.single('file'),
  async (req, res) => {
    try {
      const { subjectCode } = req.body
      if (!subjectCode) {
        return res.status(401).send({ message: 'please select a subject' })
      }
      const file = req.file
      if (!file) {
        return res
          .status(401)
          .send({ message: 'please upload the Question sheet' })
      }
      const workbook = xlsx.readFile(file.path)
      let workSheets = {}
      async function getSheet(workbook) {
        return new Promise((resolve, reject) => {
          for (const sheetName of workbook.SheetNames) {
            workSheets[sheetName] = xlsx.utils.sheet_to_json(
              workbook.Sheets[sheetName]
            )
          }
          resolve(workSheets)
        })
      }
      await getSheet(workbook)

      const subject = await Subject.findOne({ code: subjectCode })
      const questionObject = {
        facultyId: req.userId,
        subjectId: subject._id,
        questions: workSheets.Sheet1,
      }

      const existingDocument = await Question.findOneAndDelete({
        facultyId: req.userId,
        subjectId: subject._id,
      })

      const newQuestionFile = await new Question(questionObject).save()
      //   const result = await uploadFile(file)
      // console.log(result)
      //  await Faculty.updateOne({ _id: req.userId }, { questionFile: result.Key })
      fs.unlinkSync(file.path)

      res.status(200).send({ message: 'File successfully uploaded' })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Internal server error', err })
    }
  }
)

router.get('/qp/:key', (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res) //pipe this readstream right into the res object -- that will send the data straight to the client
})
export const facultyRouters = router

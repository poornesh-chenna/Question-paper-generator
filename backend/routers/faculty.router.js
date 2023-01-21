import express from 'express'
import { Faculty } from '../models/facultySchema.js'
import { upload } from '../middlewares/multer.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { uploadFile, getFileStream } from '../utils/s3.js'
import fs from 'fs'
import xlsx from 'xlsx'
import { Question } from '../models/questionSchema.js'
import { resolve } from 'path'
import { rejects } from 'assert'
import { Subject } from '../models/SubjectsSchema.js'

const router = express.Router()

router.get('/faculty', async (req, res) => {
  try {
    const faculty = await Faculty.find({}).populate('deptId subjects')
    res.status(200).send(faculty)
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
      const file = req.file
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
      // console.log(questionObject)
      const newQuestionFile = await new Question(questionObject).save()
      //   const result = await uploadFile(file)
      // console.log(result)
      //  await Faculty.updateOne({ _id: req.userId }, { questionFile: result.Key })
      fs.unlinkSync(file.path)

      res
        .status(200)
        .send({ message: 'File successfully uploaded', newQuestionFile })
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

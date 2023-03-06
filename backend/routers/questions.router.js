import express from 'express'
import { Faculty } from '../models/facultySchema.js'
import { Subject } from '../models/SubjectsSchema.js'
import { Question } from '../models/questionSchema.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { generate } from '../utils/generateQuestons.js'
import HtmlDocx from 'html-docx-js'
import fs from 'fs'

const router = express.Router()
const htmlContent = `
  <html>
    <head>
      <title>My HTML to Word Document</title>
    </head>
    <body>
       <div>
        <div style="line-height: 1">
        <p align="center">
          <span>G.PULLA REDDY ENGINEERING COLLEGE(AUTONOMOUS): KURNOOL</span>
          <br/>
          <span>B.TECH V SEMESTER</span>
          <br/>
          <span>SECOND SESSIONAL EXAMINATION NOVEMBER-2022</span>
          <br/>
          <span>DEspanARTMENT OF COMspanUTER SCIENCE AND ENGINEERING</span>
          <br/>
          <span>ARTIFICIAL INTELLIGENCE (AI)</span>
          <br/>
          <span>COMMON FOR CSE & CST</span>
          <br/>
          <span>(SCHEME-2020)</span>
          </p>
        </div>
        <div>Time :</div>
        <div>Date : </div>
        <div style= "text-align: right;">Max Marks : 25</div>
        <p style= "text-align: center;">Section - 1</p>
       
        <table style="width:100%;">
<tr style="width:100%; ">
<td style="width:80%;">1a. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</td>
<td align="right" style="padding-right:40px">6M</td>
</tr>
<tr style="width:100%">
<td>1a. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</td>
<td align="right" style="padding-right:40px">6M</td>
</tr>
</table>
      </div>
    </body>
  </html>
`
// const htmlContent = fs.readFileSync("input.html", "utf-8");

// Convert the HTML file to a Word document
router.get('/convertToWord', async (req, res) => {
  const wordFile = HtmlDocx.asBlob(htmlContent)
  const wordDoc = await wordFile.arrayBuffer()
  // Write the Word file to disk

  const file = fs.writeFileSync(
    Date.now() + 'output.docx',
    Buffer.from(wordDoc)
  )
  return res.status(200).send(file)
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

import navWrapper from '../../components/navbarf'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import DownloadIcon from '@mui/icons-material/Download'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Button from '@mui/material/Button'

import { useEffect } from 'react'
import { Axios } from '../../utils/Axios'
import { useState } from 'react'
import FacultySubjectSelect from '../../components/facultySubjectSelect'
import Examtypeselect from '../../components/examtypeselect'
import { Alert } from '@mui/material'
import downloadDocxFromBase64 from '../../utils/downloadWord'
import { useSnackbar } from 'notistack'

let qp

function FacultySubject() {
  const [questions, setquestions] = useState()

  const [generateDetails, setgenerateDetails] = useState({
    subject: '',
    type: '',
  })

  const [paperDetails, setpaperDetails] = useState()
  const [Date, setDate] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  async function generate() {
    // setquestions(null)
    try {
      const res = await Axios.post('/generateQP', generateDetails)
      console.log('resp ', res.data)
      setpaperDetails(res.data)
      if (generateDetails.type === 'internal1') setquestions(res.data.generated)
      else if (generateDetails.type === 'internal2')
        setquestions(res.data.generated)
      else if (generateDetails.type === 'external')
        setquestions(res.data.generated)
    } catch (err) {
      console.log(err.response.data.message)
      enqueueSnackbar(err.response.data.message, { variant: 'error' })
    }
  }

  async function downloadQP() {
    const res = await Axios.post('convertToWord', {
      htmlContent: qp,
      generateDetails,
    })
    console.log(res)
    downloadDocxFromBase64(res.data, 'qp')
  }
  console.log('paperdetails', paperDetails)
  //const [semester, setSemester] = useState('')
  let semester = ''
  if (paperDetails)
    switch (paperDetails.subjectId.semester) {
      case '1':
        semester = 'FIRST'
        break
      case '2':
        semester = 'SECOND'
        break
      case '3':
        semester = 'THIRD'
        break
      case '4':
        semester = 'FOURTH'
        break
      case '5':
        semester = 'FIFTH'
        break
      case '6':
        semester = 'SIXTH'
        break
      case '7':
        semester = 'SEVENTH'
        break
      case '8':
        semester = 'EIGTH'
        break
      default:
        break
    }
  // console.log(semester)
  if (questions) {
    if (generateDetails.type === 'internal1')
      qp =
        `<html>
  <head>
    <title>My HTML to Word Document</title>
  </head>
  <body>
     <div>
      <div style="line-height: 1">
      <p align="center">
        <span>G.PULLA REDDY ENGINEERING COLLEGE(AUTONOMOUS): KURNOOL</span>
        <br/>
        <span>B.TECH ` +
        semester +
        ` SEMESTER</span>
        <br/>
        <span>FIRST SESSIONAL EXAMINATION</span>
        <br/>
        <span>DEPARTMENT OF ` +
        paperDetails.subjectId.deptId.deptname.toUpperCase() +
        `</span>
        <br/>
        <span>` +
        paperDetails.subjectId.name.toUpperCase() +
        `</span>
        <br/>
        <br/>
        <span>(SCHEME-2020)</span>
        </p>
      </div>
      <div>Time : </div>
      <div>Date : ` +
        Date +
        `</div>
      <div style= "text-align: right;">Max Marks : 25</div>
      <p style= "text-align: center;">Section - 1</p>
     
      <table style="width:100%;"> 1.` +
        questions.unit1
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'

            return (
              '<tr style="width:93%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p align="center">OR</p>
    <table style="width:100%;"> 2. ` +
        questions.unit1c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p style= "text-align: center;">Section - 2</p>
     
      <table style="width:100%;">3.` +
        questions.unit2
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p align="center">OR</p>
    <table style="width:100%;">4.` +
        questions.unit2c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p style= "text-align: center;">Section - 3</p>
     
      <table style="width:100%;">5.` +
        questions.unit3
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p align="center">OR</p>
    <table style="width:100%;">6.` +
        questions.unit3c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>

    </div>
  </body>
</html>`
    else if (generateDetails.type === 'internal2')
      qp =
        `<html>
  <head>
    <title>My HTML to Word Document</title>
  </head>
  <body>
     <div>
      <div style="line-height: 1">
      <p align="center">
        <span>G.PULLA REDDY ENGINEERING COLLEGE(AUTONOMOUS): KURNOOL</span>
        <br/>
        <span>B.TECH ` +
        semester +
        ` SEMESTER</span>
        <br/>
        <span>SECOND SESSIONAL EXAMINATION</span>
        <br/>
        <span>DEPARTMENT OF ` +
        paperDetails.subjectId.deptId.deptname.toUpperCase() +
        `</span>
        <br/>
        <span>` +
        paperDetails.subjectId.name.toUpperCase() +
        `</span>
        <br/>
        
        <span>(SCHEME-2020)</span>
        </p>
      </div>
      <div>Time :</div>
      <div>Date : ` +
        Date +
        `</div>
      <div style= "text-align: right;">Max Marks : 25</div>
      <p style= "text-align: center;">Section - 1</p>
     
      <table style="width:100%;">1.` +
        questions.unit3
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p align="center">OR</p>
    <table style="width:100%;">2.` +
        questions.unit3c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p style= "text-align: center;">Section - 2</p>
     
      <table style="width:100%;">3.` +
        questions.unit4
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p align="center">OR</p>
    <table style="width:100%;">4.` +
        questions.unit4c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p style= "text-align: center;">Section - 3</p>
     
      <table style="width:100%;">5.` +
        questions.unit5
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p align="center">OR</p>
    <table style="width:100%;">6.` +
        questions.unit5c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>

    </div>
  </body>
</html>`
    ////////////////////////////////////////////////////////////////////////////////////////
    else if (generateDetails.type === 'external')
      qp =
        `<html>
<head>
<title>My HTML to Word Document</title>
</head>
<body>
 <div>
  <div style="line-height: 1">
  <p align="center">
    <span>FOUR YEAR B.TECH DEGREE EXAMINATION</span>
    <br/>
    <span>` +
        semester +
        ` SEMESTER EXAMINATION</span>
    
    <br/>
    <span>DEPARTMENT OF ` +
        paperDetails.subjectId.deptId.deptname.toUpperCase() +
        `</span>
    <br/>
    <span>` +
        paperDetails.subjectId.name.toUpperCase() +
        `</span>
    <br/>
    <br/>
    <span>(SCHEME-2020)</span>
    </p>
  </div>
  <div>Time :</div>
  <div>Date : ` +
        Date +
        `</div>
  <div style= "text-align: right;">Max Marks : 25</div>
  <p style= "text-align: center;">Section - 1</p>
 
  <table style="width:100%;">1.` +
        questions.unit1
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
<p align="center">OR</p>
<table style="width:100%;">2.` +
        questions.unit1c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
<p style= "text-align: center;">Section - 2</p>
 
  <table style="width:100%;">3.` +
        questions.unit2
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
<p align="center">OR</p>
<table style="width:100%;">4.` +
        questions.unit2c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
<p style= "text-align: center;">Section - 3</p>
 
  <table style="width:100%;">5.` +
        questions.unit3
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
<p align="center">OR</p>
<table style="width:100%;">6.` +
        questions.unit3c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p style= "text-align: center;">Section - 4</p>
 
  <table style="width:100%;">7.` +
        questions.unit3
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p align="center">OR</p>
<table style="width:100%;">8.` +
        questions.unit4c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p style= "text-align: center;">Section - 5</p>
 
  <table style="width:100%;">9.` +
        questions.unit5
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>
    <p align="center">OR</p>
<table style="width:100%;">10.` +
        questions.unit5c
          .map((item, index) => {
            let q = index === 0 ? 'a' : 'b'
            return (
              '<tr style="width:100%; "> <td style="width:80%;">' +
              q +
              '. ' +
              item.question +
              `</td>` +
              `<td style="width:80%;text-align:right">` +
              item.marks +
              '</td></tr>'
            )
          })
          .join(' ') +
        `</table>

</div>
</body>
</html>`
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }))

  const [subjects, setsubjects] = useState()
  const [subject, setSubject] = useState('')
  const [uploadQP, setuploadQP] = useState({
    file: null,
    subjectCode: '',
  })

  async function getSubjects() {
    const subjects = await (await Axios.get('/faculty/details')).data.subjects
    setsubjects(subjects)
  }

  async function uploadExcel() {
    console.log(1)
    const formData = new FormData()
    formData.append('subjectCode', uploadQP.subjectCode)
    formData.append('file', uploadQP.file)

    const res = await Axios.post('/faculty/questionsUpload', formData, {
      'Content-Type': 'multipart/form-data',
    })
    console.log(res)
  }

  useEffect(() => {
    getSubjects()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Root>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <FacultySubjectSelect
              subjects={subjects}
              subject={subject}
              setSubject={setSubject}
              setuploadQP={setuploadQP}
              setgenerateDetails={setgenerateDetails}
              setquestions={setquestions}
            />
          </div>
        </div>
        <Divider textAlign="left">Upload Questions</Divider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <Button variant="contained" component="label">
              <FileUploadIcon /> Upload Excel Sheet
              <input
                onChange={(e) =>
                  setuploadQP({ ...uploadQP, file: e.target.files[0] })
                }
                hidden
                type="file"
              />
            </Button>
            {uploadQP.file ? (
              <div
                style={{
                  position: 'absolute',
                  display: 'inline-block',
                  marginLeft: '20px',
                }}
              >
                <Alert size="small" severity="success">
                  {uploadQP.file.name}
                </Alert>
              </div>
            ) : (
              ''
            )}
          </div>
          <Button
            style={{ marginTop: '20px' }}
            variant="outlined"
            onClick={uploadExcel}
          >
            Upload
          </Button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <div>
              <DownloadIcon color="primary" />
            </div>
            <div style={{ marginLeft: '10px' }}>
              <a
                style={{ textDecoration: 'none' }}
                href="/static/sampleexcelsheet.xlsx"
                download
              >
                Sample excel sheet
              </a>
            </div>
          </div>
        </div>
        <Divider textAlign="left">Generate Question Paper</Divider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              margin: '20px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <div style={{ marginRight: '20px' }}>
              <Examtypeselect
                setgenerateDetails={setgenerateDetails}
                generateDetails={generateDetails}
                setquestions={setquestions}
              />
            </div>
            <div>
              <div>
                <input
                  style={{
                    margin: '0.4rem 0',
                    borderRadius: '4px',
                    border: '1px solid #C4C4C4',
                    padding: '8px',
                    height: '50px',
                  }}
                  type="date"
                  id="start"
                  name="trip-start"
                  // value="2018-07-22"
                  min="2018-01-01"
                  max="2030-12-31"
                  onChange={(e) => {
                    setDate(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>

          <Button onClick={generate} variant="contained">
            Generate
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{ width: '70%' }}
            dangerouslySetInnerHTML={{ __html: qp }}
          ></div>
          {questions ? (
            <Button
              variant="contained"
              sx={{ marginTop: '20px' }}
              onClick={downloadQP}
            >
              Download
            </Button>
          ) : (
            ''
          )}
        </div>
      </Root>
    </Box>
  )
}

export const facultysubject = navWrapper(<FacultySubject />)

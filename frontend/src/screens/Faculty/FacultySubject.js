import navWrapper from '../../components/navbarf'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'

import Button from '@mui/material/Button'

import { useEffect } from 'react'
import { Axios } from '../../utils/Axios'
import { useState } from 'react'
import FacultySubjectSelect from '../../components/facultySubjectSelect'
import Examtypeselect from '../../components/examtypeselect'
import { Alert } from '@mui/material'

let mid
function downloadDocxFromBase64(base64String, fileName) {
  const linkSource = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64String}`
  const downloadLink = document.createElement('a')
  document.body.appendChild(downloadLink)

  downloadLink.href = linkSource
  downloadLink.download = fileName
  downloadLink.click()
  document.body.removeChild(downloadLink)
}
function FacultySubject() {
  const [midquestions, setmidquestions] = useState()

  const [generateDetails, setgenerateDetails] = useState({
    subject: '',
    type: '',
  })

  async function generate() {
    setmidquestions(null)
    setsemquestions(null)
    console.log(generateDetails)
    const res = await Axios.post('/generateQP', generateDetails)
    if (generateDetails.type === 'internal1') setmidquestions(res.data)
    else if (generateDetails.type === 'internal2') setmidquestions(res.data)
    else if (generateDetails.type === 'external') setsemquestions(res.data)
  }

  async function downloadQP() {
    const res = await Axios.post('convertToWord', { htmlContent: mid })
    console.log(res)
    downloadDocxFromBase64(res.data, 'qp')
  }
  if (midquestions)
    mid =
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
     
      <table style="width:100%;">` +
      midquestions.unit1
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
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
    <table style="width:100%;">` +
      midquestions.unit1c
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
    <p style= "text-align: center;">Section - 2</p>
     
      <table style="width:100%;">` +
      midquestions.unit2
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
    <p align="center">OR</p>
    <table style="width:100%;">` +
      midquestions.unit2c
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
    <p style= "text-align: center;">Section - 3</p>
     
      <table style="width:100%;">` +
      midquestions.unit3
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
    <p align="center">OR</p>
    <table style="width:100%;">` +
      midquestions.unit3c
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>

    </div>
  </body>
</html>`

  const [semquestions, setsemquestions] = useState()
  let sem
  if (semquestions)
    sem =
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
 
  <table style="width:100%;">` +
      semquestions.unit1
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
<p align="center">OR</p>
<table style="width:100%;">` +
      semquestions.unit1c
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
<p style= "text-align: center;">Section - 2</p>
 
  <table style="width:100%;">` +
      semquestions.unit2
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
<p align="center">OR</p>
<table style="width:100%;">` +
      semquestions.unit2c
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
<p style= "text-align: center;">Section - 3</p>
 
  <table style="width:100%;">` +
      semquestions.unit3
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
<p align="center">OR</p>
<table style="width:100%;">` +
      semquestions.unit3c
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
    <p style= "text-align: center;">Section - 4</p>
 
  <table style="width:100%;">` +
      semquestions.unit3
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
    <p align="center">OR</p>
<table style="width:100%;">` +
      semquestions.unit4c
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
    <p style= "text-align: center;">Section - 5</p>
 
  <table style="width:100%;">` +
      semquestions.unit5
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>
    <p align="center">OR</p>
<table style="width:100%;">` +
      semquestions.unit5c
        .map((item, index) => {
          return (
            '<tr style="width:100%; "> <td style="width:80%;">' +
            item.question +
            `</td>` +
            `<td style="width:80%;">` +
            item.marks +
            '</td></tr>'
          )
        })
        .join(' ') +
      `</table>

</div>
</body>
</html>`

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
              Upload Excel Sheet
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
                  succesfully uploaded the file
                </Alert>
              </div>
            ) : (
              ''
            )}
          </div>
          <Button onClick={uploadExcel}>Upload</Button>
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
          <div style={{ marginBottom: '20px' }}>
            <Examtypeselect
              setgenerateDetails={setgenerateDetails}
              generateDetails={generateDetails}
            />
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
            dangerouslySetInnerHTML={{ __html: midquestions ? mid : sem }}
          ></div>
          {midquestions ? (
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

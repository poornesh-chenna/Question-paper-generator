import navWrapper from '../../components/Navbar'
import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import Addsubject from '../../components/Addsubject'
import styles from '../../styles/login.module.css'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  ></Box>
)
function BasicCard() {
  const [subjectDetails, setsubjectDetails] = useState()
  const [deptDetails, setdeptDetails] = useState({
    deptname: '',
    dept: '',
    faculty: [],
  })
  const [newSubject, setnewSubject] = useState({
    name: '',
    code: '',
    year: '',
    semester: '',
    dept: '',
    faculty: [],
  })

  const location = useLocation()
  // console.log(location.state.subjects)
  useEffect(() => {
    setsubjectDetails(location.state.subjects)
    setdeptDetails({
      deptname: location.state.deptname,
      dept: location.state.dept,
      faculty: location.state.faculty,
    })
    setnewSubject({ ...newSubject, dept: location.state.dept })
  }, [])
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Addsubject
          subject={newSubject}
          setSubject={setnewSubject}
          name="Add subject"
          deptDetails={deptDetails}
        ></Addsubject>
      </div>
      <div className={styles.cardstyle}>
        {subjectDetails &&
          subjectDetails.map((item, idx) => {
            return (
              <div key={idx} style={{ marginRight: '50px', marginLeft: '0px' }}>
                <Card sx={{ width: '20rem' }}>
                  <CardContent sx={{ width: '25rem' }}>
                    <Typography sx={{ fontSize: '18px', lineHeight: '1.8rem' }}>
                      Name : {item.name}
                      <br></br>
                      Subject code : {item.code}
                      <br></br>
                      Year : {item.year}
                      <br></br>
                      Semester: {item.semester}
                      <br></br>
                      Department : {deptDetails.dept}
                      <br></br>
                      Faculty :{' '}
                      {item.facultyId.map((faculty, idx) => (
                        <div style={{ marginLeft: '20px' }} key={idx}>
                          <span>-</span> {faculty.name}
                        </div>
                      ))}
                      {/* {item.facultyId[0].name} */}
                      <br></br>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        {/* <div>
          <Card sx={{ width: "300px" }}>
            <CardContent sx={{ width: "300px" }}>
              <Typography>
                Name :<br></br>
                Subject code :<br></br>
                Year :<br></br>
                Semester: <br></br>
                Department :<br></br>
                Faculty :<br></br>
              </Typography>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}

function Subject() {
  return <BasicCard></BasicCard>
}
export const subject = navWrapper(<Subject />)

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
import Addfaculty from '../../components/Addfaculty'
import { useState } from 'react'
import { useEffect } from 'react'
import { Axios } from '../../utils/Axios'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  ></Box>
)
function BasicCard() {
  const [facultyDetails, setfacultyDetails] = useState()
  const [toggle, settoggle] = useState(false)
  const [newfaculty, setnewfaculty] = useState({
    facultyId: '',
    name: '',
    email: '',
    password: '',
    dept: '',
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get('/faculty')
        setfacultyDetails(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [toggle])

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Addfaculty
          facultyDetails={newfaculty}
          setfacultyDetails={setnewfaculty}
          name="Add Faculty"
          settoggle={settoggle}
        ></Addfaculty>
      </div>
      <div className={styles.cardstyle}>
        {facultyDetails &&
          facultyDetails.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  marginRight: '50px',
                  marginLeft: '0px',
                  marginBottom: '10px',
                }}
              >
                <Card sx={{ width: '300px' }}>
                  <CardContent sx={{ width: '300px' }}>
                    <Typography>
                      Faculty ID: {item.facultyId}
                      <br></br>
                      Name: {item.name}
                      <br></br>
                      Email: {item.email}
                      <br></br>
                      Department: {item.dept}
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

var details = [
  {
    index: '1',
    Facultyid: '209X1A',
    name: ' Kasi Viswanath ',
    email: 'kassiviswanath@gprec.ac.in',
    password: 'gprec123',
    dept: 'CSE',
  },
]

function Admin_Faculty() {
  return <BasicCard></BasicCard>
}
export const afaculty = navWrapper(<Admin_Faculty />)

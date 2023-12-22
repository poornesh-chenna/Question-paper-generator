import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import Loginform from '../components/Loginform'
import { Axios } from '../utils/Axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function Login() {
  const { enqueueSnackbar } = useSnackbar()

  const [isFaculty, setFaculty] = useState(false)
  const [details, setdetails] = useState({
    email: '',
    password: '',
  })
  const [facultydetails, setfacultydetails] = useState({
    email: '',
    password: '',
  })
  const [passwordReset, setpasswordReset] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const navigate = useNavigate()
  const adminLogin = async () => {
    try {
      const res = await Axios.post('/admin/login', details)
      if (res) {
        enqueueSnackbar('Successfully Logged in', {
          variant: 'success',
          autoHideDuration: 1000,
        })
        navigate('/admin/dept')
      }
    } catch (err) {
      console.log(err.response.data.message)
      enqueueSnackbar(err.response.data.message, { variant: 'error' })
    }
  }
  const facultyLogin = async () => {
    try {
      const res = await Axios.post('/faculty/login', facultydetails)
      localStorage.setItem('jwtKey', res.data.jwtToken)
      console.log('a')
      if (res) {
        enqueueSnackbar('Successfully Logged in', {
          variant: 'success',
          autoHideDuration: 3000,
        })
        console.log('c')
        navigate('/faculty/subjects')
      }
    } catch (err) {
      console.log(err.response.data.message)
      enqueueSnackbar(err.response.data.message, { variant: 'error' })
    }
  }
  const handleResetPassword = async () => {
    try {
      if (passwordReset.newPassword !== passwordReset.confirmPassword) {
        enqueueSnackbar('confirm password does not match with new password', {
          variant: 'error',
          autoHideDuration: 3000,
        })
        return
      }
      const res = await Axios.post('/changePassword', passwordReset)
      if (res) {
        console.log(res)
        enqueueSnackbar('Successfully Changed the password', {
          variant: 'success',
          autoHideDuration: 3000,
        })
        setpasswordReset({
          email: '',
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        handleClose()
      }
    } catch (err) {
      console.log(err.response.data.message)
      enqueueSnackbar(err.response.data.message, {
        variant: 'error',
        autoHideDuration: 3000,
      })
    }
  }
  const shadow = {
    border: '5px solid #1F3E59',
  }

  return (
    <div className={styles.login}>
      <div
        style={{
          marginRight: '220px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '40px',
        }}
      >
        <span
          style={{
            backgroundColor: 'white',
            color: '#27415B',
            marginBottom: '10px',
          }}
        >
          AUTOMATIC QUESTION
        </span>
        <br></br>
        <span style={{ backgroundColor: 'white', color: '#27415B' }}>
          PAPER GENERATOR
        </span>
      </div>
      <div className={styles.tab}>
        <div className={styles.avatar}>
          <div
            style={{
              marginRight: '145px',
            }}
          >
            <button
              onClick={() => setFaculty(false)}
              style={!isFaculty ? shadow : null}
            >
              <img
                height="100px"
                width="100px"
                src="static\images\admin.png"
                alt="admin img"
              ></img>
            </button>
            <div style={{ textAlign: 'center' }}>Admin</div>
          </div>
          <div>
            <button
              onClick={() => setFaculty(true)}
              style={isFaculty ? shadow : null}
            >
              <img
                height="100px"
                width="100px"
                src="static\images\teacher.png"
                alt="teacher img"
              ></img>
            </button>
            <div style={{ textAlign: 'center' }}>Faculty</div>
          </div>
        </div>
        {!isFaculty ? (
          <Loginform
            details={details}
            setdetails={setdetails}
            onClick={adminLogin}
            heading="ADMIN LOGIN"
            value={details}
          />
        ) : (
          <div>
            <Loginform
              details={facultydetails}
              setdetails={setfacultydetails}
              onClick={facultyLogin}
              heading="FACULTY LOGIN"
              value={facultydetails}
            />
            <div>
              <Button
                style={{ display: 'flex', margin: '0 auto' }}
                onClick={handleOpen}
              >
                Change password
              </Button>
              <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={handleClose}
                closeAfterTransition
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Reset password
                  </Typography>

                  <TextField
                    onChange={(e) => {
                      setpasswordReset((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }}
                    style={{ margin: '20px 0' }}
                    fullWidth
                    label="Email"
                    type="email"
                    required
                  />
                  <TextField
                    onChange={(e) => {
                      setpasswordReset((prev) => ({
                        ...prev,
                        oldPassword: e.target.value,
                      }))
                    }}
                    fullWidth
                    label="Old Password"
                    type="password"
                    required
                  />
                  <TextField
                    onChange={(e) => {
                      setpasswordReset((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }}
                    style={{ display: 'block', margin: '20px 0' }}
                    fullWidth
                    label="New Password"
                    type="password"
                    required
                  />
                  <TextField
                    onChange={(e) => {
                      setpasswordReset((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }}
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    required
                  />
                  <div>
                    <button
                      style={{
                        display: 'flex',
                        margin: '10px auto 0 auto',
                        padding: '10px 18px',
                        backgroundColor: '#4E4FEB',
                        borderRadius: '8px',
                        color: 'white',
                        boxShadow:
                          'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
                      }}
                      onClick={handleResetPassword}
                    >
                      Reset
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Login

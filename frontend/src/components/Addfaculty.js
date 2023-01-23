import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Inputfield from './Inputfield'
import styles from '../styles/login.module.css'
import { useState } from 'react'
import MultipleSelectChip from './Departmentselect'
import TextField from '@mui/material/TextField'
import { Axios } from '../utils/Axios'

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
function Addfaculty({ name, facultyDetails, setfacultyDetails, settoggle }) {
  return (
    <TransitionsModal
      name={name}
      facultyDetails={facultyDetails}
      setfacultyDetails={setfacultyDetails}
      settoggle={settoggle}
    />
  )
}

function TransitionsModal({
  name,
  facultyDetails,
  setfacultyDetails,
  settoggle,
}) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const addFaculty = async () => {
    try {
      const response = await Axios.post('/faculty/register', facultyDetails)
      console.log(response.data.message)
      settoggle((prevState) => !prevState)
    } catch (err) {
      console.log(err.response.data.message)
    }
    handleClose()
  }
  return (
    <div>
      <Button variant="contained" sx={{ padding: '8px' }} onClick={handleOpen}>
        {name}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Enter the faculty details
            </Typography>
            <br></br>
            <Inputfield
              onChange={(e) =>
                setfacultyDetails({
                  ...facultyDetails,
                  facultyId: e.target.value,
                })
              }
              name="Faculty Id"
            />
            <br></br>
            <Inputfield
              onChange={(e) =>
                setfacultyDetails({ ...facultyDetails, name: e.target.value })
              }
              name="Enter the name"
            />
            <br></br>
            <Inputfield
              onChange={(e) =>
                setfacultyDetails({ ...facultyDetails, email: e.target.value })
              }
              name="Enter the email"
            />
            <br></br>
            <TextField
              sx={{ width: '100%' }}
              id="outlined-password-input"
              label="Password"
              type="password"
              onChange={(e) =>
                setfacultyDetails({
                  ...facultyDetails,
                  password: e.target.value,
                })
              }
              autoComplete="current-password"
            />
            <br></br>
            <br></br>
            <MultipleSelectChip
              facultyDetails={facultyDetails}
              setfacultyDetails={setfacultyDetails}
              settoggle={settoggle}
              sx={{ width: '100%' }}
            ></MultipleSelectChip>
            <button onClick={addFaculty} className={styles.loginbutton}>
              Submit
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
export default Addfaculty

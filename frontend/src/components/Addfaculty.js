import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Inputfield from "./Inputfield";
import styles from "../styles/login.module.css";
import { useState } from "react";
import MultipleSelectChip from "./Departmentselect";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Addfaculty(props) {
  return <TransitionsModal name={props.name} />;
}

function TransitionsModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>{props.name}</Button>
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
            <Inputfield name="Faculty Id" />
            <br></br>
            <Inputfield name="Enter the name" />
            <br></br>
            <Inputfield name="Enter the email" />
            <br></br>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <br></br>
            <MultipleSelectChip sx={{ width: "100%" }}></MultipleSelectChip>
            <button onClick={handleClose} className={styles.loginbutton}>
              Submit
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default Addfaculty;

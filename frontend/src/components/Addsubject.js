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
import MultipleSelectChip from "./Facultyselect";
import { Axios } from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

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
function Addsubject({ name, subject, setSubject, deptDetails }) {
  return (
    <TransitionsModal
      name={name}
      subject={subject}
      setSubject={setSubject}
      deptDetails={deptDetails}
    />
  );
}

function TransitionsModal({ name, subject, setSubject, deptDetails }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const addSubject = async () => {
    try {
      console.log(subject);
      const response = await Axios.post("/subject/register", subject);
      navigate("/admin/dept");
      console.log(response.data.message);
      enqueueSnackbar("Subject added successfully", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (err) {
      console.log(err.response.data.message);
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    }
    handleClose();
  };
  return (
    <div>
      <Button variant="contained" sx={{ padding: "8px" }} onClick={handleOpen}>
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
              Enter the subject details
            </Typography>
            <br></br>
            <Inputfield
              onChange={(e) => setSubject({ ...subject, name: e.target.value })}
              name="Enter the Subject name"
            />
            <br></br>
            <Inputfield
              onChange={(e) => setSubject({ ...subject, code: e.target.value })}
              name="Enter the subject code"
            />
            <br></br>
            <Inputfield
              type="number"
              onChange={(e) => setSubject({ ...subject, year: e.target.value })}
              name="Enter the year"
            />
            <br></br>
            <Inputfield
              onChange={(e) =>
                setSubject({ ...subject, semester: e.target.value })
              }
              name="Enter the semester"
            />
            <br></br>
            <MultipleSelectChip
              deptDetails={deptDetails}
              setSubject={setSubject}
              subject={subject}
            ></MultipleSelectChip>
            <button onClick={addSubject} className={styles.loginbutton}>
              Submit
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default Addsubject;

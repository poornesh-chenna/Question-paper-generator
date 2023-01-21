import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Inputfield from "./Inputfield";
import styles from "../styles/login.module.css";
import { Axios } from "../utils/Axios";
import { useState } from "react";

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
function Adddepartment(props) {
  return <TransitionsModal name={props.name} />;
}

function TransitionsModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [department, setdepartment] = useState({
    deptname: "",
    dept: "",
  });

  // console.log(department);
  const addDepartment = async () => {
    try {
      const response = await Axios.post("/dept/register", department);
      console.log(response.data.message);
    } catch (err) {
      console.log(err.response.data.message);
    }
    // handleClose();
  };
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
              Enter the details
            </Typography>
            <br></br>
            <Inputfield
              onChange={(e) =>
                setdepartment((prevState) => {
                  console.log(department);
                  return {
                    ...prevState,
                    deptname: e.target.value,
                  };
                })
              }
              name="Enter the department name"
            />
            <br></br>
            <Inputfield
              onChange={(e) =>
                setdepartment((prevState) => {
                  console.log(department);
                  return {
                    ...prevState,
                    dept: e.target.value,
                  };
                })
              }
              name="Enter dept code"
            />
            <button
              onClick={(addDepartment, handleClose)}
              className={styles.loginbutton}
            >
              Submit
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default Adddepartment;

import React, { useState } from "react";
import styles from "../styles/login.module.css";
import Loginform from "../components/Loginform";
import { Axios } from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function Login() {
  const { enqueueSnackbar } = useSnackbar();

  const [isFaculty, setFaculty] = useState(false);
  const [details, setdetails] = useState({
    email: "",
    password: "",
  });
  const [facultydetails, setfacultydetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const adminLogin = async () => {
    try {
      const res = await Axios.post("/admin/login", details);
      if (res) {
        enqueueSnackbar("Successfully Logged in", {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/admin/dept");
      }
    } catch (err) {
      console.log(err.response.data.message);
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    }
  };
  const facultyLogin = async () => {
    try {
      const res = await Axios.post("/faculty/login", facultydetails);
      localStorage.setItem("jwtKey", res.data.jwtToken);
      if (res) {
        enqueueSnackbar("Successfully Logged in", {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/faculty/subjects");
      }
    } catch (err) {
      console.log(err.response.data.message);
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    }
  };
  const shadow = {
    border: "5px solid #1F3E59",
  };

  return (
    <div className={styles.login}>
      {/* <div className={styles.tab} >
            <div className={styles.images}>
               <button style={{backgroundColor:"white"}} onClick={()=>setFaculty(false)}><Icon link="static\images\faculty.png"></Icon></button>
               <button style={{backgroundColor:"white"}} onClick={changeState}><Icon link="static\images\faculty.png"></Icon></button>
            </div>
            {
                !isFaculty?<Loginform heading="FACULTY LOGIN"/>:<Loginform heading="ADMIN LOGIN"/>

            }
        </div> */}
      <div
        style={{
          marginRight: "220px",
          color: "white",
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >
        <span
          style={{
            backgroundColor: "white",
            color: "#27415B",
            marginBottom: "10px",
          }}
        >
          AUTOMATIC QUESTION
        </span>
        <br></br>
        <span style={{ backgroundColor: "white", color: "#27415B" }}>
          PAPER GENERATOR
        </span>
      </div>
      <div className={styles.tab}>
        <div className={styles.avatar}>
          <div
            style={{
              marginRight: "145px",
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
            <div style={{ textAlign: "center" }}>Admin</div>
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
            <div style={{ textAlign: "center" }}>Faculty</div>
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
          <Loginform
            details={facultydetails}
            setdetails={setfacultydetails}
            onClick={facultyLogin}
            heading="FACULTY LOGIN"
            value={facultydetails}
          />
        )}
      </div>
    </div>
  );
}
export default Login;

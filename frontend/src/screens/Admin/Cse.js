import navWrapper from "../../components/Navbar";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Addsubject from "../../components/Addsubject";
import styles from "../../styles/login.module.css";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);
function BasicCard() {
  return (
    <div>
      <div>
        <Addsubject name="Add subject"></Addsubject>
      </div>
      <div className={styles.cardstyle}>
        {details.map((item, index) => {
          return (
            <div style={{ marginRight: "50px", marginLeft: "0px" }}>
              <Card sx={{ width: "300px" }}>
                <CardContent sx={{ width: "300px" }}>
                  <Typography>
                    Name :{item.name}
                    <br></br>
                    Subject code :{item.code}
                    <br></br>
                    Year :{item.year}
                    <br></br>
                    Semester: {item.semester}
                    <br></br>
                    Department :{item.dept}
                    <br></br>
                    Faculty :{item.faculties[0]}
                    <br></br>
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
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
  );
}

var details = [
  {
    index: "1",
    name: "Formal Language and Automata Theory",
    code: "FLAT",
    year: "3",
    semester: "3",
    dept: "CSE",
    faculties: ["Ishtaq Ahmed", "Sridevi", "Sri Lakshmi"],
  },
];

function Cse() {
  return <BasicCard></BasicCard>;
}
export const dcse = navWrapper(<Cse />);

import navWrapper from "../../components/navbarf";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";
import Adddepartment from "../../components/Adddepartment";
import { useEffect } from "react";
import { Axios } from "../../utils/Axios";
import { useState } from "react";
import MultipleSelectChip from "../../components/facultySubjectSelect";
import { flexbox } from "@mui/system";

function UploadButtons() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload Excel Sheet
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </Stack>
  );
}

function FacultySubject() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) + :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));
  // const [newdepartment, setnewDepartment] = useState({
  //   deptname: "",
  //   dept: "",
  // });
  // const [toggle, setToggle] = useState(false);

  // const [departments, setdepartments] = useState(null);
  // useEffect(() => {
  //   const fetchDepts = async () => {
  //     const depts = await Axios.get("/departments");
  //     setdepartments(depts.data);
  //   };
  //   fetchDepts();
  // }, [toggle]);

  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%" }}>
      {/* {
        <Adddepartment
         department={newdepartment}
         setdepartment={setnewDepartment}
         setToggle={setToggle}
         name="Add Department"
        />
      }
      <br></br>
      {<Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {departments &&
          departments.map((item, index) => {
            return (
              <Grid key={index} item xs={6} sx={{ width: "50px" }}>
                <Item
                  sx={{ padding: "20px", fontSize: "16px" }}
                  onClick={() => navigate(item.dept)}
                >
                  {item.deptname}
                </Item>
              </Grid>
            );
          })}
      </Grid> } */}

      <Root>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <MultipleSelectChip type="Select Subject"></MultipleSelectChip>
          </div>
        </div>
        <Divider textAlign="left">Upload Questions</Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <UploadButtons></UploadButtons>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div>
              <DownloadIcon color="primary" />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <a
                style={{ textDecoration: "none" }}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <MultipleSelectChip type="Select type"></MultipleSelectChip>
          </div>
          <Button variant="contained">Generate Question Paper</Button>
        </div>
      </Root>
    </Box>
  );
}

export const facultysubject = navWrapper(<FacultySubject />);

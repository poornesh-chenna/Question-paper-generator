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
import FacultySubjectSelect from "../../components/facultySubjectSelect";
import Examtypeselect from "../../components/examtypeselect";
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
  const midquestions = {
    unit1: [
      {
        question: "1oiw",
        marks: "4",
      },
      {
        question: "1qrwer",
        marks: "5",
      },
    ],
    unit1c: [
      {
        question: "1lfksaj",
        marks: "4",
      },
      {
        question: "1nm ",
        marks: "5",
      },
    ],
    unit2: [
      {
        question: "2kvsv",
        marks: "4",
      },
      {
        question: "2fewq",
        marks: "4",
      },
    ],
    unit2c: [
      {
        question: "2fds",
        marks: "8",
      },
    ],
    unit3: [
      {
        question: "3.1jksdn",
        marks: "4",
      },
      {
        question: "3.1kjsd",
        marks: "4",
      },
    ],
    unit3c: [
      {
        question: "3.1jksdn",
        marks: "4",
      },
      {
        question: "3.1jksdn",
        marks: "4",
      },
    ],
  };
  const mid =
    `<html>
  <head>
    <title>My HTML to Word Document</title>
  </head>
  <body>
     <div>
      <div style="line-height: 1">
      <p align="center">
        <span>G.PULLA REDDY ENGINEERING COLLEGE(AUTONOMOUS): KURNOOL</span>
        <br/>
        <span>B.TECH V SEMESTER</span>
        <br/>
        <span>SECOND SESSIONAL EXAMINATION NOVEMBER-2022</span>
        <br/>
        <span>DEspanARTMENT OF COMspanUTER SCIENCE AND ENGINEERING</span>
        <br/>
        <span>ARTIFICIAL INTELLIGENCE (AI)</span>
        <br/>
        <span>COMMON FOR CSE & CST</span>
        <br/>
        <span>(SCHEME-2020)</span>
        </p>
      </div>
      <div>Time :</div>
      <div>Date : </div>
      <div style= "text-align: right;">Max Marks : 25</div>
      <p style= "text-align: center;">Section - 1</p>
     
      <table style="width:100%;">` +
    midquestions.unit1
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
    <p align="center">OR</p>
    <table style="width:100%;">` +
    midquestions.unit1c
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
    <p style= "text-align: center;">Section - 2</p>
     
      <table style="width:100%;">` +
    midquestions.unit2
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
    <p align="center">OR</p>
    <table style="width:100%;">` +
    midquestions.unit2c
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
    <p style= "text-align: center;">Section - 3</p>
     
      <table style="width:100%;">` +
    midquestions.unit3
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
    <p align="center">OR</p>
    <table style="width:100%;">` +
    midquestions.unit3c
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>

    </div>
  </body>
</html>`;
  const semquestions = {
    unit1: [
      {
        question: "1oiw",
        marks: "6",
      },
      {
        question: "1qrwer",
        marks: "6",
      },
    ],
    unit1c: [
      {
        question: "1lfksaj",
        marks: "6",
      },
      {
        question: "1nm ",
        marks: "6",
      },
    ],
    unit2: [
      {
        question: "2kvsv",
        marks: "6",
      },
      {
        question: "2fewq",
        marks: "6",
      },
    ],
    unit2c: [
      {
        question: "2fds",
        marks: "12",
      },
    ],
    unit3: [
      {
        question: "3.1jksdn",
        marks: "6",
      },
      {
        question: "3.1kjsd",
        marks: "6",
      },
    ],
    unit3c: [
      {
        question: "3.1jksdn",
        marks: "6",
      },
      {
        question: "3.1jksdn",
        marks: "6",
      },
    ],
    unit4: [
      {
        question: "3.1jksdn",
        marks: "12",
      },
    ],
    unit4c: [
      {
        question: "3.1jksdn",
        marks: "6",
      },
      {
        question: "3.1jksdn",
        marks: "6",
      },
    ],
    unit5: [
      {
        question: "3.1jksdn",
        marks: "6",
      },
      {
        question: "3.1jksdn",
        marks: "6",
      },
    ],
    unit5c: [
      {
        question: "3.1jksdn",
        marks: "6",
      },
      {
        question: "3.1jksdn",
        marks: "6",
      },
    ],
  };
  const sem =
    `<html>
<head>
<title>My HTML to Word Document</title>
</head>
<body>
 <div>
  <div style="line-height: 1">
  <p align="center">
    <span>G.PULLA REDDY ENGINEERING COLLEGE(AUTONOMOUS): KURNOOL</span>
    <br/>
    <span>B.TECH V SEMESTER</span>
    <br/>
    <span>SECOND SESSIONAL EXAMINATION NOVEMBER-2022</span>
    <br/>
    <span>DEspanARTMENT OF COMspanUTER SCIENCE AND ENGINEERING</span>
    <br/>
    <span>ARTIFICIAL INTELLIGENCE (AI)</span>
    <br/>
    <span>COMMON FOR CSE & CST</span>
    <br/>
    <span>(SCHEME-2020)</span>
    </p>
  </div>
  <div>Time :</div>
  <div>Date : </div>
  <div style= "text-align: right;">Max Marks : 25</div>
  <p style= "text-align: center;">Section - 1</p>
 
  <table style="width:100%;">` +
    semquestions.unit1
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
<p align="center">OR</p>
<table style="width:100%;">` +
    semquestions.unit1c
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
<p style= "text-align: center;">Section - 2</p>
 
  <table style="width:100%;">` +
    semquestions.unit2
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
<p align="center">OR</p>
<table style="width:100%;">` +
    semquestions.unit2c
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
<p style= "text-align: center;">Section - 3</p>
 
  <table style="width:100%;">` +
    semquestions.unit3
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
<p align="center">OR</p>
<table style="width:100%;">` +
    semquestions.unit3c
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
    <p style= "text-align: center;">Section - 4</p>
 
  <table style="width:100%;">` +
    semquestions.unit3
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
    <p align="center">OR</p>
<table style="width:100%;">` +
    semquestions.unit4c
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
    <p style= "text-align: center;">Section - 5</p>
 
  <table style="width:100%;">` +
    semquestions.unit5
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>
    <p align="center">OR</p>
<table style="width:100%;">` +
    semquestions.unit5c
      .map((item, index) => {
        return (
          '<tr style="width:100%; "> <td style="width:80%;">' +
          item.question +
          `</td>` +
          `<td style="width:80%;">` +
          item.marks +
          "</td></tr>"
        );
      })
      .join(" ") +
    `</table>

</div>
</body>
</html>`;
  console.log(sem);

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

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
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
            <FacultySubjectSelect />
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
            <Examtypeselect />
          </div>
          <Button variant="contained">Generate Question Paper</Button>
        </div>
        <div>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>G.PULLA REDDY ENGINEERING COLLEGE(AUTONOMOUS): KURNOOL</p>
            <p>B.TECH V SEMESTER</p>
            <p>SECOND SESSIONAL EXAMINATION NOVEMBER-2022</p>
            <p>DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</p>
            <p>ARTIFICIAL INTELLIGENCE (AI)</p>
            <p>COMMON FOR CSE & CST</p>
            <p>(SCHEME-2020)</p>
          </div>
          <div>Time :</div>
          <div>Date : </div>
          <div style={{ textAlign: "right" }}>Max Marks : 25</div>
          <p style={{ textAlign: "center" }}>Section - 1</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>1a. What is AI</p>
            <p>6M</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>1b. What is AI</p>
            <p>6M</p>
          </div>
          <p style={{ textAlign: "center" }}>Section - 2</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>2a. What is AI</p>
            <p>6M</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>2b. What is AI</p>
            <p>6M</p>
          </div>
          <p style={{ textAlign: "center" }}>Section - 3</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>3a. What is AI</p>
            <p>6M</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>3b. What is AI</p>
            <p>6M</p>
          </div> */}
        </div>
      </Root>
    </Box>
  );
}

export const facultysubject = navWrapper(<FacultySubject />);

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
          <div
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
          </div>
        </div>
      </Root>
    </Box>
  );
}

export const facultysubject = navWrapper(<FacultySubject />);

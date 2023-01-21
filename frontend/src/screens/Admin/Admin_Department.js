import navWrapper from "../../components/Navbar";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import Adddepartment from "../../components/Adddepartment";

function Admin_Department() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const department = [
    {
      name: "Computer Science and Engineering",
      dept: "CSE",
    },
    // {
    //    name: "Electronics and Communication and Engineering",
    //    dept: "ECE",
    // },
    // {
    //    name: "Mechanical Engineering",
    //    dept: "MECH",
    // },
    // {
    //    name: "Electrical and Electronics Engineering",
    //    dept: "EEE",
    // },
  ];
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "70%" }}>
      {<Adddepartment name="Add Department" />}
      <br></br>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {department.map((item, index) => {
          return (
            <Grid key={index} item xs={6} sx={{ width: "50px" }}>
              <Item
                sx={{ padding: "20px", fontSize: "16px" }}
                onClick={() => navigate(item.dept)}
              >
                {item.name}
              </Item>
            </Grid>
          );
        })}
        {/* <Grid item xs={6}>
        <Item onClick={()=>navigate('/CSE')}>CSE</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>ECE</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>EEE</Item>
      </Grid>
      <Grid item xs={6}>
        <Item>MECH</Item>
      </Grid> */}
      </Grid>
    </Box>
  );
}

export const dept = navWrapper(<Admin_Department />);

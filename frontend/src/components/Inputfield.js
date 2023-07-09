import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Inputfield(props) {
  return (
    <Box
      sx={{
        width: "500px",
        maxWidth: "100%",
      }}
    >
      <TextField
        //error
        onChange={props.onChange}
        fullWidth
        label={props.name}
        id="fullWidth"
        type={props.type}
        value={props.value}
        required
        //helperText="Please enter ."
      />
    </Box>
  );
}

export default Inputfield;

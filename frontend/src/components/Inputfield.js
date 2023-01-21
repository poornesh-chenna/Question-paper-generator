import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Inputfield(props)
{
    return <FullWidthTextField name={props.name}/>;
}
function FullWidthTextField(props) {
  return (
    <Box
      sx={{
        width: '500px',
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label={props.name} id="fullWidth" />
    </Box>
  );
}
export default Inputfield;

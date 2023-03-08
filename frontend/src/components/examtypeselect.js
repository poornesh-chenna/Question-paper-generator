import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function Examtypeselect({ setgenerateDetails, generateDetails }) {
  const handleChange = (event) => {
    setgenerateDetails((prev) => ({
      ...prev,
      type: event.target.value,
    }))
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Select Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={generateDetails.type}
          onChange={handleChange}
          autoWidth
          label="Select Type"
        >
          <MenuItem value={'internal1'}>Internal-1 Examination</MenuItem>
          <MenuItem value={'internal2'}>Internal-2 Examination</MenuItem>
          <MenuItem value={'external'}>External Examination</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default Examtypeselect

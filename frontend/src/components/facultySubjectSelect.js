import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function FacultySubjectSelect({
  subjects,
  setSubject,
  subject,
  setuploadQP,
  setgenerateDetails,
}) {
  const handleChange = (event) => {
    setSubject(event.target.value)
    setuploadQP((prev) => ({
      ...prev,
      subjectCode: event.target.value,
    }))
    setgenerateDetails((prev) => ({
      ...prev,
      subject: event.target.value,
    }))
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Select Subject
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={subject}
          onChange={handleChange}
          autoWidth
          label="Select Subject"
        >
          {subjects &&
            subjects.map((subject, idx) => (
              <MenuItem value={subject.code}>{subject.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default FacultySubjectSelect

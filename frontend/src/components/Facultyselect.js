import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { useEffect } from 'react'
import { useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

function MultipleSelectChip({ deptDetails, setSubject, subject }) {
  const theme = useTheme()
  const [faculty, setfaculty] = useState([])

  const handleChange = (event) => {
    const { value } = event.target

    setSubject((prev) => ({
      ...prev,
      faculty: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  useEffect(() => {
    const faculties = []
    deptDetails.faculty.forEach((element) => {
      faculties.push(element.name)
    }, setfaculty(faculties))
  }, [])
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Select Faculty</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={subject.faculty}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Select Faculty" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {faculty &&
            faculty.map((name, idx) => (
              <MenuItem
                key={idx}
                value={name}
                style={getStyles(name, subject.faculty, theme)}
              >
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default MultipleSelectChip

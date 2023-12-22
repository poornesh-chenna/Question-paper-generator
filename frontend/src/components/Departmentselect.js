import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { useState } from 'react'
import { useEffect } from 'react'
import { Axios } from '../utils/Axios'

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

function MultipleSelectChip({ facultyDetails, setfacultyDetails, settoggle }) {
  const theme = useTheme()
  const [departments, setdepartments] = useState([])
  useEffect(() => {
    const temp = []
    const fetchDepts = async () => {
      const depts = await Axios.get('/departments')
      depts.data.forEach((item) => {
        temp.push(item.dept)
      }, setdepartments(temp))
    }
    fetchDepts()
  }, [])

  const handleChange = (event) => {
    const { value } = event.target
    setfacultyDetails({ ...facultyDetails, dept: value })
  }

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select Department
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={facultyDetails.dept}
            label="Select Department"
            onChange={handleChange}
          >
            {departments.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, facultyDetails.dept, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

export default MultipleSelectChip

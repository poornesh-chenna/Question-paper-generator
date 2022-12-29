import mongoose from 'mongoose'

const deptSchema = new mongoose.Schema({
  deptname: {
    type: String,
  },
  dept: {
    type: String,
  },
})

const Dept = new mongoose.model('Dept', deptSchema)

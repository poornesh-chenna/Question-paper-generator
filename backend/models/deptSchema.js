import mongoose from 'mongoose'

const deptSchema = new mongoose.Schema({
  deptname: {
    type: String,
  },
  dept: {
    type: String,
    unique: true,
  },
  faculty: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
})

export const Dept = new mongoose.model('Dept', deptSchema)

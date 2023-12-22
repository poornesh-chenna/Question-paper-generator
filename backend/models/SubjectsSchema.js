import mongoose from 'mongoose'

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  year: {
    type: String,
  },
  semester: {
    type: String,
  },
  deptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dept',
  },
  facultyId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
})

export const Subject = mongoose.model('Subject', SubjectSchema)

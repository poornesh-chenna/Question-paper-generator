import mongoose from 'mongoose'

const facultySchema = new mongoose.Schema({
  facultyId: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  deptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dept',
  },

  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
  // questionFile: {
  //   type: String,
  // },
})

export const Faculty = mongoose.model('Faculty', facultySchema)

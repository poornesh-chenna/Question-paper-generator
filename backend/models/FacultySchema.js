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
  dept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dept',
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
})

export const Faculty = mongoose.model('Faculty', facultySchema)

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
    type: String,
  },

  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
  generatedWords: [
    {
      word: {
        type: String,
      },
      fileName: {
        type: String,
      },
      subject: String,
      examType: String,
    },
  ],
  recentWord: {
    type: String,
  },
})

export const Faculty = mongoose.model('Faculty', facultySchema)

import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  questions: [
    {
      sno: {
        type: Number,
      },
      unit: {
        type: Number,
      },
      question: {
        type: String,
      },
      marks: {
        type: String,
      },
    },
  ],
})

export const Question = new mongoose.model('Question', questionSchema)

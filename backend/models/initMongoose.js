import mongoose from 'mongoose'

export const connectDatabase = async () => {
  const dbURL = 'mongodb://localhost:27017/chatDB'
  mongoose.set('strictQuery', false)
  await mongoose.connect(dbURL).then(
    (db) => {
      console.log('Database connected successfully..')
    },
    (err) => {
      console.log('Database not connected..')
    }
  )
}

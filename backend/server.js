import express from 'express'
import cors from 'cors'
import { connectDatabase } from './models/initMongoose.js'

const app = express()

app.use(express.json())
app.use(cors())

try {
  await connectDatabase()
} catch (err) {
  console.log(err)
  process.exit()
}

app.get('/', (req, res) => {
  return res.send('server is up and running...')
})

app.listen(5000, () => {
  console.log('server is running in the port 5000...')
})

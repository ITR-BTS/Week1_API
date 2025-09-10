
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectDB from './config/mongodb.js'
import patientRouter from './routes/v1/patientRoute.js'
import physicianRouter from './routes/v1/physicianRoute.js'
const app = express()
app.use(express.json())

app.use(
  cors(
    {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173'
    }
  )
)
//routes
app.use('/api/v1/patients', patientRouter)
app.use('/api/v1/physicians', physicianRouter)

//mongoose
connectDB()


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
import express, { Application, Request, Response} from 'express'

const app: Application = express()
import dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors'
import morgan from 'morgan'

import connectDB from './db/connectDB'

import bookRouter from './routes/bookRoutes' 
import libraryRouter from './routes/libraryRoutes'
import userRouter from './routes/userRoutes'

import notFoundMiddleware from './middleware/not-found'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware'

app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/v1/library', libraryRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/book', bookRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = () => {
  try {
    connectDB(process.env.MONGO_URL ?? '')
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

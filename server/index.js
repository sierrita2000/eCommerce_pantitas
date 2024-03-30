import express from 'express'
import 'dotenv/config'
import { router } from './routes/index.routes.js'
import { errores } from './middlewares/errores.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('uploads'))

app.get("/", (req, res, next) => {
    res.status(200).send(<h1>Bienvenido a mi API</h1>)
    next()
})

app.use(router)
app.use(errores)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

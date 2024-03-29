import mongoose from 'mongoose'
import 'dotenv/config'

export const iniciar_conexion = async () => {
    console.log('iniciando conexion ...')

    await mongoose.connect(`mongodb+srv://${process.env.BBDD_USER}:${process.env.BBDD_PASSWORD}@cluster0.njsd6pt.mongodb.net/${process.env.BBDD_NAME}`)
        .catch(error => console.log(error))
}
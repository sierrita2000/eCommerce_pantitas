import mongoose from 'mongoose'
import { Schema } from "mongoose"

const favoritoSchema = new Schema(
    {
        id_usuario: {
            type: mongoose.ObjectId,
            required: true
        },
        id_producto: {
            type: mongoose.ObjectId,
            required: true
        }
    }
)

export const Favorito = mongoose.model('Favorito', favoritoSchema)
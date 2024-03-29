import mongoose from 'mongoose'
const { Schema } = mongoose

const productoSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true,
            unique: true
        },
        precio: mongoose.Decimal128,
        imagen: String,
        precio_dcto: Number,
        stock: Number,
        categoria: {
            type: String,
            enum: ['planta', 'animal', 'decoracion'],
            required: true
        },
        descripcion: String
    }
)

export const Producto = mongoose.model('Producto', productoSchema)
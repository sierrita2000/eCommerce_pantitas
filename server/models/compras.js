import mongoose, { Schema } from "mongoose"

const  comprasSchema = new Schema(
    {
        id_usuario: {
            type: mongoose.ObjectId,
            required: true
        },
        productos: {
            type: Array,
            required: true
        }
    }
)

export const Compra = mongoose.model("Compra", comprasSchema)
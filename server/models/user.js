import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        imagen: String,
        admin: {
            type: Boolean,
            default: false
        }
    }
)

export const Usuario = mongoose.model('Usuario', userSchema)
import { ResponseAPI } from "../routes/index.routes.js"

export const errores = async (err, req, res, next) => {
    const responseAPI = new ResponseAPI('error', 'la consulta no se pudo realizar', err.message).obj()
    res.status(400).send(responseAPI)
}
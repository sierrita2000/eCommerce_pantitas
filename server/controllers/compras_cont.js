import { ResponseAPI } from "../routes/index.routes.js"
import { Compra } from "../models/compras.js"

export const createCompra = async (req, res, next) => {
    try {
        const compra = new Compra(
            {
                id_usuario: req.body.id_usuario,
                productos: req.body.compras
            }
        )

        await compra.save()
            .then(results => {
                const responseAPI = new ResponseAPI('ok', 'compra creada correctamente', results).obj()
                res.status(200).send(responseAPI)
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}
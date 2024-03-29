import { Favorito } from "../models/favoritos.js"
import { ResponseAPI } from "../routes/index.routes.js"

/**
 * Crea un enlace de favorito entre un producto y un usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const createFavorito = async (req, res, next) => {
    try {
        const favorito_obj = {
            id_usuario: req.body.id_usuario,
            id_producto: req.body.id_producto
        }

        await favorito_obj.save()
            .then(results => {
                const responseAPI = new ResponseAPI('ok', 'enlace de favorito creado correctamente', results).obj()
                res.status(200).send(responseAPI)
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}
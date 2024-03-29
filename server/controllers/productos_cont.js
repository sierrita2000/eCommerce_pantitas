import { Producto } from "../models/producto.js"
import { ResponseAPI } from "../routes/index.routes.js"

/**
 * Crear una estancia de Producto
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const createProducto = async (req, res, next) => {
    try {
        const product = new Producto({ 
            titulo: req.body.titulo || null,
            precio: req.body.precio || 0,
            imagen: req.body.imagen || null,
            precio_dcto: req.body.precio_dcto || 0,
            stock: req.body.stock || 0,
            categoria: req.body.categoria || null,
            descripcion: req.body.descripcion || null
         })
        await product.save()
            .then(results => {
                const responseAPI = new ResponseAPI('ok', 'producto creado correctamente', results).obj()
                res.status(200).send(responseAPI)
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/**
 * Devuelve una estancia de producto por un ID dado
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next  
 */
export const getProductoById = async (req, res, next) => {
    try {
        const id_producto = req.params.id_producto

        await Producto.findById(id_producto).exec()
            .then(async (producto) => {
                let objeto_envio = null
                await Producto.find({categoria: producto.categoria}).exec()
                    .then(results => {
                        const posicion = results.findIndex(p => p._id.equals(producto._id))
                        objeto_envio = {
                            producto: results[posicion],
                            paginacion: {
                                prev: results[posicion - 1]?._id || null,
                                next: results[posicion + 1]?._id || null
                            }
                        }
                    })

                const responseAPI = new ResponseAPI('ok', 'producto encontrado correctamente', objeto_envio).obj()
                res.status(200).send(responseAPI)
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/**
 * Actualiza un producto
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next  
 */
export const updateProducto = async (req, res, next) => {
    try {
        const id_producto = req.params.id_producto
        const updates = req.body

        await Producto.findByIdAndUpdate(id_producto, { ...updates }, {
            returnDocument: 'after'
        })
            .then(results => {
                const responseAPI = new ResponseAPI('ok', 'producto modificado correctamente', results).obj()
                res.status(200).send(responseAPI)
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/**
 * Realiza una busqueda de productos por un filtro
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next  
 */
export const getProductoFiltrado = async (req, res, next) => {
    try {
        const filtros = req.body

        await Producto.find({ ...filtros }).exec()
            .then(results => {
                if (results.length > 0) {
                    const responseAPI = new ResponseAPI('ok', 'búsqueda realizada correctamente', results).obj()
                    res.status(200).send(responseAPI)
                } else {
                    const responseAPI = new ResponseAPI('not-found', 'no existen productos que cuadren con esos filtros', results).obj()
                    res.status(404).send(responseAPI)
                }
            })
    } catch (error) {
        next(error)
    }
}

/**
 * Busca un producto que se asemeje a su titulo
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next  
 */
export const getProductoByTitulo = async (req, res, next) => {
    try {
        const titulo = req.params.titulo.toLowerCase()

        await Producto.find({ titulo: { $regex: `.*${titulo}.*` }}).exec()
            .then(results => {
                if (results.length > 0) {
                    const responseAPI = new ResponseAPI('ok', 'búsqueda realizada correctamente', results).obj()
                    res.status(200).send(responseAPI)
                } else {
                    const responseAPI = new ResponseAPI('not-found', 'no existen productos que cuadren con esos filtros', results).obj()
                    res.status(404).send(responseAPI)
                }
            })
    } catch (error) {
        next(error)
    }
}
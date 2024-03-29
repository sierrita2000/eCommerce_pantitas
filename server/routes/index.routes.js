import { Router } from "express"
import { createUser, getAllUsers, getUserById, getUserByName, validateUser } from "../controllers/users_cont.js"
import { iniciar_conexion } from '../mongoose/conection.js'
import { createProducto, getProductoById, updateProducto, getProductoFiltrado, getProductoByTitulo } from "../controllers/productos_cont.js"
import { createFavorito } from "../controllers/favoritos_cont.js"
import multer from 'multer'
import { createCompra } from "../controllers/compras_cont.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
})
  
const upload = multer({ storage })

iniciar_conexion()

export const router = Router()

export class ResponseAPI {
    constructor(status, message, results) {
        this.status = status,
        this.message = message,
        this.results = results
    }

    obj() {
        return {
            status: this.status,
            message: this.message,
            results: this.results
        }
    }
}

/**
 * RUTAS DE USUARIOS
 */

router.get('/users/id/:id_usuario', getUserById)
router.get('/users/name/:nombre_usuario', getUserByName)
router.get('/users/all', getAllUsers)

router.post('/users/create-user', upload.single('signup_foto'), createUser)
router.post('/users/validate-user', validateUser)

/**
 * RUTAS DE PRODUCTOS
 */

router.get('/products/product/:id_producto', getProductoById)
router.post('/products/filters', getProductoFiltrado)
router.get('/productos/titulo/:titulo', getProductoByTitulo)

router.post('/products/create-product', createProducto)
router.post('/products/update/:id_producto', updateProducto)

/**
 * RUTAS DE FAVORITOS
 */

router.post('/favoritos/crear-favorito', createFavorito)

/**
 * RUTAS DE COMPRAS
 */

router.post('/compras/crear-compra', createCompra)
import { Usuario } from "../models/user.js"
import { ResponseAPI } from "../routes/index.routes.js"
import bcrypt from 'bcrypt'

/**
 * Crear una estancia de Usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next  
 */
export const createUser = async (req, res, next) => {
    try {
        const usuario = new Usuario({ 
            name: req.body.nombre || null,
            password: bcrypt.hashSync(req.body.password, 10) || null,
            imagen: req.file.filename || null,
            admin: req.body.admin || false
        })
        await usuario.save()
            .then(results => {
                const responseAPI = new ResponseAPI('ok', 'usuario creado correctamente', results).obj()
                res.status(200).send(responseAPI)
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/**
 * Devuelve el usuario por su ID
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const getUserById = async (req, res, next) => {
    try {
        const id_usuario = req.params.id_usuario

        await Usuario.findById(id_usuario).exec()
            .then(results => {
                const responseAPI = new ResponseAPI('ok', 'usuario encontrado', results).obj()
                res.status(200).send(responseAPI)
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/**
 * Devuelve un usuario por su nombre
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const getUserByName = async (req, res, next) => {
    try {
        const nombre_usuario = req.params.nombre_usuario

        await Usuario.find({name: nombre_usuario}).exec()
            .then(results => {
                if (results.length > 0) {
                    const responseAPI = new ResponseAPI('ok', 'usuario encontrado', results).obj()
                    res.status(200).send(responseAPI)
                } else {
                    const responseAPI = new ResponseAPI('not-found', 'usuario no encontrado', results).obj()
                    res.status(404).send(responseAPI)
                }
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/**
 * Valida un usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
export const validateUser = async (req, res, next) => {
    try {
        const nombre_usuario = req.body.name
        const password_usuario = req.body.password

        await Usuario.find({name: nombre_usuario}).exec()
            .then(results => {
                if (results.length > 0) {
                    if (bcrypt.compareSync(password_usuario, results[0].password)) {
                        const responseAPI = new ResponseAPI('ok', 'usuario válido', results).obj()
                        res.status(200).send(responseAPI)
                    } else {
                        const responseAPI = new ResponseAPI('error', 'contraseña incorrecta', results).obj()
                        res.status(400).send(responseAPI)
                    }
                } else {
                    const responseAPI = new ResponseAPI('not-found', 'nombre de usuario incorrecto', results).obj()
                    res.status(404).send(responseAPI)
                }
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}

/**
 * Devuelve una lista de todos los usuarios
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next  
 */
export const getAllUsers = async (req, res, next) => {
    try {
        await Usuario.find().exec()
            .then(results => {
                if (results.length > 0) {
                    const responseAPI = new ResponseAPI('ok', 'usuarios encontrado', results).obj()
                    res.status(200).send(responseAPI)
                } else {
                    const responseAPI = new ResponseAPI('not-found', 'no hay usuarios actualmente en la base de datos', results).obj()
                    res.status(404).send(responseAPI)
                }
            })
            .catch(error => { throw new Error(error) })
    } catch (error) {
        next(error)
    }
}
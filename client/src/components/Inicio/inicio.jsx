import { useEffect, useState } from "react"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import UsuarioInfo from "./usuario_info"

const { VITE_API_HOST } = import.meta.env

export const loader = async () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"))
    console.log(usuario)

    if (usuario) {
        const response = await fetch(`${VITE_API_HOST}/users/name/${usuario.nombre}`)
        const data = await response.json()

        return data.results[0]
    } else {
        return null
    }
}

export default function Inicio () {

    const [ productosCarrito, setProductosCarrito ] = useState([])

    const navigate = useNavigate()
    const usuario = useLoaderData()

    useEffect(() => {
        const productosCache = localStorage.getItem('productos_carrito')?.split(',')
        setProductosCarrito(productosCache ? productosCache : [])
    }, [])

    return (
        <div className="inicio">
            <div className="inicio__cabecera">
                <div className="inicio__cabecera__buscador">
                    <img src="../../logo.png" onClick={() => navigate("/")} />
                    <form className="buscador__formulario">
                        <input type="text" name="buscador" id="buscador" placeholder="Busca tu producto..." />
                        <button className="boton" type="submit"  onClick={(e) => {
                            e.preventDefault()
                            const titulo = document.getElementById('buscador').value
                            document.getElementById('buscador').value = ''
                            titulo && navigate(`/busqueda-productos/${titulo}`)
                        }} >🔎</button>
                    </form>
                </div>
                <div className="inicio__cabecera__menu">
                    <nav>
                        <button className="boton" onClick={() => navigate("/plantas")} >PLANTAS</button>
                        <button className="boton" onClick={() => navigate("/animales")} >ANIMALES</button>
                        <button className="boton" onClick={() => navigate("/decoracion")} >DECORACIÓN</button>
                    </nav>
                    <div className="inicio__cabecera__menu__usuario"> 
                        <button title={usuario ? usuario.name : "LOG IN"} className="usuario__circulo" onClick={() => { !usuario && navigate("/log-in") }} >
                            {
                                usuario ? (
                                    <img src={`${VITE_API_HOST}/${usuario?.imagen}`} />
                                ) :(
                                    <i className="fa-solid fa-user"></i>
                                )
                            }
                        </button>
                        {
                            usuario && ( <UsuarioInfo {...usuario} productosCarrito={productosCarrito} setProductosCarrito={setProductosCarrito} /> )
                        }
                    </div>
                </div>
            </div>
            <div className="inicio__productos">
                <Outlet context={[productosCarrito, setProductosCarrito]} />
            </div>
            <img className="hoja1" src="../../hoja.png" />
            <img className="hoja2" src="../../hoja.png" />
        </div>
    )
}
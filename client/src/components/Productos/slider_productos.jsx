import { useEffect } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"

export const loader = async ({ params }) => {
    const { VITE_API_HOST } = import.meta.env
    const id_producto = params.id_producto

    const response = await fetch(`${VITE_API_HOST}/products/product/${id_producto}`)
    const data = await response.json()

    return data.results
}

export default function SliderProductos () {

    const navigate = useNavigate()
    const producto = useLoaderData()

    useEffect(() => {
        const imagen = document.querySelector('.slider_productos__imagen')
        const informacion = document.querySelector('.slider_productos__informacion')

        const options = {
            duration: 1000,
            easing: "ease-in-out",
            fill: "forwards"
        }

        imagen.animate([
            { transform: "translateY(4rem)", filter: "opacity(0%)" }, {}
        ], options)

        informacion.animate([
            { transform: "translateY(-4rem)", filter: "opacity(0%)" }, {}
        ], options)
    }, [producto])

    const addToFavoritos = async (boton) => {
        boton.classList.toggle('fa-regular')
        boton.classList.toggle('fa-solid')
        boton.classList.toggle('pulsado')
    }

    return (
        <div className="slider_productos_children">
            <button className="boton slider_botones" onClick={() => {producto?.paginacion.prev && navigate(`../${producto?.paginacion.prev}`)}}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="slider_productos">
                <div className="slider_productos__imagen">
                    <img src={producto?.producto.imagen} />
                </div>
                <div className="slider_productos__informacion">
                    <h2>{producto?.producto.titulo.toUpperCase()}</h2>
                    <h3>{producto?.producto.descripcion}</h3>
                    <p>(Quedan {producto?.producto.stock})</p>
                    <h4>{producto?.producto.precio.$numberDecimal} €</h4>
                    <button className="boton boton_favorito" onClick={(e) => addToFavoritos(e.target)}><i className="fa-regular fa-heart"></i></button>
                </div>
                <button className="slider_productos__boton_cerrar" onClick={() => {navigate("..")}} ><i className="fa-solid fa-xmark"></i></button>
            </div>
            <button className="boton slider_botones" onClick={() => {producto?.paginacion.next && navigate(`../${producto?.paginacion.next}`)}}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    )
}
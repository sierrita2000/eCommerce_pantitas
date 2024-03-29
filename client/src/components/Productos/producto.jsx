import { useNavigate, useOutletContext } from "react-router-dom"

export default function Producto ({ _id, titulo, precio, imagen, precio_dcto, stock }) {

    const navigate = useNavigate()
    const usuario = sessionStorage.getItem("usuario")
    const [ productosCarrito, setProductosCarrito ] = useOutletContext()

    const addToFavoritos = async (boton) => {
        boton.classList.toggle('fa-regular')
        boton.classList.toggle('fa-solid')
        boton.classList.toggle('pulsado')
    }

    const addProductoAlCarro = () => {
        !localStorage.getItem(`producto-${_id}`) && localStorage.setItem(`producto-${_id}`, JSON.stringify({ _id: _id, titulo: titulo, precio: precio, imagen: imagen }))
        // almacenar en un array con todos los IDs en localStorage
        localStorage.setItem("productos_carrito", productosCarrito.concat([_id]))
        setProductosCarrito(productosCarrito.concat([_id]))
    }

    return (
        <div className="producto">
            <div className="producto__imagen" onClick={() => navigate(`./${_id}`)}>
                <img src={imagen} />
            </div>
            <div className="producto__informacion">
                <h2>{titulo.toUpperCase()}</h2>
                <p>(Quedan {stock})</p>
                <h4>{precio.$numberDecimal} €</h4>
                <button className={usuario ? 'boton_anadir' : 'prohibido_pulsar'} onClick={ () => {usuario ? addProductoAlCarro() : alert('debes iniciar sesión antes de comprar')} } >AÑADIR</button>
                <button className="boton boton_favorito" onClick={(e) => addToFavoritos(e.target)}><i className="fa-regular fa-heart"></i></button>
            </div>
        </div>
    )
}
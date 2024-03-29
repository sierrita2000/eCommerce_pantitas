export default function ProductoCompra({ imagen, precio, _id, titulo, cantidad, productosCarrito, setProductosCarrito, productos_carro, setProductos_carro }) {
    
    const quitarProducto = () => {
        if (cantidad > 1) {
            productosCarrito.splice(productosCarrito.findIndex(p => p === _id), 1)
            localStorage.setItem("productos_carrito", productosCarrito.toString())
            setProductosCarrito(localStorage.getItem("productos_carrito").split(','))
        } else {
            localStorage.removeItem(`producto-${_id}`)
            localStorage.setItem("productos_carrito", productosCarrito.filter(p => p != _id).toString())
            setProductosCarrito(productosCarrito.filter(p => p != _id))
        }
        (localStorage.getItem("productos_carrito") === "") && localStorage.removeItem("productos_carrito")
    }

    return (
        <div className="compra__producto">
        <div className="compra__producto__imagen">
            <img src={imagen} />
        </div>
        <div className="compra__producto__info">
            <p className="compra__producto__info__cantidad">x{cantidad}</p>
            <p className="compra__producto__info__titulo">{titulo}</p>
            <p className="compra__producto__info__precio">
            {precio.$numberDecimal}€
            </p>
            <button
            className="boton compra__producto__info__eliminar"
            onClick={() => quitarProducto()}
            >
            <i className="fa-solid fa-trash-can"></i>
            </button>
        </div>
        </div>
    )
}

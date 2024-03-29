import { useEffect, useState } from "react"
import ProductoCompra from "./producto_compra"
import { useNavigate } from "react-router-dom"

export default function UsuarioInfo ({ productosCarrito, setProductosCarrito }) {
    console.log(productosCarrito)

    const [ desplegado, setDesplegado ] = useState(false)
    const [ productos_carro, setProductos_carro ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const carrito_contador = document.querySelector('.carrito__contador')

        carrito_contador.animate([
            { transform: "scale(1.1)", filter: "drop-shadow(0 0 10px green)", offset: 0.70 }
        ], 500)

        let nuevo_carro = []

        productosCarrito.forEach(producto => {
            const posicion = nuevo_carro.findIndex(p => p[0] === producto)
            if (posicion != -1) {
                nuevo_carro[posicion][1]++
            } else {
                nuevo_carro.push([producto, 1])
            }
        })

        setProductos_carro(nuevo_carro)
    }, [productosCarrito])

    const desplegarCarrito = () => {
        const carrito = document.querySelector('.carrito__carro')
        const icono_carrito = document.querySelector('.fa-solid')

        carrito.classList.toggle('carrito__desplegado')
        icono_carrito.classList.toggle('fa-cart-shopping')
        icono_carrito.classList.toggle('fa-xmark') 

        setDesplegado(!desplegado)
    }

    const totalCompra = () => {
        let total = 0
        productosCarrito.map(producto => {
            const p = JSON.parse(localStorage.getItem(`producto-${producto}`))
            total += parseFloat(p.precio.$numberDecimal)
        })
        return total
    }

    const cerrarSesion = () => {
        const cerrar = confirm("¿Seguro que quieres cerrar la sesión?")
        if (cerrar) {
            sessionStorage.clear()
            localStorage.clear()
            setProductosCarrito([])
            navigate("/", { replace: true })
        }
    }

    const realizarCompra = async () => {
        const { VITE_API_HOST } = import.meta.env
        const aceptar = confirm("¿Quieres realizar la compra?")

        if (aceptar) {
            const id_usuario = JSON.parse(sessionStorage.getItem("usuario"))._id

            const response = await fetch(`${VITE_API_HOST}/compras/crear-compra`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_usuario: id_usuario,
                    compras: productosCarrito
                })
            })
            const data = await response.json()

            if (data.status === 'ok') {
                localStorage.clear()
                setProductosCarrito([])
                alert("compra realizada con exito!!!")
            } else {
                alert("Su compra no se ha podido realizar")
            }
        }
    }

    return (
        <div className="carrito">
            <div className="carrito__carro" >
                <i className="fa-solid fa-cart-shopping" onClick={() => desplegarCarrito()}></i>
                {
                    desplegado && (
                        <>
                            {
                                productos_carro.length != 0 ? (
                                    <div className="compra">
                                        <div className="compra__productos">
                                            {
                                                productos_carro.map(producto => {
                                                    const p = JSON.parse(localStorage.getItem(`producto-${producto[0]}`))
                                                    if (p) return <ProductoCompra key={p._id} {...p} cantidad={producto[1]} productosCarrito={productosCarrito} setProductosCarrito={setProductosCarrito} productos_carro={productos_carro} setProductos_carro={setProductos_carro} />
                                                })
                                            }
                                        </div>
                                        <div className="carrito__carro__boton_total">
                                            <button className="carrito__carro__boton_compra" onClick={realizarCompra}>COMPRAR</button>
                                            <p>TOTAL: <strong>{totalCompra()}€</strong></p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="compra_vacia">
                                        <img src="../../caja_vacia.png" />
                                        <p>No hay nada en tu cesta aún</p>
                                    </div>
                                )
                            }
                            <button className="boton boton_cerrar_sesion" onClick={cerrarSesion}>cerrar sesión</button>
                        </>
                    )
                }
                <div className="carrito__contador">
                    <p>{productosCarrito.length}</p>
                </div>
            </div>
        </div>
    )
}
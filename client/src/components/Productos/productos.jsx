import { Outlet, useLoaderData } from "react-router-dom"
import Producto from "./producto"
import { useEffect, useState } from "react"

const busquedaFetch = async (filtro) => {
    const { VITE_API_HOST } = import.meta.env
    const response = await fetch(`${VITE_API_HOST}/products/filters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filtro)
    })
    const data = await response.json()

    if (data.status === 'ok') return data.results
    else return []
}

export const loaderPlantas = () => busquedaFetch({categoria: "planta"})
export const loaderAnimales = () => busquedaFetch({categoria: "animal"})
export const loaderDecoraciones = () => busquedaFetch({categoria: "decoracion"})
export const loaderBusqueda = async ({ params }) => {
    const { VITE_API_HOST } = import.meta.env
    const response = await fetch(`${VITE_API_HOST}/productos/titulo/${params.titulo}`)
    const data = await response.json()

    if (data.status === 'ok') return data.results
    else return []
}

export default function Productos () {

    const productos = useLoaderData()

    const menor_mayor_precio = () => {
        let mayor = 0
        let menor = 999999999999999

        productos.forEach(producto => {
            if ( producto.precio.$numberDecimal < menor ) menor = producto.precio.$numberDecimal
            if ( producto.precio.$numberDecimal > mayor ) mayor = producto.precio.$numberDecimal
        })

        return [ Math.floor(menor), Math.ceil(mayor) ]
    }

    const [ precio, setPrecio ] = useState(0)
    const [ productosFiltrados, setProductosFiltrados ] = useState(null)

    useEffect(() => {
        setPrecio(menor_mayor_precio()[1])
        setProductosFiltrados(productos)
    }, [productos])

    const onChangePrecio = (valor) => {
        setPrecio(valor)
        setProductosFiltrados(productos.filter(p => p.precio.$numberDecimal < valor))
    }

    return (
        <div className="productos">
            {
                productos.length != 0 ? (
                    <>
                        <form className="filtro_precio">
                            <label htmlFor="input_precio">PRECIO: </label>
                            <input type="range" name="input_precio" id="input_precio" min={menor_mayor_precio()[0]} max={menor_mayor_precio()[1]} value={precio} onChange={(e) => onChangePrecio(e.target.value)} />
                            <p>{menor_mayor_precio()[0]}€ - {precio}€</p>
                        </form>
                        <section className="productos__productos">
                            { productosFiltrados?.map(producto => { return <Producto key={producto._id} {...producto} /> }) }
                        </section>
                    </>
                ) : (
                    <div className="productos__vacio">
                        <img src="../../caja_vacia.png" />
                        <h1>No podemos encontrar el producto que deseas</h1>
                    </div>
                )
            }
            <Outlet />
        </div>
    )
}
import Banner from "./banner"
import { useNavigate } from "react-router-dom"


export default function Principal () {

    const navigate = useNavigate()

    return (
        <div className="principal">
            <section className="banner_plantas" onClick={() => navigate("/plantas")} ><Banner titulo="PLANTAS" imagen="../../flores.png" /></section>
            <section className="banner_animales" onClick={() => navigate("/animales")} ><Banner titulo="ANIMALES" imagen="../../conejo.png" /></section>
            <section className="banner_decoracion" onClick={() => navigate("/decoracion")} ><Banner titulo="DECORACIÓN" imagen="../../jarron.png" /></section>
        </div>
    )
}

export default function Banner ({ titulo, imagen }) {

    return (
        <div className="banner">
            <img className="banner__producto" src={imagen} />
            <img className="banner__mesa" src="../../mesa-footer.jpg.png" />
            <h1 className="banner__titulo">{titulo}</h1>
        </div>
    )
}
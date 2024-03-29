import { useState } from 'react'
import { Form, redirect } from 'react-router-dom'

const { VITE_API_HOST } = import.meta.env

export const actionLogin = async ({ request }) => {
    const formData = await request.formData()

    const response = await fetch(`${VITE_API_HOST}/users/validate-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": formData.get("nombre"),
            "password": formData.get("password")
        })
    })
    const data = await response.json()

    if (data.status === 'ok') { sessionStorage.setItem("usuario", JSON.stringify({_id: data.results[0]._id, nombre: data.results[0].name, imagen: data.results[0].imagen})); return redirect(`/`) }
    else { alert(data.message); return null }
}

export const actionSignup = async ({ request }) => {
    const formData = await request.formData()

    if (!formData.get("nombre") || !formData.get("password") || !formData.get("password_repeat")) {
        alert("Tienes que rellenar todos los campos")
    } 
    else if (formData.get("password") != formData.get("password_repeat")) {
        alert("Las contraseñas no coinciden")
    }
    else {
        const response = await fetch(`${VITE_API_HOST}/users/create-user`, {
            method: "POST",
            body: formData
        })
        const data = await response.json()

        if (data.status === 'ok') { alert(data.message); return redirect("/log-in") }
        else alert(data.message)
    }

    return null
}

export default function Login ({ login }) {

    const [ imagen, setImagen ] = useState(null)

    return (
        <div className="login">
            <div className="login__formulario">
                <img src="../../logo.png" />
                <Form method='post' encType='multipart/form-data' className='login__formulario__Form'>
                    <label htmlFor="nombre">nombre: </label>
                    <input type="text" name="nombre" id="login_nombre" />
                    <label htmlFor="password">contraseña: </label>
                    <input type="password" name="password" id="login_password" />
                    {
                        !login &&   <>
                                        <label htmlFor="password_repeat">repite la contraseña: </label>
                                        <input type="password" name="password_repeat" id="sign_up" />
                                        <div className="imagen_usuario">
                                            <label htmlFor="signup_foto"><i className="fa-solid fa-folder-open"></i></label>
                                            <input type="file" name="signup_foto" id="signup_foto" accept=".jpg, .jpeg, .png" onChange={(e) => setImagen(e.target.files[0])} />
                                            <div className="foto_usuario">
                                                <img src={imagen ? URL.createObjectURL(imagen) : ""} />
                                            </div>
                                        </div>
                                    </>
                    }
                    <button type="submit">{login ? 'INICIAR' : 'ACEPTAR'}</button>
                </Form>
                <p>{login ? '¿Aún no tienes cuenta?' : '¿Ya tienes cuenta?'}</p><a href={login ? "/sign-up" : "/log-in"}>{login ? 'Registrate aquí' : 'Logueta aquí'}</a>
            </div>
        </div>
    )
}
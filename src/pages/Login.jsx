import { Button, Form, Input, message } from "antd"
import { login } from "../client/client"
import { encrypt } from '../functions/hash'
import { useContext, useState } from "react"
import { appContext } from "../context/appContext"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [messageApi, contextHandler] = message.useMessage()
    const navigate = useNavigate()
    const { setUserData, setLogged } = useContext(appContext)
    const [error, setError] = useState('')
    const [errorDisplay, setErrorDisplay] = useState(false)

    const onSubmit = async () => {
        let email = document.getElementById("Email").value
        let password = document.getElementById("Password").value

        const data = {
            email: email,
            password: await encrypt(password),
        }
        let res = await login(data)
        if(res.status == 200){
            setLogged(true)
            setUserData(res.data)
            navigate('/menu')
        }else if(res.status == 403){
            messageApi.open({
                type: "error",
                content: 'Usuario no encontrado'
            })
        }else if(res.status == 401){
            messageApi.open({
                type: "error",
                content: 'Contraseña invalida'
            })
        }else if(res.status == 500){
            messageApi.open({
                type: "error",
                content: 'Error del servidor'
            })
        }
    }

    return(
        <>
            {contextHandler}
            <Form className="loginPage">
                <h1>Bienvenido a Administrative Group</h1>
                <h2>Iniciar sesion</h2>
                <Form.Item
                    label='Email'
                    name='Email'
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese un correo electronico valido',
                            type: 'email'
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='Password'
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese su contraseña',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                { errorDisplay && <h2 style={{color: "tomato"}}>{error}</h2> }

                <Form.Item>
                    <Button htmlType="submit" type="primary" onClick={onSubmit}>
                        Iniciar Sesion
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login
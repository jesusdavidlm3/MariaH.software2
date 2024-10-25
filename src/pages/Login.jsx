import { Button, Form, Input, message } from "antd"
import { login, createUser } from "../client/client"
import { encrypt } from '../functions/hash'
import { useContext, useState } from "react"
import { appContext } from "../context/appContext"
import { useNavigate } from "react-router-dom"
import { NewAdminModal } from "../components/UserModals"
import logo from '../img/2.png'

const Login = () => {

    const [messageApi, contextHandler] = message.useMessage()
    const navigate = useNavigate()
    const { setUserData, setLogged } = useContext(appContext)
    const [error, setError] = useState('')
    const [errorDisplay, setErrorDisplay] = useState(false)
    const [registerAdminModal, setRegisterAdminModal] = useState(false)

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

    const submitNewAdmin = async () => {
        const id = document.getElementById('adminId').value
        const name = document.getElementById('adminName').value
        const address = document.getElementById('adminAddress').value
        const phone = document.getElementById('adminPhone').value
        const email = document.getElementById('adminEmail').value
        const password = document.getElementById('adminPassword').value

        const data = {
            id: id,
            name: name,
            address: address,
            phone: phone,
            email: email,
            password: await encrypt(password),
            type: 1
        }

        let res = await createUser(data)
        if(res.status == 200){
            setRegisterAdminModal(false)
            messageApi.open({
                type: "success",
                content: 'Nuevo administrador agregado con exito'
            })
        }else{
            setRegisterAdminModal(false)
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    return(
        <>
            {contextHandler}
            <Form className="loginPage">
                <img src={logo} style={{width: '350px', position: 'relative', top: '40px', left: '5px'}}/>
                <h2 style={{margin: '5px'}}>Iniciar sesion</h2>
                <Form.Item
                    name='Email'
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese un correo electronico valido',
                            type: 'email'
                        },
                    ]}
                >
                    <Input placeholder="Correo" style={{width: '300px'}}/>
                </Form.Item>

                <Form.Item
                    name='Password'
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese su contraseña',
                        },
                    ]}
                >
                    <Input.Password placeholder="Contraseña" style={{width: '300px'}}/>
                </Form.Item>

                { errorDisplay && <h2 style={{color: "tomato"}}>{error}</h2> }

                <Form.Item>
                    <Button htmlType="submit" type="primary" onClick={onSubmit}>
                        Iniciar Sesion
                    </Button>
                </Form.Item>
                <h3 onClick={() => setRegisterAdminModal(true)}>Registrar nuevo administrador</h3>
            </Form>

            <NewAdminModal
                open={registerAdminModal}
                onCancel={() => setRegisterAdminModal(false)}
                onOk={submitNewAdmin}
            />
        </>
    )
}

export default Login
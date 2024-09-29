import { Button, Form, Input } from "antd"

const Login = () => {

    const onFinish = () => {
        console.log('onFinish se ejecuto')
    }

    return(
        <>
            <Form
                className="loginPage"
                onFinish={onFinish}
            >
                <h1>Bienvenido a "Nombre"</h1>
                <h2>Iniciar sesion</h2>
                <Form.Item
                    label='Email'
                    name='Email'
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese un correo electronico valido',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label='Contraseña'
                    name='Contraseña'
                    rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese su contraseña',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" type="primary" >
                        Iniciar Sesion
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Login
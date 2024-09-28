import { Button, Form, Input } from "antd"

const Login = () => {

    const onFinish = () => {
        console.log('onFinish se ejecuto')
    }

    return(
        <>
            <Form className="loginPage" onFinish={onFinish}>
                <h1>Iniciar sesion</h1>
                <Form.Item label='Email' name='Email'>
                    <Input/>
                </Form.Item>

                <Form.Item label='Contraseña' name='Contraseña'>
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
import { Button, Form, Input, Modal, Select, message } from "antd"
import { useState } from "react"
import { createUser } from "../client/client"
import { encrypt } from '../functions/hash'
const Employes = () => {

    const [messageApi, contextHolder] = message.useMessage()
    const [newEmploye, setNewEmploye] = useState(false)
    const [cargo, setCargo] = useState(0)

    const submitNewEmploye = async () => {
        const userId = document.getElementById('userId').value
        const userName = document.getElementById('userName').value
        const userEmail = document.getElementById('userEmail').value
        const userPhone = document.getElementById('userPhone').value
        const userAddress = document.getElementById('userAddress').value
        const userPassword = document.getElementById('userPassword').value
        // const userType = document.getElementById('userType').value

        const data = {
            id: userId,
            name: userName,
            email: userEmail,
            password: await encrypt(userPassword),
            phone: userPhone, 
            type: cargo,
            address: userAddress,
        }
        let res = await createUser(data)
        console.log(res)
        if(res.status == 200){
            setNewEmploye(false)
            messageApi.open({
                type: 'success',
                content: 'Empleado creado correctamente'
            })
        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    return(
        <div className="Employes">
            {contextHolder}
            <div className="searchBar">
                <Input.Search></Input.Search>
                <Button type="primary" onClick={() => setNewEmploye(true)}>Agregar empleado</Button>
            </div>
            <div className="list">

            </div>

            <Modal title='Agregar empleado' open={newEmploye} onCancel={() => setNewEmploye(false)} onOk={submitNewEmploye}>
                <Form>
                    <Form.Item name="userId">
                        <Input placeholder="Cedula"></Input>
                    </Form.Item>
                    <Form.Item name="userName">
                        <Input placeholder="Nombre"></Input>
                    </Form.Item>
                    <Form.Item name="userEmail" rules={[{type: "email", message: 'Por favor ingrese un correo valido'}]}>
                        <Input placeholder="Correo electronico"></Input>
                    </Form.Item>
                    <Form.Item name="userAddress">
                        <Input placeholder="Direccion"></Input>
                    </Form.Item>
                    <Form.Item name="userPhone">
                        <Input placeholder="Telefono"></Input>
                    </Form.Item>
                    <Form.Item name="userPassword">
                        <Input.Password placeholder="Contraseña"></Input.Password>
                    </Form.Item>
                    <Form.Item label='Cargo'>
                        <Select
                        defaultValue={'Empleado'}
                        onChange={(e) => setCargo(e)}
                        options={[
                            {value: 0, label: 'Empleado'},
                            {value: 1, label: 'Gerente'}
                        ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Employes
import { Button, Form, Input, Modal, Select, message, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { createUser } from "../client/client"
import { encrypt } from '../functions/hash'
import { getEmployes } from "../client/client"
import { EditOutlined } from "@ant-design/icons"
import { DeleteOutlined } from "@ant-design/icons"

const Employes = () => {

    const [messageApi, contextHolder] = message.useMessage()
    const [newEmploye, setNewEmploye] = useState(false)
    const [cargo, setCargo] = useState(0)
    const [showList, setShowList] = useState([])
    const [fullList, setFullList] = useState([])

    async function getEmployesList(){
        let res = await getEmployes()
        setFullList(res.data)
    }

    useEffect(() => {
        getEmployesList()
        setShowList(f => fullList)
    }, [])

    useEffect(() => {
        setShowList(fullList)
    }, [fullList])

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
            getEmployesList()
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
                {showList.map((item) => (
                    <div className="listItem" key={item.id}>
                        <div className="info">
                            <h1>{item.name}</h1>
                            <h2>{item.id}</h2>
                        </div>

                        <div className="buttons">
                            <Tooltip title='Editar'>
                                <Button shape="circle" type="primary" icon={<EditOutlined />} size="large"/>
                            </Tooltip>
                            <Tooltip title='Borrar'>
                                <Button shape="circle" variant="solid" color="danger" icon={<DeleteOutlined />} size="large"/>
                            </Tooltip>
                        </div>
                    </div>
                ))}
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
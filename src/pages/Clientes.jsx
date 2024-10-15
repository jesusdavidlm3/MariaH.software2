import { Button, Form, Input, Modal, Select, message, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { encrypt } from '../functions/hash'
import { getClients, deleteUser, createUser } from "../client/client"
import { EditOutlined } from "@ant-design/icons"
import { DeleteOutlined } from "@ant-design/icons"
import { NewUserModal, DeleteModal, EditUserModal } from "../components/UserModals"

const Clients = () => {

    const [messageApi, contextHolder] = message.useMessage()
    const [newClient, setNewClient] = useState(false)
    const [deleteClient, setDeleteClient] = useState(false)
    const [editClient, setEditClient] = useState(false)
    const [selectedClient, setSelectedClient] = useState({})
    const [showList, setShowList] = useState([])
    const [fullList, setFullList] = useState([])

    async function getClientsList(){
        let res = await getClients()
        setFullList(res.data)
    }

    useEffect(() => {
        getClientsList()
        setShowList(f => fullList)
    }, [])

    useEffect(() => {
        setShowList(fullList)
    }, [fullList])

    const submitNewClient = async () => {
        const userId = document.getElementById('userId').value
        const userName = document.getElementById('userName').value
        const userEmail = document.getElementById('userEmail').value
        const userPhone = document.getElementById('userPhone').value
        const userAddress = document.getElementById('userAddress').value

        const data = {
            id: userId,
            name: userName,
            email: userEmail,
            phone: userPhone, 
            type: 2,
            address: userAddress,
        }
        let res = await createUser(data)
        console.log(res)
        if(res.status == 200){
            setNewClient(false)
            getClientsList()
            messageApi.open({
                type: 'success',
                content: 'Cliente registrado correctamente'
            })
        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    const submitDeleteClient = async (id) => {
        let res = await deleteUser(id)
        
        if(res.status == 200){
            setDeleteClient(false)
            getClientsList()
            messageApi.open({
                type: "success",
                content: 'Cliente eliminado con exito'
            })
        }else{
            messageApi.open({
                type: "error",
                content: 'Ah ocurrido un error'
            })
        }
    }

    return(
        <div className="Employes">
            {contextHolder}
            <div className="searchBar">
                <Input.Search></Input.Search>
                <Button type="primary" onClick={() => setNewClient(true)}>Agregar cliente</Button>
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
                                <Button shape="circle" type="primary" icon={<EditOutlined />} size="large" onClick={() => {setEditClient(true); setSelectedClient(item)}}/>
                            </Tooltip>
                            <Tooltip title='Borrar'>
                                <Button shape="circle" variant="solid" color="danger" icon={<DeleteOutlined />} onClick={() => {setSelectedClient(item); setDeleteClient(true)}} size="large"/>
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>

            <NewUserModal title='Registrar cliente' open={newClient} onCancel={() => setNewClient(false)} client={true} onOk={submitNewClient}/>
            <DeleteModal open={deleteClient} onCancel={() => setDeleteClient(false)} onOk={() => submitDeleteClient(selectedClient.id)}/>
            <EditUserModal open={editClient} onCancel={() => setEditClient(false)} info={selectedClient} title='Editar cliente' client={true}/>
        </div>
    )
}

export default Clients
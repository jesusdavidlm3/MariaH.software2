import { Button, Form, Input, Modal, Select, message, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { encrypt } from '../functions/hash'
import { getEmployes, deleteUser, createUser, editUser } from "../client/client"
import { EditOutlined } from "@ant-design/icons"
import { DeleteOutlined } from "@ant-design/icons"
import { NewUserModal, DeleteModal, EditUserModal } from "../components/UserModals"

const Employes = () => {

    const [messageApi, contextHolder] = message.useMessage()
    const [newEmploye, setNewEmploye] = useState(false)
    const [deleteEmploye, setDeleteEMploye] = useState(false)
    const [editEmploye, setEditEmploye] = useState(false)
    const [selectedEmploye, setSelectedEmploye] = useState({})
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

    const submitDeleteEmploye = async (id) => {
        let res = await deleteUser(id)
        
        if(res.status == 200){
            setDeleteEMploye(false)
            getEmployesList()
            messageApi.open({
                type: "success",
                content: 'Empleado eliminado con exito'
            })
        }else{
            messageApi.open({
                type: "error",
                content: 'Ah ocurrido un error'
            })
        }
    }

    const submitEditEmploye = async () => {
        const editId = document.getElementById('editId').value
        const editName = document.getElementById('editName').value
        const editEmail = document.getElementById('editEmail').value
        const editPhone = document.getElementById('editPhone').value
        const editAddress = document.getElementById('editAddress').value

        const data = {
            id: editId,
            name: editName,
            email: editEmail,
            phone: editPhone, 
            type: cargo,
            address: editAddress,
        }
        let res = await editUser(data)
        if(res.status == 200){
            setEditEmploye(false)
            getEmployesList()
            messageApi.open({
                type: 'success',
                content: 'Empleado editado correctamente'
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
                                <Button shape="circle" type="primary" icon={<EditOutlined />} size="large" onClick={() => {setSelectedEmploye(item); setEditEmploye(true)}}/>
                            </Tooltip>
                            <Tooltip title='Borrar'>
                                <Button shape="circle" variant="solid" color="danger" icon={<DeleteOutlined />} onClick={() => {setSelectedEmploye(item); setDeleteEMploye(true)}} size="large"/>
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>

            <NewUserModal title='Agregar empleado' open={newEmploye} onCancel={() => setNewEmploye(false)} client={false} cargoControl={setCargo} onOk={submitNewEmploye}/>
            <DeleteModal open={deleteEmploye} onCancel={() => setDeleteEMploye(false)} onOk={() => submitDeleteEmploye(selectedEmploye.id)}/>
            <EditUserModal open={editEmploye} onCancel={() => setEditEmploye(false)} info={selectedEmploye} title='Editar Empleado' client={false} onOk={submitEditEmploye}/>
        </div>
    )
}

export default Employes
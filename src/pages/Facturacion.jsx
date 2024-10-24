import { useState, useEffect, useContext } from "react"
import { getInventory, checkCliente, submitInvoice, createUser } from "../client/client"
import { Input, Button, Tooltip, InputNumber, Divider, Space, message } from "antd"
import { PlusOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons"
import { ConfirmInvoice, ConfirmProduct } from '../components/FacturacionModals'
import { NewUserModal } from "../components/UserModals"
import { appContext } from '../context/appContext'

const Facturacion = () => {

    // selectores
    const [quantitySelector, setQuantitySelector] = useState(0)
    const [paymentMethodSelector, setPaymentMethodSelector] = useState(0)

    // control de modals
    const [confirmProductModal, setConfirmProductModal] = useState(false)
    const [confirmInvoiceModal, setConfirmInvoiceModal] = useState(false)
    const [newClientModal, setNewClientModal] = useState(false)

    // datos
    const {userData, paymentMethodsList} = useContext(appContext)
    const [confirmedId, setConfirmedId] = useState()
    const [actualInvoice, setActualInvoice] = useState([])

    // Manejo de UI
    const [fullList, setFullList] = useState([])
    const [showList, setShowList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState('')
    const [userFound, setUserFound] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)
    const [messageApi, contextHandler] = message.useMessage()



    async function getProductList(){
        let res = await getInventory()
        setFullList(res.data)
    }

    useEffect(() => {
        getProductList()
        setShowList(f => fullList)
    }, [])

    useEffect(() => {
        setShowList(fullList)
    }, [fullList])

    const addToCart = () => {
        setConfirmProductModal(false)
        console.log(actualInvoice)
        if(actualInvoice == []){
            setActualInvoice([{
                name: selectedProduct.name,
                id: selectedProduct.id,
                price: selectedProduct.price,
                quantity: quantitySelector
            }])
        }else{
            setActualInvoice([...actualInvoice, {
                name: selectedProduct.name,
                id: selectedProduct.id,
                price: selectedProduct.price,
                quantity: quantitySelector
            }])
        }
    }

    const checkClientId = async () => {
        let id = document.getElementById('idField').value
        const data = {
            id: id
        }
        let res = await checkCliente(data)
        if(res.status == 200){
            setUserFound(res.data)
            setConfirmedId(id)
        }else if(res.status == 404){
            setNewClientModal(true)
        }
    }

    const submitNewClient = async () => {
        const id = document.getElementById('userId').value
        const name = document.getElementById('userName').value
        const address = document.getElementById('userAddress').value
        const phone = document.getElementById('userPhone').value

        const data = {
            id: id,
            name: name,
            address: address, 
            phone: phone
        }

        let res = await createUser(data)
        if(res.status == 200){
            setNewClientModal(false)
            messageApi.open({
                type: 'success',
                content: 'Nuevo cliente registrado'
            })
            setUserFound({
                id: id,
                name: name,
                address: address,
                phone: phone
            })
        }else{
            setNewClientModal(false)
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    const submitActualInvoice = async () => {
        const data = {
            date: Date(),
            paymentMethod: paymentMethodSelector,
            employeId: userData.id,
            clientId: confirmedId,
            products: actualInvoice
        }
        console.log(data)

        let res = await submitInvoice(data)
        if(res.status == 200){
            messageApi.open({
                type: "success",
                content: 'Compra registrada con exito'
            })
        }else if(res.status == 404){

        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    return(
        <div className='Facturacion'>
            {contextHandler}
            <div className="latPanel">
                {userFound ? (
                    <div className='infoClient'>
                        <h4>C.I.: {userFound.id}</h4>
                        <h4>Nombre: {userFound.name}</h4>
                        <h4>Direccion: {userFound.address}</h4>
                        <h4>Telefono: {userFound.phone}</h4>
                    </div>
                ):(
                    <div className="idBar">
                        <Space.Compact>
                            <InputNumber disabled={userFound} placeholder="Cedula" id="idField"/>
                            <Tooltip title='Buscar'>
                                <Button icon={<SearchOutlined />} onClick={checkClientId} disabled={userFound}/>
                            </Tooltip>
                        </Space.Compact>
                    </div>
                )}
                
                <div className="products">
                    <Divider/>
                    {actualInvoice.map((item) => (
                        <div key={item.id} className="addedProduct">
                            <h4>{item.name} | ${item.price} | {item.quantity} Units.</h4>
                            <Tooltip title='Eliminar articulo'>
                                <Button shape="circle" icon={<CloseOutlined />}/>
                            </Tooltip>
                        </div>
                    ))}
                </div>
                <div className="total">
                    <Divider/>
                    <h1>Total: {totalAmount}</h1>
                </div>
            </div>


            <div className="second">
                <div className="list">
                    <Input placeholder="Buscar..."/>
                    {showList.map((item) => (
                        <div key={item.id} className="listItem">
                            <h3>{item.name} | {item.price}</h3>
                            <Tooltip title='Agregar a la compra'>
                                <Button shape="circle" icon={<PlusOutlined/>} onClick={() => {setSelectedProduct(item); setConfirmProductModal(true)}}/>
                            </Tooltip>
                        </div>
                    ))}
                </div>
                <div className="finish">
                    <Button variant="solid" color="danger" onClick={() => setActualInvoice([])}>Limpiar</Button>
                    <Button type="primary" onClick={() => setConfirmInvoiceModal(true)}>Facturar</Button>
                </div>
            </div>
            
            <ConfirmProduct
                open={confirmProductModal}
                onCancel={() => setConfirmProductModal(false)}
                onOk={addToCart}
                quantityHandler={setQuantitySelector}
            />

            <ConfirmInvoice
                open={confirmInvoiceModal}
                onOk={submitActualInvoice}
                onCancel={() => setConfirmInvoiceModal(false)}
                paymentMethodHanlder={setPaymentMethodSelector}
                list={paymentMethodsList}
            />

            <NewUserModal
                open={newClientModal}
                onCancel={() => setNewClientModal(false)}
                onOk={submitNewClient}
                client={true}
                title='Registrar nuevo cliente'
            />
        </div>
    )
}

export default Facturacion
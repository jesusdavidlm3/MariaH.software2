import { useState, useEffect, useContext } from "react"
import { getInventory, checkCliente } from "../client/client"
import { Input, Button, Tooltip, InputNumber, Divider, Space } from "antd"
import { PlusOutlined, CloseOutlined, CheckCircleOutlined, CloseCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { ConfirmInvoice, ConfirmProduct } from '../components/FacturacionModals'
import { appContext } from '../context/appContext'

const Facturacion = () => {

    // selectores
    const [quantitySelector, setQuantitySelector] = useState(0)
    const [paymentMethodSelector, setPaymentMethodSelector] = useState(0)

    // control de modals
    const [confirmProductModal, setConfirmProductModal] = useState(false)
    const [confirmInvoiceModal, setConfirmInvoiceModal] = useState(false)

    // datos
    const {userData} = useContext(appContext)
    let confirmedId
    const [actualInvoice, setActualInvoice] = useState([])

    // Manejo de UI
    const [fullList, setFullList] = useState([])
    const [showList, setShowList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState('')
    const [userFound, setUserFound] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)



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
        console.log(id)
        let res = checkCliente(id)
        if(res.status == 200){
            setUserFound(true)
            confirmedId = id
        }
    }

    const submitInvoice = async () => {
        const data = {
            date: new Date(),
            paymentMethod: paymentMethodSelector,
            employeId: userData.id,
            clientId: confirmedId,
            products: actualInvoice
        }
        console.log(data)
    }

    return(
        <div className='Facturacion'>
            <div className="latPanel">
                <div className="idBar">
                    <Space.Compact>
                        <InputNumber disabled={userFound} placeholder="Cedula" id="idField"/>
                        <Tooltip title='Buscar'>
                            <Button icon={<SearchOutlined />} onClick={checkClientId}/>
                        </Tooltip>
                    </Space.Compact>
                    {userFound ? (
                        <Tooltip title='Cliente verificado'>
                            <CheckCircleOutlined style={{color: 'green', fontSize: '30px'}} />
                        </Tooltip>
                    ):(
                        <Tooltip title='Ingrese cedula del cliente'>
                            <CloseCircleOutlined style={{color: 'red', fontSize: '30px'}}/>
                        </Tooltip>
                    )}
                </div>
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
                onOk={submitInvoice}
                onCancel={() => setConfirmInvoiceModal(false)}
                paymentMethodHanlder={setPaymentMethodSelector}
            />
        </div>
    )
}

export default Facturacion
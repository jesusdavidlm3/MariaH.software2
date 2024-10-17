import { useState, useEffect } from "react"
import { getInventory, checkCliente } from "../client/client"
import { Input, Button, Tooltip, InputNumber } from "antd"
import { PlusOutlined, CloseOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { ConfirmProduct } from '../components/FacturacionModals'

const Facturacion = () => {

    const [actualInvoice, setActualInvoice] = useState([])
    const [fullList, setFullList] = useState([])
    const [showList, setShowList] = useState([])
    const [quantitySelector, setQuantitySelector] = useState(0)
    const [confirmProductModal, setConfirmProductModal] = useState(false)
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

    const checkClientId = async (id) => {
        let res = checkCliente(id)
        if(res.status == 200){
            setUserFound(true)
        }
    }

    return(
        <div className='Facturacion'>
            <div className="latPanel">
                <div className="idBar">
                    <InputNumber disabled={userFound} placeholder="Cedula"/>
                    {userFound ? (
                        <Tooltip title='Cliente verificado'>
                            <CheckCircleOutlined style={{color: 'red'}} />
                        </Tooltip>
                    ):(
                        <Tooltip title='Ingrese cedula del cliente'>
                            <CloseCircleOutlined style={{color: 'red', fontSize: '30px'}}/>
                        </Tooltip>
                    )}
                </div>
                <div className="products">
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
                <h1>Total: {totalAmount}</h1>
                </div>
            </div>


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
            
            <ConfirmProduct
                open={confirmProductModal}
                onCancel={() => setConfirmProductModal(false)}
                onOk={addToCart}
                quantityHandler={setQuantitySelector}
            />
        </div>
    )
}

export default Facturacion
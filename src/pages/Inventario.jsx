import { useState, useEffect } from "react"
import { getInventory, editProduct, addProduct, deleteProduct } from '../client/client'
import { message, Input, Button, Tooltip } from "antd"
import { AddProductModal, DeleteProductModal, EditProductModal } from "../components/ProductModals"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const Inventario = () => {

    const [messageApi, contextHolder] = message.useMessage()
    const [newProductOpen, setNewProduct] = useState(false)
    const [deleteProductOpen, setDeleteProduct] = useState(false)
    const [editProductOpen, setEditProduct] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({})
    const [showList, setShowList] = useState([])
    const [fullList, setFullList] = useState([])
    const [newQuantity, setNewQuantity] = useState(0)
    const [editQuantity, setEditQuantity] = useState(0)
    const [newPrice, setNewPrice] = useState(0)
    const [editPrice, setEditPrice] = useState(0)

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

    const submitNewProduct = async () => {
        const productId = document.getElementById('productId').value
        const productName = document.getElementById('productName').value
        const productQuantity = document.getElementById('productQuantity').value
        const productPrice = document.getElementById('productPrice').value

        const data = {
            id: productId,
            name: productName,
            quantity: productQuantity,
            price: productPrice, 
        }
        let res = await addProduct(data)
        console.log(res)
        if(res.status == 200){
            setNewProduct(false)
            getProductList()
            messageApi.open({
                type: 'success',
                content: 'Producto registrado correctamente'
            })
        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    const submitDeleteProduct = async (id) => {
        let res = await deleteProduct(id)
        
        if(res.status == 200){
            setDeleteProduct(false)
            getProductList()
            messageApi.open({
                type: "success",
                content: 'Producto eliminado con exito'
            })
        }else{
            messageApi.open({
                type: "error",
                content: 'Ah ocurrido un error'
            })
        }
    }

    const submitEditClient = async () => {
        const editedId = document.getElementById('editedId').value
        const editedName = document.getElementById('editedName').value
        const editedQuantity = document.getElementById('editedQuantity').value
        const editedPrice = document.getElementById('editedPrice').value

        const data = {
            id: editedId,
            name: editedName,
            quantity: editedQuantity,
            price: editedPrice, 
        }
        let res = await editProduct(data)
        if(res.status == 200){
            setEditProduct(false)
            getProductList()
            messageApi.open({
                type: 'success',
                content: 'Producto editado correctamente'
            })
        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    const handleSearch = () => {
        const searchInput = document.getElementById('searchInput').value
        const results = []
        if (searchInput == ''){
            setShowList(fullList)
        }else{
            fullList.forEach(item => {
                if(item.name.toLowerCase().includes(searchInput.toLowerCase())){
                    results.push(item)
                }
            })
            setShowList(results)
        }
    }

    return(
        <div className="Employes">
            {contextHolder}
            <div className="searchBar">
                <Input.Search placeholder="Buscar..." id="searchInput" onChange={handleSearch}></Input.Search>
                <Button type="primary" onClick={() => setNewProduct(true)}>Agregar producto</Button>
            </div>
            <div className="list">
                {showList.map((item) => (
                    <div className="listItem" key={item.id}>
                        <div className="info">
                            <h1>{item.name}</h1>
                            <h3>| ${item.price} |</h3>
                            <h3>Cod.: {item.id}</h3>
                        </div>

                        <div className="buttons">
                            <Tooltip title='Editar'>
                                <Button shape="circle" type="primary" icon={<EditOutlined />} size="large" onClick={() => {setEditProduct(true); setSelectedProduct(item)}}/>
                            </Tooltip>
                            <Tooltip title='Borrar'>
                                <Button shape="circle" variant="solid" color="danger" icon={<DeleteOutlined />} onClick={() => {setSelectedProduct(item); setDeleteProduct(true)}} size="large"/>
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>

            <AddProductModal
                title='Agregar producto'
                open={newProductOpen}
                onCancel={() => setNewProduct(false)}
                onOk={submitNewProduct}
                priceHandler={setNewPrice}
                quantityHandler={setNewQuantity}
            />
            <DeleteProductModal
                open={deleteProductOpen}
                onCancel={() => setDeleteProduct(false)}
                onOk={() => submitDeleteProduct(selectedProduct.id)}
            />
            <EditProductModal
                open={editProductOpen}
                onCancel={() => setEditProduct(false)}
                info={selectedProduct}
                title='Editar producto'
                onOk={submitEditClient}
                priceHandler={setEditPrice}
                quantityHandler={setEditQuantity}
            />
        </div>
    )
}

export default Inventario
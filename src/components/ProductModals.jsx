import { Modal, Input, Form, InputNumber } from "antd"

export const AddProductModal = ({open, onOk, onCancel, priceHandler, quantityHandler}) => {
    return(
        <Modal destroyOnClose open={open} onOk={onOk} onCancel={onCancel} title='Agregar producto'>
            <Form>
                <Form.Item name='productId'>
                    <Input placeholder="Codigo"/>
                </Form.Item>
                <Form.Item name='productName'>
                    <Input placeholder="Nombre del producto"/>
                </Form.Item>
                <Form.Item name='productQuantity' label='Cantidad:'>
                    <InputNumber placeholder="Cantidad" onChange={(e) => quantityHandler(e)}/>
                </Form.Item>
                <Form.Item name='productPrice' label='Precio:'>
                    <InputNumber placeholder="Precio" onChange={(e) => priceHandler(e)} addonBefore="$"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const EditProductModal = ({open, onOk, onCancel, info, priceHandler, quantityHandler}) => {
    return(
        <Modal destroyOnClose open={open} onOk={onOk} onCancel={onCancel} title='Editar producto'>
            <Form>
                <Form.Item name='editedId'>
                    <Input placeholder="Codigo" disabled={true} defaultValue={info.id}/>
                </Form.Item>
                <Form.Item name='editedName'>
                    <Input placeholder="Nombre del producto" defaultValue={info.name}/>
                </Form.Item>
                <Form.Item name='editedQuantity' label='Cantidad:'>
                    <InputNumber placeholder="Cantidad" defaultValue={info.quantity} onChange={(e) => quantityHandler(e)}/>
                </Form.Item>
                <Form.Item name='editedPrice' label='Precio:'>
                    <InputNumber placeholder="Precio" defaultValue={info.price} onChange={(e) => priceHandler(e)} addonBefore="$"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const DeleteProductModal = ({open, onOk, onCancel}) => {
    return(
        <Modal open={open} onOk={onOk} onCancel={onCancel} title='Eliminar este producto?'>

        </Modal>
    )
}
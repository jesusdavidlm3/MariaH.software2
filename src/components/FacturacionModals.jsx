import { Modal, InputNumber, Form } from "antd";

export const ConfirmProduct = ({onOk, onCancel, open, info, quantityHandler}) => {
    return(
        <Modal onOk={onOk} onCancel={onCancel} open={open} destroyOnClose title={`Agregar el producto a la compra?`}>
            <Form>
                <Form.Item label='Cantidad:'>
                    <InputNumber onChange={(e) => quantityHandler(e)} defaultValue={1}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}
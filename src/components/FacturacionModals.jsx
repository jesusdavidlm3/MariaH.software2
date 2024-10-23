import { Modal, InputNumber, Form, Select } from "antd";

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

export const ConfirmInvoice = ({open, onOk, onCancel, paymentMethodHanlder}) => {
    return(
        <Modal title='Confirmar factura?' open={open} onOk={onOk} onCancel={onCancel}>
            <Form>
                <Select onChange={(e) => paymentMethodHanlder(e)}/>
            </Form>
        </Modal>
    )
}
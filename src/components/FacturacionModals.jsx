import { Modal, InputNumber, Form, Select } from "antd";

export const ConfirmProduct = ({onOk, onCancel, open, info, quantityHandler}) => {
    return(
        <Modal onOk={onOk} onCancel={onCancel} open={open} destroyOnClose title={`Agregar el producto a la compra?`}>
            <Form>
                <Form.Item label='Cantidad:'>
                    <InputNumber onChange={(e) => quantityHandler(e)} defaultValue={0}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const ConfirmInvoice = ({open, onOk, onCancel, paymentMethodHanlder, list}) => {

    let options = []
    list.forEach(item => {
        if(options == {}){
            options = [{value: item.id, label: item.name}]
        }else{
            options = [...options, {value: item.id, label: item.name}]
        }
    });

    return(
        <Modal title='Confirmar factura?' open={open} onOk={onOk} onCancel={onCancel} destroyOnClose>
            <Form>
                <Form.Item label='Metodo de pago'>
                    <Select
                        onChange={(e) => paymentMethodHanlder(e)}
                        options={options}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
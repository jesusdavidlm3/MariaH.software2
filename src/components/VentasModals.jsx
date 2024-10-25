import { Modal, Input, Form } from "antd";

export const PrintInvoiceModal = ({open, onOk, onCancel}) => {
    return(
        <Modal destroyOnClose open={open} onOk={onOk} onCancel={onCancel} title='Ingrese el numero de factura'>
            <Form>
                <Form.Item name='invoiceId'>
                    <Input placeholder="Numero de factura"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}
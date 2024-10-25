import { AuditOutlined, CopyFilled, ProductFilled } from "@ant-design/icons"
import { printInventoryReport, printInvoice } from "../client/client"
import { message } from "antd"
import { PrintInvoiceModal } from '../components/VentasModals'
import { useState } from "react"

const Ventas = () => {

    const [messageApi, contextHolder] = message.useMessage()
    const [invoiceModal, setInvoiceModal] = useState(false)

    const inventoryReport = async () => {
        let res = await printInventoryReport()
        if(res.status == 200){
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href=url
            link.setAttribute('download','Reporte de inventario.pdf')
            document.body.appendChild(link)
            link.click()
            messageApi.open({
                type: 'success',
                content: 'Reporte de inventario emitido'
            })
        }else{
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    const invoice = async () => {
        const invoiceId = document.getElementById('invoiceId').value
        const data = {
            id: invoiceId
        }

        let res = await printInvoice(data)
        if(res.status = 200){
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href=url
            link.setAttribute('download','ticket.pdf')
            document.body.appendChild(link)
            link.click()
            setInvoiceModal(false)
            messageApi.open({
                type: 'success',
                content: 'Reporte de factura emitido'
            })
        }else{
            setInvoiceModal(false)
            messageApi.open({
                type: 'error',
                content: 'Ah ocurrido un error'
            })
        }
    }

    return(
        <div className="menu">
            {contextHolder}
            <h1>Seleccione un tipo de reporte</h1>
            <div className="modules">
                <div className="card" onClick={() => setInvoiceModal(true)}>
                    <AuditOutlined style={{fontSize: '60px'}} />
                    <h4>Factura</h4>
                </div>
                <div className="card" onClick={() => navigate('/Ventas')}>
                    <CopyFilled style={{fontSize: '60px'}}/>
                    <h4>Ventas</h4>
                </div>
                <div className="card" onClick={inventoryReport}>
                    <ProductFilled style={{fontSize: '60px'}} />
                    <h4>Inventario</h4>
                </div>
            </div>

            <PrintInvoiceModal
                open={invoiceModal}
                onCancel={() => setInvoiceModal(false)}
                onOk={invoice}
            />
        </div> 
    )
}

export default Ventas
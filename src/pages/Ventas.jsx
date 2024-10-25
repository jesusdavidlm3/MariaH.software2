import { AuditOutlined, CopyFilled, ProductFilled } from "@ant-design/icons"
import { printInventoryReport } from "../client/client"
import { message } from "antd"

const Ventas = () => {

    const [messageApi, contextHolder] = message.useMessage()

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

    return(
        <div className="menu">
            {contextHolder}
            <h1>Seleccione un tipo de reporte</h1>
            <div className="modules">
                <div className="card" onClick={() => navigate('/Employes')}>
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
        </div> 
    )
}

export default Ventas
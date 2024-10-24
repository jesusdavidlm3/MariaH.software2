import { ShoppingFilled } from "@ant-design/icons"
import { IdcardFilled } from "@ant-design/icons"
import { ProductFilled } from "@ant-design/icons"
import { CopyFilled } from "@ant-design/icons"
import { TeamOutlined } from "@ant-design/icons"
import { useContext, useEffect } from "react"
import { appContext } from "../context/appContext"
import { useNavigate } from "react-router-dom"
import { getPaymentMethods } from '../client/client'

const Menu = () => {

    const navigate = useNavigate()
    const { userData, setPaymentMethodsList } = useContext(appContext)
    const type = userData.type

    async function getPaymentMethodsList(){
        let res = await getPaymentMethods()
        setPaymentMethodsList(res.data)
    }

    useEffect(() => {
        getPaymentMethodsList()
    }, [])

    return(
        <>
            { type == 1 && (
                <div className="menu">
                    <h1>Bienvenido a administrative group</h1>
                    <h2>Gerente</h2>
                    <div className="modules">
                        <div className="card" onClick={() => navigate('/Employes')}>
                            <IdcardFilled style={{fontSize: '60px'}} />
                            <h4>Empleados</h4>
                        </div>
                        <div className="card" onClick={() => navigate('/Ventas')}>
                            <CopyFilled style={{fontSize: '60px'}}/>
                            <h4>Ventas</h4>
                        </div>
                        <div className="card" onClick={() => navigate('/Inventario')}>
                            <ProductFilled style={{fontSize: '60px'}} />
                            <h4>Inventario</h4>
                        </div>
                    </div>
                </div>  
            ) }

            { type == 0 && (
                <div className="menu">
                    <h1>Bienvenido a administrative group</h1>
                    <h2>Empleados</h2>
                    <div className="modules" onClick={() => navigate('/Facturacion')}>
                        <div className="card">
                            <ShoppingFilled style={{fontSize: '60px'}}/>
                            <h4>Facturacion</h4>
                        </div>
                        <div className="card" onClick={() => navigate('/Clients')}>
                            <TeamOutlined style={{fontSize: '60px'}}/>
                            <h4>Clientes</h4>
                        </div>
                        <div className="card" onClick={() => navigate('/Inventario')}>
                            <ProductFilled style={{fontSize: '60px'}} />
                            <h4>Inventario</h4>
                        </div>
                    </div>
                </div>  
            ) }
        </>
    )
}

export default Menu
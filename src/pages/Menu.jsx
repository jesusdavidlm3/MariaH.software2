import { ShoppingFilled } from "@ant-design/icons"
import { IdcardFilled } from "@ant-design/icons"
import { ProductFilled } from "@ant-design/icons"
import { CopyFilled } from "@ant-design/icons"
import { TeamOutlined } from "@ant-design/icons"

const Menu = () => {

    let type = 1

    return(
        <>
            { type == 1 && (
                <div className="menu">
                    <h1>Bienvenido a administrative group</h1>
                    <h2>Empleados</h2>
                    <div className="modules">
                        <div className="card">
                            <ShoppingFilled style={{fontSize: '60px'}}/>
                            <h4>Compra</h4>
                        </div>
                        <div className="card">
                            <TeamOutlined style={{fontSize: '60px'}}/>
                            <h4>Clientes</h4>
                        </div>
                        <div className="card">
                            <ProductFilled style={{fontSize: '60px'}} />
                            <h4>Inventario</h4>
                        </div>
                    </div>
                </div>  
            ) }

            { type == 2 && (
                <div className="menu">
                    <h1>Bienvenido a administrative group</h1>
                    <h2>Gerente</h2>
                    <div className="modules">
                        <div className="card">
                            <IdcardFilled style={{fontSize: '60px'}} />
                            <h4>Empleados</h4>
                        </div>
                        <div className="card">
                            <CopyFilled style={{fontSize: '60px'}}/>
                            <h4>Reportes</h4>
                        </div>
                    </div>
                </div>  
            ) }

            { type == 3 && (
                <div className="menu">
                    <h1>Bienvenido a administrative group</h1>
                    <h2>Clientes</h2>
                    <div className="modules">
                        <div className="card">
                            <ShoppingFilled style={{fontSize: '60px'}}/>
                            <h4>Compra</h4>
                        </div>
                        <div className="card">
                            <ProductFilled style={{fontSize: '60px'}} />
                            <h4>Consultar</h4>
                        </div>
                    </div>
                </div>  
            ) }
        </>
    )
}

export default Menu
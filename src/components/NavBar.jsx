import { Button } from "antd"
import { useContext, useEffect } from "react"
import { appContext } from "../context/appContext"
import { useNavigate, useLocation } from "react-router-dom"

const NavBar = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const {userData, setUserData, setLogged, logged} = useContext(appContext)

    function logout(){
        navigate('/login')
        setUserData('')
        setLogged(false)
    }

    return(
        <div className="NavBar">
            <h1>Bienvenido {userData.name}</h1>
            <div>
                { location.pathname !== '/menu'  && 
                    <Button variant="solid" onClick={() => navigate(-1)}>{`< Volver`}</Button>
                }
                <Button color="danger" variant="solid" onClick={logout}>Cerrar Sesion</Button>
            </div>
        </div>
    )
}

export default NavBar
import { useContext, useEffect } from "react"
import NavBar from '../components/NavBar'
import { useNavigate, Outlet } from "react-router-dom"
import { appContext } from "../context/appContext"
const Root = () => {

    const navigate = useNavigate()
    const { logged } = useContext(appContext)
    useEffect(() => navigate('/login'), [])

    return(
        <div className="root">
            { logged && <NavBar/> }
            <Outlet/>
        </div>
    )
}

export default Root
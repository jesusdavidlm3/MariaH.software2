import { useEffect } from "react"
import NavBar from '../components/NavBar'
import { useNavigate, Outlet } from "react-router-dom"

const Root = () => {

    const navigate = useNavigate()
    useEffect(() => navigate('/login'), [])

    return(
        <div className="root">
            <NavBar/>
            <Outlet/>
        </div>
    )
}

export default Root
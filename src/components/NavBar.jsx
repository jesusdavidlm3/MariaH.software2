import { Button } from "antd"

const NavBar = () => {
    return(
        <div className="NavBar">
            <Button type="primary">opcion 1</Button>
            <Button type="primary">opcion 2</Button>
            <Button type="primary">opcion 3</Button>
            <Button color="danger" variant="solid">opcion 4</Button>
        </div>
    )
}

export default NavBar
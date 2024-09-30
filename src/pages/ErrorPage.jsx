import { WarningOutlined } from "@ant-design/icons"

const ErrorPage = () => {
    return(
        <div className="errorPage">
            <WarningOutlined style={{fontSize: '200px'}}/>
            <h1>Ah ocurrido un error</h1>
        </div>
    )
}

export default ErrorPage
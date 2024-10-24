import { appContext } from './appContext'
import { useState } from 'react'

const AppContextProvider = ({children}) => {

    const [logged, setLogged] = useState(false)
    const [userData, setUserData] = useState('')
    const [paymentMethodsList, setPaymentMethodsList] = useState([])

    return(
        <appContext.Provider value={{
            logged,
            setLogged,
            userData,
            setUserData,
            paymentMethodsList,
            setPaymentMethodsList
        }}>
            {children}
        </appContext.Provider>
    )

}

export default AppContextProvider
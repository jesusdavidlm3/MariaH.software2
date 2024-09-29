import { appContext } from './appContext'
import { useState } from 'react'

const AppContextProvider = ({children}) => {

    const [logged, setLogged] = useState(false)

    return(
        <appContext.Provider value={{
            logged,
            setLogged
        }}>
            {children}
        </appContext.Provider>
    )

}

export default AppContextProvider
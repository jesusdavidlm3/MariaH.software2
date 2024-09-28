import { appContext } from './appContext'
import { useState } from 'react'

const appContextProvider = ({children}) => {

    return(
        <appContext.Provider value={{

        }}>
            {children}
        </appContext.Provider>
    )

}

export default appContextProvider
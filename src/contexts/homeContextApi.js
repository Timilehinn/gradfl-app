import React, { createContext, useState } from 'react'

export const HomeContext = createContext()



function HomeContextApi(props) {
   
    const [ login, setLogin ] = useState(false);
    const [ register, setRegister ] = useState(false);

    const values = { login, setLogin, register, setRegister }

    return (
        <HomeContext.Provider value={values} >
            {props.children}
        </HomeContext.Provider>
    )
}

export default HomeContextApi
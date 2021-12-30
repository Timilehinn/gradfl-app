import React,{ useState, createContext } from 'react'


export const AuthContext = createContext();

function AuthContextApi(props) {

    const [ auth, setAuth ] = useState(false);
    const [ userDetails, setUserDetails ] = useState([])
    const [ transactions, setTransactions ] = useState([])
    const [ orders, setOrders ] = useState([])
    
    const allValues = {auth, setAuth, userDetails, setUserDetails, transactions, setTransactions, orders, setOrders };
    
    return (
        <AuthContext.Provider value={allValues} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextApi
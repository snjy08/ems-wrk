import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const addEmployeeResponseContext = createContext()

export const editEmployeeResponseContext = createContext()

export const isAuthTokenContext = createContext()
function ContextShare({ children }) {

    const [addEmployeeResponse, setAddEmployeeResponse] = useState({})

    const [editEmployeetResponse, setEditEmployeeResponse] = useState({})


    return (

        <>
            <addEmployeeResponseContext.Provider value={{ addEmployeeResponse, setAddEmployeeResponse }}>

                <editEmployeeResponseContext.Provider value={{ editEmployeetResponse,setEditEmployeeResponse }}>


                    {children}

                </editEmployeeResponseContext.Provider>
            </addEmployeeResponseContext.Provider>



        </>
    )
}

export default ContextShare
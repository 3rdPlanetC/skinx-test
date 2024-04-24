import React, { createContext, ReactNode, useEffect, useState } from 'react'

export const UserContext = createContext<{
    userData: {
        id: string | number | null
        username: string | null
    }
    setUserData: React.Dispatch<React.SetStateAction<any>>
}>({
    userData: {
        id: null,
        username: null
    },
    setUserData: () => {}
})

export default function UserStore({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState({
        id: '',
        username: ''
    })

    useEffect(() => {}, [userData])
    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

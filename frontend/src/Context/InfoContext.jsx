import { useState } from 'react'
import { createContext } from 'react'

export const InfoContext = createContext()

const InfoContextProvider = (props) => {
    const [userInfoCTX, setUserInfoCTX] = useState({})
    console.log(userInfoCTX);

    return (
        <InfoContext.Provider value={{ userInfoCTX, setUserInfoCTX }}>
            {props.children}
        </InfoContext.Provider>
    )
}

export default InfoContextProvider

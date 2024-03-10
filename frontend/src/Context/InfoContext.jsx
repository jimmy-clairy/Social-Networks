import { useState } from 'react'
import { createContext } from 'react'

export const InfoContext = createContext()

const InfoContextProvider = (props) => {
    const [userInfoCTX, setUserInfoCTX] = useState({})
    const [postsCTX, setPostsCTX] = useState([])
    console.log(userInfoCTX);
    console.log(postsCTX);

    return (
        <InfoContext.Provider value={{ userInfoCTX, setUserInfoCTX, postsCTX, setPostsCTX }}>
            {props.children}
        </InfoContext.Provider>
    )
}

export default InfoContextProvider

import { useEffect } from "react";
import InfoContextProvider from "./Context/InfoContext"
import Routes from "./Routes"
import fetchData from "./utils/fetchData";
import { URL_API_GET_USERS } from "./utils/url_api";

function App() {
  const token = JSON.parse(localStorage.getItem('token'))
  console.log(token);

  return (
    <>
      <InfoContextProvider>
        <Routes />
      </InfoContextProvider>
    </>
  )
}

export default App

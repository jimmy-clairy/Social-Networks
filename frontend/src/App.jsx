import InfoContextProvider from "./Context/InfoContext"
import Routes from "./Routes"

function App() {

  return (
    <>
      <InfoContextProvider>
        <Routes />
      </InfoContextProvider>
    </>
  )
}

export default App

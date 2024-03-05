import { BrowserRouter, Routes, Route } from "react-router-dom"
import Connect from "./pages/Connect"
import Home from "./pages/Home"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Connect />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Connect />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

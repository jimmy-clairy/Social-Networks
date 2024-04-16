import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Trending from "./pages/Trending";
import { useDispatch } from "react-redux";
import { getLocal } from "./utils/localStorage";
import { getUser } from "./actions/user.actions";
import { getUsers } from "./actions/users.actions";

function App() {
  const dispatch = useDispatch()

  const userId = getLocal('userId')
  const token = getLocal('token')

  dispatch(getUser(userId, token))
  dispatch(getUsers())

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

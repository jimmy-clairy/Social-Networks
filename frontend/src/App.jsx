import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Trending from "./pages/Trending";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user.actions";
import { getPosts } from "./actions/post.actions";
import { getLocal } from "./utils/localStorage";


function App() {
  const dispatch = useDispatch()
  const userId = getLocal('userId')
  const token = getLocal('token')

  const getInfo = async () => {
    if (userId && token) {
      const user = await dispatch(getUser(userId, token));
      console.log(user);
    }

    const posts = await dispatch(getPosts());
    console.log(posts);
  }
  getInfo()


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

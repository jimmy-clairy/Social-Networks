import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Profil from "../pages/Profil"
import Trending from "../pages/Trending"

export default function index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}
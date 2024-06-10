import { BrowserRouter, Routes, Route } from "react-router-dom"
import './styles/index.css'
import Layout from './components/Layout';
import Location from './pages/Location';
import Quiz from './pages/Quiz';
import Home from './pages/Home';
import Restaurant from "./pages/Restaurant";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="quiz" element={<Quiz/>} />
          <Route path="location" element={<Location/>} />
          <Route path="listing/:id" element={<Restaurant />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

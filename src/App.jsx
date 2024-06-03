import { BrowserRouter, Routes, Route } from "react-router-dom"
import './styles/index.css'
import Layout from './components/Layout';
import Location from './pages/Location';
import Quiz from './pages/Quiz';
import Home from './pages/Home';
import Restaurant from "./pages/Restaurant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Location/>} />
          <Route path="quiz" element={<Quiz/>} />
          <Route path="home" element={<Home/>} />
          <Route path="home/:id" element={<Restaurant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom"
import './styles/index.css'
import Layout from './components/Layout';
import Location from './pages/Location';
import Quiz from './pages/Quiz';
import Home from './pages/Home';
import Restaurant from "./pages/Restaurant";
import NotFound from "./pages/Error";
import Profile from "./pages/Profile";
import { Auth, Google } from "./pages/auth";
import { Tests } from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="location" element={<Location />} />
          <Route path="listing/:id" element={<Restaurant />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="auth" element={<Auth />} />
          <Route path="tests" element={<Tests />} />
          <Route path="auth/google" element={<Google />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

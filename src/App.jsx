import { BrowserRouter, Routes, Route } from "react-router-dom"
import './styles/index.css'
import Layout from './components/Layout';
import Location from './pages/Location';
import Quiz from './pages/Quiz';
import Home from './pages/Home';
import Restaurant from "./pages/Restaurant";
import NotFound from "./pages/Error";
import Award from "./pages/Awards";
import Profile from "./pages/Profile";
import { Google, Login, Signup, Tests, Activation } from "./pages/auth";
import { PasswordReset, PasswordResetConfirmation } from "./pages/password-reset";

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
          <Route path="award" element={<Award/>} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/signup" element={<Signup />} />
          <Route path="password-reset" element={<PasswordReset />} />
          <Route path="password-reset/:uid/:token" element={<PasswordResetConfirmation />} />
          <Route path="activation/:uid/:token" element={<Activation />} />
          <Route path="tests" element={<Tests />} />
          <Route path="auth/google" element={<Google />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

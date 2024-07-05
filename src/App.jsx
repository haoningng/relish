import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './styles/index.css';
import Layout from './components/Layout';
import Location from './pages/Location';
import Quiz from './pages/Quiz';
import Home from './pages/Home';
import Restaurant from "./pages/Restaurant";
import NotFound from "./pages/Error";
import TooManyRequests from "./pages/TooManyRequests";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import { Google, Login, Signup, Tests, Activation } from "./pages/auth";
import { PasswordReset, PasswordResetConfirmation } from "./pages/password-reset";
import { useAppSelector } from "./redux/hooks";

// For Unit Testing
export const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

function App() {
  const { isAuthenticated } = useAppSelector(state => state.auth)
  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ?
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="location" element={<Location />} />
              <Route path="listing/:id/:distance" element={<Restaurant />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/429" element={<TooManyRequests />} />
            </Route>
          </>
          :
          <>
            <Route path="/" element={<Layout />} >
              <Route index element={<Landing />} />
            </Route>
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/signup" element={<Signup />} />
            <Route path="password-reset" element={<PasswordReset />} />
            <Route path="password-reset/:uid/:token" element={<PasswordResetConfirmation />} />
            <Route path="activation/:uid/:token" element={<Activation />} />
            <Route path="tests" element={<Tests />} />
            <Route path="auth/google" element={<Google />} />
            <Route path="*" element={<Navigate to="/auth/login" replace state={{key: 'from home'}}/>} />
          </>}
      </Routes>
    </BrowserRouter>
  )
}

export default App

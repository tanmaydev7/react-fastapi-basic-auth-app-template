import { Navigate, Route, Routes } from "react-router-dom"

import { RequireAuth } from "@/components/auth/RequireAuth"
import { AppPage } from "./pages/AppPage"
import { LandingPage } from "./pages/LandingPage"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/app"
        element={
          <RequireAuth>
            <AppPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

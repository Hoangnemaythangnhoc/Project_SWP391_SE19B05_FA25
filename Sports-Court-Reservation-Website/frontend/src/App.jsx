import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Fields from './pages/Fields'
import FieldDetail from './pages/FieldDetail'
import Booking from './pages/Booking'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fields" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Fields />
                </main>
              </div>
            } />
            <Route path="/field/:id" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <FieldDetail />
                </main>
              </div>
            } />
            <Route path="/booking" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Booking />
                </main>
              </div>
            } />
            <Route path="/profile" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Profile />
                </main>
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

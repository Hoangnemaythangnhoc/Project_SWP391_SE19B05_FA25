import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, User } from 'lucide-react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
      <header className="header sticky top-0 z-50">
        <div className="header-content">
          <Link to="/" className="logo">
            Sport<span className="highlight">Court</span>
          </Link>

          <div className="nav-links">
            <Link to="/" className="nav-link">Trang chủ</Link>
            <Link to="/fields" className="nav-link">Sân bóng</Link>
            <Link to="/fields" className="nav-link">Tennis</Link>
            <Link to="/fields" className="nav-link">Cầu lông</Link>
            <Link to="/fields" className="nav-link">Bóng chuyền</Link>
            <Link to="/fields" className="nav-link">Bóng rổ</Link>
            <Link to="/fields" className="nav-link">Bóng bàn</Link>
            <Link to="/fields" className="nav-link">Bơi lội</Link>
          </div>

          <div className="nav-icons">
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login-btn">
                <User className="w-4 h-4" />
                <span style={{ marginLeft: '0.5rem' }}>Đăng nhập</span>
              </Link>
              <Link to="/register" className="auth-btn register-btn">
                <User className="w-4 h-4" />
                <span style={{ marginLeft: '0.5rem' }}>Đăng ký</span>
              </Link>
            </div>
            <button
                className="mobile-menu-toggle lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
            <div className="mobile-menu lg:hidden">
              <div className="nav-links-mobile">
                <Link to="/" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Trang chủ</Link>
                <Link to="/fields" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Sân bóng</Link>
                <Link to="/fields" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Tennis</Link>
                <Link to="/fields" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Cầu lông</Link>
                <Link to="/fields" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Bóng chuyền</Link>
                <Link to="/fields" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Bóng rổ</Link>
                <Link to="/fields" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Bóng bàn</Link>
                <Link to="/fields" className="nav-link-mobile" onClick={() => setIsMobileMenuOpen(false)}>Bơi lội</Link>
              </div>
              <div className="auth-buttons">
                <Link to="/login" className="auth-btn login-btn" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-4 h-4" />
                  <span style={{ marginLeft: '0.5rem' }}>Đăng nhập</span>
                </Link>
                <Link to="/register" className="auth-btn register-btn" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-4 h-4" />
                  <span style={{ marginLeft: '0.5rem' }}>Đăng ký</span>
                </Link>
              </div>
            </div>
        )}
      </header>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>SportCourt</h4>
          <p>
            Nền tảng đặt sân thể thao. Kết nối người chơi với các sân chất lượng
            cao.
          </p>
        </div>
        <div className="footer-section">
          <h4>Liên kết nhanh</h4>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/fields">Sân thể thao</Link></li>
            <li><Link to="/booking">Đặt sân</Link></li>
            <li><Link to="/profile">Hồ sơ cá nhân</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <ul>
            <li>123 Đường ABC, Quận 1, TP.HCM</li>
            <li>+84 123 456 789</li>
            <li>info@sportcourt.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © 2024 SportCourt. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  )
}

export default Footer

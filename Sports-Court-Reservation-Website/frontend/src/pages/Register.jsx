import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Calendar, MapPin, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, ShieldCheck, Clock, Star } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Nam',
    address: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { register } = useAuth()

  const isValidEmail = (email) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Client-side validation
    if (!formData.fullName.trim()) {
      setError('Vui lòng nhập họ và tên')
      return
    }
    if (!isValidEmail(formData.email)) {
      setError('Email không hợp lệ')
      return
    }
    if (!/^\+?\d{9,15}$/.test(formData.phone.replace(/\s|-/g, ''))) {
      setError('Số điện thoại không hợp lệ')
      return
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }
    if (!agreeToTerms) {
      setError('Bạn cần đồng ý với Điều khoản và Chính sách')
      return
    }

    setIsLoading(true)

    try {
      const result = await register(formData)

      if (result.success) {
        // Registration successful
        navigate('/')
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError('Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="auth-layout">
        {/* Left: Form */}
        <div className="auth-left">
          <div className="auth-card">
            <Link to="/" className="back-link">
              <ArrowLeft className="w-5 h-5" />
              <span>Trang chủ</span>
            </Link>

            <div className="mb-6">
              <h1 className="auth-title">Đăng ký</h1>
              <p className="auth-subtitle">
                Đã có tài khoản?{' '}
                <Link to="/login" className="auth-link">Đăng nhập ngay.</Link>
              </p>
            </div>

            {error && (
                <div className="alert error mb-4" role="alert" aria-live="polite">{error}</div>
            )}

            <form className="form-grid" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="form-label">Họ và tên <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="form-control">
                  <User className="icon w-5 h-5" />
                  <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="input with-icon"
                      placeholder="Nhập họ và tên"
                      value={formData.fullName}
                      onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="form-label">Email <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="form-control">
                  <Mail className="icon w-5 h-5" />
                  <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="input with-icon"
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="form-label">Số điện thoại <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="form-control">
                  <Phone className="icon w-5 h-5" />
                  <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="input with-icon"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth" className="form-label">Ngày sinh <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="form-control">
                  <Calendar className="icon w-5 h-5" />
                  <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      className="input with-icon"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="form-label">Giới tính</label>
                <select
                    id="gender"
                    name="gender"
                    className="input"
                    value={formData.gender}
                    onChange={handleInputChange}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="form-label">Địa chỉ</label>
                <div className="form-control">
                  <MapPin className="icon w-5 h-5" />
                  <input
                      id="address"
                      name="address"
                      type="text"
                      className="input with-icon"
                      placeholder="Nhập địa chỉ (tùy chọn)"
                      value={formData.address}
                      onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="form-label">Mật khẩu <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="form-control">
                  <Lock className="icon w-5 h-5" />
                  <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="input with-icon with-action"
                      placeholder="Nhập mật khẩu"
                      value={formData.password}
                      onChange={handleInputChange}
                  />
                  <button
                      type="button"
                      className="field-action"
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                    ) : (
                        <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu <span style={{ color: '#ef4444' }}>*</span></label>
                <div className="form-control">
                  <Lock className="icon w-5 h-5" />
                  <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      className="input with-icon with-action"
                      placeholder="Nhập lại mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                  />
                  <button
                      type="button"
                      className="field-action"
                      aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                    ) : (
                        <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="checkbox" htmlFor="agree-terms">
                <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    required
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <span>
                Tôi đồng ý với <a href="#" className="auth-link">Điều khoản sử dụng</a> và <a href="#" className="auth-link">Chính sách bảo mật</a>
              </span>
              </label>

              {/* Divider */}
              <div className="divider">Hoặc đăng ký với</div>

              {/* Google */}
              <button
                  type="button"
                  onClick={() => alert('Tính năng đăng ký Google sẽ được tích hợp sau!')}
                  className="btn btn-google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Đăng ký với Google
              </button>

              {/* Submit */}
              <button
                  type="submit"
                  disabled={isLoading || !agreeToTerms}
                  className="btn btn-primary"
              >
                {isLoading ? (
                    'Đang đăng ký...'
                ) : (
                    <>
                      <CheckCircle className="w-5 h-5" style={{ marginRight: 6 }} />
                      Đăng ký tài khoản
                    </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Brand panel */}
        <div className="auth-right">
          <div className="brand-panel">
            <div className="brand-panel-content">
              <h2 className="brand-title">Gia nhập cộng đồng SportCourt</h2>
              <p className="brand-text">Chỉ vài bước đơn giản để bắt đầu đặt sân yêu thích của bạn.</p>
              <div className="brand-badges">
                <span className="badge"><ShieldCheck className="w-4 h-4" style={{ marginRight: 6 }} /> Bảo mật</span>
                <span className="badge"><Clock className="w-4 h-4" style={{ marginRight: 6 }} /> Nhanh chóng</span>
                <span className="badge"><Star className="w-4 h-4" style={{ marginRight: 6 }} /> Uy tín</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Register
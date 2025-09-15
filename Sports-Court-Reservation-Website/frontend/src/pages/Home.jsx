import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Star, ArrowRight, User, Search, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'

const Home = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const slides = [
    {
      id: 1,
      title: "SportCourt - Ứng dụng đặt sân tập thể thao hàng đầu tại Việt Nam",
      subtitle: "Mang đến trải nghiệm đặt sân trực tuyến thuận tiện và linh hoạt cho người chơi.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop",
      buttonText: "Tải ứng dụng ngay",
      buttonLink: "#"
    },
    {
      id: 2,
      title: "Đặt sân bóng đá dễ dàng",
      subtitle: "Hàng trăm sân bóng đá chất lượng cao đang chờ bạn. Đặt sân chỉ trong vài phút.",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
      buttonText: "Khám phá sân bóng",
      buttonLink: "/fields"
    },
    {
      id: 3,
      title: "Tennis, Cầu lông, Bóng chuyền",
      subtitle: "Đa dạng môn thể thao, đáp ứng mọi nhu cầu tập luyện và thi đấu của bạn.",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=500&fit=crop",
      buttonText: "Xem tất cả môn thể thao",
      buttonLink: "/fields"
    },
    {
      id: 4,
      title: "Ưu đãi hấp dẫn mỗi ngày",
      subtitle: "Nhận ngay ưu đãi lên đến 50% khi đặt sân lần đầu. Nhiều khuyến mãi khác đang chờ bạn.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=500&fit=crop",
      buttonText: "Xem ưu đãi",
      buttonLink: "#"
    }
  ]

  // Auto slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const facilities = [
    {
      id: 1,
      name: 'Sân bóng La Thành',
      location: 'Quận Thanh Xuân',
      distance: '0.0 km',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop',
      type: 'football'
    },
    {
      id: 2,
      name: 'Sân bóng đá Viettel 2',
      location: 'Quận Cầu Giấy',
      distance: '1.2 km',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop',
      type: 'football'
    },
    {
      id: 3,
      name: 'Sân bóng Đầm Hồng 2',
      location: 'Quận Hai Bà Trưng',
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop',
      type: 'football'
    },
    {
      id: 4,
      name: 'Sân bóng Đầm Hồng 1',
      location: 'Quận Hai Bà Trưng',
      distance: '2.8 km',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop',
      type: 'football'
    }
  ]

  const tabs = [
    { id: 'all', name: 'Tất cả' },
    { id: 'football', name: 'Sân bóng đá' },
    { id: 'tennis', name: 'Tennis' },
    { id: 'badminton', name: 'Cầu lông' },
    { id: 'volleyball', name: 'Bóng chuyền' },
    { id: 'basketball', name: 'Bóng rổ' },
    { id: 'tabletennis', name: 'Bóng bàn' },
    { id: 'swimming', name: 'Bơi lội' },
    { id: 'gym', name: 'Gym' },
    { id: 'yoga', name: 'Yoga' }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
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
                <User className="w-4 h-4 mr-2" />
                Đăng nhập
              </Link>
              <Link to="/register" className="auth-btn register-btn">
                <User className="w-4 h-4 mr-2" />
                Đăng ký
              </Link>
            </div>
            <div className="language-selector">
              <span>🇻🇳</span>
              <span>VN</span>
            </div>
            <button 
              className="mobile-menu-toggle lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu lg:hidden">
          <div className="nav-links-mobile">
            <Link to="/" className="nav-link-mobile">Trang chủ</Link>
            <Link to="/fields" className="nav-link-mobile">Sân bóng</Link>
            <Link to="/fields" className="nav-link-mobile">Tennis</Link>
            <Link to="/fields" className="nav-link-mobile">Cầu lông</Link>
            <Link to="/fields" className="nav-link-mobile">Bóng chuyền</Link>
            <Link to="/fields" className="nav-link-mobile">Bóng rổ</Link>
            <Link to="/fields" className="nav-link-mobile">Bóng bàn</Link>
            <Link to="/fields" className="nav-link-mobile">Bơi lội</Link>
         
          </div>
          <div className="auth-buttons">
            <Link to="/login" className="auth-btn login-btn">
              <User className="w-4 h-4 mr-2" />
              Đăng nhập
            </Link>
            <Link to="/register" className="auth-btn register-btn">
              <User className="w-4 h-4 mr-2" />
              Đăng ký
            </Link>
          </div>
        </div>
      )}

      {/* Hero Slideshow */}
      <section className="hero-slideshow">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="slide-content">
                <div className="container">
                  <div className="slide-text">
                    <h1>{slide.title}</h1>
                    <p>{slide.subtitle}</p>
                    <div className="slide-buttons">
                      <Link to={slide.buttonLink} className="slide-btn primary">
                        {slide.buttonText}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                      <Link to="/fields" className="slide-btn secondary">
                        Khám phá ngay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation arrows */}
          <button className="slide-nav prev" onClick={prevSlide}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="slide-nav next" onClick={nextSlide}>
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Dots indicator */}
          <div className="slide-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Search Section */}
          <section className="search-section">
            <h2 className="section-title">Đặt sân thể thao ngay</h2>
            <p className="section-subtitle">Tìm kiếm sân chơi thể thao, thi đấu khắp cả nước</p>
            
            <form className="search-form">
              <div className="form-group">
                <label className="form-label">Chọn môn thể thao</label>
                <select className="form-select">
                  <option>Tất cả môn thể thao</option>
                  <option>Bóng đá</option>
                  <option>Tennis</option>
                  <option>Cầu lông</option>
                  <option>Bóng chuyền</option>
                  <option>Bóng rổ</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Chọn khu vực</label>
                <select className="form-select">
                  <option>Tất cả khu vực</option>
                  <option>Hà Nội</option>
                  <option>TP. Hồ Chí Minh</option>
                  <option>Đà Nẵng</option>
                  <option>Hải Phòng</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Chọn thời gian</label>
                <select className="form-select">
                  <option>Hôm nay</option>
                  <option>Ngày mai</option>
                  <option>Cuối tuần</option>
                  <option>Tuần tới</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Chọn quận/huyện</label>
                <select className="form-select">
                  <option>Tất cả quận/huyện</option>
                  <option>Quận 1</option>
                  <option>Quận 3</option>
                  <option>Quận 7</option>
                  <option>Quận 10</option>
                </select>
              </div>
              
              <button type="submit" className="search-btn">
                <Search className="w-5 h-5" />
                Tìm kiếm ngay
              </button>
            </form>
          </section>

          {/* Promotions */}
          <section className="promotions">
            <h3>Tặng 1 nón thể thao!</h3>
            <p>Đặt sân lần đầu và nhận ngay nón thể thao cao cấp</p>
          </section>

          {/* Facilities Near You */}
          <section className="facilities-section">
            <h2 className="section-title">Sân tập gần bạn</h2>
            <p className="section-subtitle">Sân tập được nhiều người tin dùng và đánh giá cao</p>
            
            <div className="facility-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            
            <div className="facility-grid">
              {facilities.map(facility => (
                <div key={facility.id} className="facility-card">
                  <img 
                    src={facility.image} 
                    alt={facility.name}
                    className="facility-image"
                  />
                  <div className="facility-content">
                    <h3 className="facility-name">{facility.name}</h3>
                    <div className="facility-location">
                      <MapPin className="w-4 h-4" />
                      <span>{facility.location}</span>
                    </div>
                    <div className="facility-distance">
                      <Clock className="w-4 h-4" />
                      <span>Cách {facility.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Facilities */}
          <section className="facilities-section">
            <h2 className="section-title">Đề xuất cho bạn</h2>
            <p className="section-subtitle">Dựa trên sở thích và lịch sử đặt sân của bạn</p>
            
            <div className="facility-grid">
              {facilities.slice(0, 3).map(facility => (
                <div key={facility.id} className="facility-card">
                  <img 
                    src={facility.image} 
                    alt={facility.name}
                    className="facility-image"
                  />
                  <div className="facility-content">
                    <h3 className="facility-name">{facility.name}</h3>
                    <div className="facility-location">
                      <MapPin className="w-4 h-4" />
                      <span>{facility.location}</span>
                    </div>
                    <div className="facility-distance">
                      <Clock className="w-4 h-4" />
                      <span>Cách {facility.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Facilities */}
          <section className="facilities-section">
            <h2 className="section-title">Sân hàng đầu</h2>
            <p className="section-subtitle">Những sân thể thao được đánh giá cao nhất</p>
            
            <div className="facility-grid">
              {facilities.map(facility => (
                <div key={facility.id} className="facility-card">
                  <img 
                    src={facility.image} 
                    alt={facility.name}
                    className="facility-image"
                  />
                  <div className="facility-content">
                    <h3 className="facility-name">{facility.name}</h3>
                    <div className="facility-location">
                      <MapPin className="w-4 h-4" />
                      <span>{facility.location}</span>
                    </div>
                    <div className="facility-distance">
                      <Clock className="w-4 h-4" />
                      <span>Cách {facility.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <section className="newsletter">
            <h2 className="section-title">Đặt sân nhanh chóng, tiết kiệm</h2>
            <p className="section-subtitle">Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi mới nhất cho bạn</p>
            
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Nhập email của bạn"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Đăng ký
              </button>
            </form>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>SportCourt</h4>
            <p>123 Đường ABC, Quận 1, TP.HCM</p>
            <p>Điện thoại: 0904436369</p>
          </div>
          
          <div className="footer-section">
            <h4>Quy định và chính sách</h4>
            <ul>
              <li><a href="#">Điều khoản sử dụng</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Quy định đặt sân</a></li>
              <li><a href="#">Chính sách hoàn tiền</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Liên kết nhanh</h4>
            <ul>
              <li><a href="#">Trang chủ</a></li>
              <li><a href="#">Dành cho đối tác</a></li>
              <li><a href="#">Tin tức</a></li>
              <li><a href="#">Tuyển dụng</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 SportCourt. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
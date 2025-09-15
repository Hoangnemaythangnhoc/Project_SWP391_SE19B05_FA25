import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Star, Filter, Search } from 'lucide-react'

const Fields = () => {
  const [filters, setFilters] = useState({
    distance: 'nearest',
    district: '',
    features: []
  })

  const fields = [
    {
      id: 1,
      name: 'Sân bóng La Thành',
      location: 'Quận Thanh Xuân',
      address: 'La Thành, Thanh Xuân',
      price: '300,000',
      rating: 4.8,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=480&h=320&fit=crop',
      features: ['Mái che', 'Wifi', 'Bãi đỗ xe'],
      sport: 'Bóng đá',
      hours: '05:00 - 22:00'
    },
    {
      id: 2,
      name: 'Sân bóng đá Viettel 2',
      location: 'Quận Thanh Xuân',
      address: 'Thanh Xuân, Hà Nội',
      price: '320,000',
      rating: 4.9,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=480&h=320&fit=crop',
      features: ['Ánh sáng', 'Bãi đỗ xe'],
      sport: 'Bóng đá',
      hours: '05:00 - 22:00'
    },
    {
      id: 3,
      name: 'Sân bóng Đầm Hồng 2',
      location: 'Quận Thanh Xuân',
      address: 'Đầm Hồng, Thanh Xuân',
      price: '280,000',
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=480&h=320&fit=crop',
      features: ['Cỏ nhân tạo', 'Ánh sáng', 'Bãi đỗ xe'],
      sport: 'Bóng đá',
      hours: '05:00 - 22:00'
    },
    {
      id: 4,
      name: 'Sân bóng Đầm Hồng 1',
      location: 'Quận Thanh Xuân',
      address: 'Đầm Hồng, Thanh Xuân',
      price: '270,000',
      rating: 4.6,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=480&h=320&fit=crop',
      features: ['Mái che', 'Wifi'],
      sport: 'Bóng đá',
      hours: '05:00 - 22:00'
    },
    {
      id: 5,
      name: 'Sân bóng Hoàng Huy',
      location: 'Quận Thanh Xuân',
      address: 'Thanh Xuân, Hà Nội',
      price: '290,000',
      rating: 4.5,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=480&h=320&fit=crop',
      features: ['Ánh sáng', 'Bãi đỗ xe'],
      sport: 'Bóng đá',
      hours: '05:00 - 22:00'
    },
    {
      id: 6,
      name: 'Sân bóng Thượng Đình',
      location: 'Quận Thanh Xuân',
      address: 'Thượng Đình, Thanh Xuân',
      price: '260,000',
      rating: 4.8,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=480&h=320&fit=crop',
      features: ['Ánh sáng', 'Bãi đỗ xe', 'Khu vực thay đồ'],
      sport: 'Bóng đá',
      hours: '05:00 - 22:00'
    }
  ]

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleFeatureToggle = (feature) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
          ? prev.features.filter(f => f !== feature)
          : [...prev.features, feature]
    }))
  }

  return (
      <div className="fields-page">
        <div className="container">
          <div className="fields-header">
            <div>
              <h1 className="fields-title">Sân bóng đá</h1>
              <p className="fields-subtitle">Tìm và đặt sân bóng đá nhanh chóng, tiện lợi</p>
            </div>
            <div className="sort-control">
              <span className="sort-label">Sắp xếp theo:</span>
              <select className="sort-select" defaultValue="top">
                <option value="top">Lựa chọn hàng đầu của chúng tôi</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="near">Gần bạn</option>
                <option value="price">Giá thấp đến cao</option>
              </select>
            </div>
          </div>

          <div className="fields-layout">
            <aside className="filters-card">
              <div className="filters-header">
                <Filter className="icon" />
                <h3>Bộ lọc</h3>
              </div>

              <div className="filter-group">
                <div className="group-title">Khoảng cách</div>
                <label className="check-row">
                  <input
                      type="radio"
                      name="distance"
                      checked={filters.distance === 'nearest'}
                      onChange={() => handleFilterChange('distance', 'nearest')}
                  />
                  Gần nhất
                </label>
                <label className="check-row">
                  <input
                      type="radio"
                      name="distance"
                      checked={filters.distance === 'lt3'}
                      onChange={() => handleFilterChange('distance', 'lt3')}
                  />
                  Dưới 3 km
                </label>
                <label className="check-row">
                  <input
                      type="radio"
                      name="distance"
                      checked={filters.distance === 'lt5'}
                      onChange={() => handleFilterChange('distance', 'lt5')}
                  />
                  Dưới 5 km
                </label>
                <label className="check-row">
                  <input
                      type="radio"
                      name="distance"
                      checked={filters.distance === 'lt10'}
                      onChange={() => handleFilterChange('distance', 'lt10')}
                  />
                  Dưới 10 km
                </label>
              </div>

              <div className="filter-group">
                <div className="group-title">Tiện ích</div>
                {['Bãi đỗ xe','Mái che','Ghế ngồi','Quầy nước','Cho thuê giày','Cho thuê dụng cụ','Đèn hỗ trợ','Wifi','Phòng thay đồ','Ánh sáng'].map((feature) => (
                    <label key={feature} className="check-row">
                      <input
                          type="checkbox"
                          checked={filters.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                      />
                      {feature}
                    </label>
                ))}
              </div>

              <button className="apply-btn">
                <Search className="icon" />
                Áp dụng
              </button>
            </aside>

            <section className="fields-content">
              <div className="fields-grid">
                {fields.map((field) => (
                    <div key={field.id} className="field-card">
                      <Link to={`/field/${field.id}`} className="image-wrap">
                        <img src={field.image} alt={field.name} className="field-image" />
                        <div className="rating-pill">
                          <Star className="icon star" />
                          <span>{field.rating}</span>
                        </div>
                      </Link>
                      <div className="field-info">
                        <div className="open-hours">
                          <Clock className="icon" />
                          <span>Mở cửa: {field.hours}</span>
                        </div>
                        <div className="category">Sân bóng đá</div>
                        <Link to={`/field/${field.id}`} className="field-name">{field.name}</Link>
                        <div className="location-row">
                          <MapPin className="icon" />
                          <span>{field.location}</span>
                        </div>
                        <div className="card-footer-row">
                          <div className="badges">
                            {field.features.slice(0, 3).map((f, i) => (
                                <span key={i} className="badge">{f}</span>
                            ))}
                          </div>
                          <div className="price">{field.price}đ</div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>

              <div className="pagination">
                <button className="page-btn">Trước</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">Sau</button>
              </div>
            </section>
          </div>
        </div>
      </div>
  )
}

export default Fields

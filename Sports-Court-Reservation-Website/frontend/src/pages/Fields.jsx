import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Star, Filter, Search, Grid, List } from 'lucide-react'

const Fields = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [filters, setFilters] = useState({
    sport: '',
    district: '',
    priceRange: '',
    features: []
  })

  const fields = [
    {
      id: 1,
      name: 'Sân Cầu Lông ABC',
      location: 'Quận 1, TP.HCM',
      address: '123 Đường ABC, Quận 1',
      price: '150,000',
      rating: 4.8,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      features: ['Mái che', 'Quạt', 'Wifi', 'Bãi đỗ xe'],
      sport: 'Cầu lông',
      availableSlots: 5
    },
    {
      id: 2,
      name: 'Sân Tennis XYZ',
      location: 'Quận 3, TP.HCM',
      address: '456 Đường XYZ, Quận 3',
      price: '200,000',
      rating: 4.9,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop',
      features: ['Mái che', 'Điều hòa', 'Bãi đỗ xe', 'Ánh sáng'],
      sport: 'Tennis',
      availableSlots: 3
    },
    {
      id: 3,
      name: 'Sân Bóng Đá DEF',
      location: 'Quận 7, TP.HCM',
      address: '789 Đường DEF, Quận 7',
      price: '300,000',
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop',
      features: ['Cỏ nhân tạo', 'Ánh sáng', 'Bãi đỗ xe', 'Khu vực thay đồ'],
      sport: 'Bóng đá',
      availableSlots: 2
    },
    {
      id: 4,
      name: 'Sân Bóng Chuyền GHI',
      location: 'Quận 10, TP.HCM',
      address: '321 Đường GHI, Quận 10',
      price: '180,000',
      rating: 4.6,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
      features: ['Mái che', 'Quạt', 'Wifi', 'Khu vực thay đồ'],
      sport: 'Bóng chuyền',
      availableSlots: 4
    },
    {
      id: 5,
      name: 'Sân Cầu Lông JKL',
      location: 'Quận 2, TP.HCM',
      address: '654 Đường JKL, Quận 2',
      price: '120,000',
      rating: 4.5,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      features: ['Mái che', 'Quạt', 'Wifi'],
      sport: 'Cầu lông',
      availableSlots: 7
    },
    {
      id: 6,
      name: 'Sân Tennis MNO',
      location: 'Quận 5, TP.HCM',
      address: '987 Đường MNO, Quận 5',
      price: '250,000',
      rating: 4.8,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop',
      features: ['Mái che', 'Điều hòa', 'Bãi đỗ xe', 'Ánh sáng', 'Khu vực thay đồ'],
      sport: 'Tennis',
      availableSlots: 1
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sân thể thao</h1>
          <p className="text-gray-600">Tìm kiếm và đặt sân thể thao phù hợp với bạn</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Bộ lọc
                </h3>
              </div>
              <div className="card-body space-y-6">
                {/* Sport Type */}
                <div>
                  <label className="form-label">Loại sân</label>
                  <select
                    className="form-select"
                    value={filters.sport}
                    onChange={(e) => handleFilterChange('sport', e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="Cầu lông">Cầu lông</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Bóng đá">Bóng đá</option>
                    <option value="Bóng chuyền">Bóng chuyền</option>
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="form-label">Khu vực</label>
                  <select
                    className="form-select"
                    value={filters.district}
                    onChange={(e) => handleFilterChange('district', e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="Quận 1">Quận 1</option>
                    <option value="Quận 2">Quận 2</option>
                    <option value="Quận 3">Quận 3</option>
                    <option value="Quận 5">Quận 5</option>
                    <option value="Quận 7">Quận 7</option>
                    <option value="Quận 10">Quận 10</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="form-label">Khoảng giá</label>
                  <select
                    className="form-select"
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="0-150000">Dưới 150,000đ</option>
                    <option value="150000-200000">150,000đ - 200,000đ</option>
                    <option value="200000-300000">200,000đ - 300,000đ</option>
                    <option value="300000+">Trên 300,000đ</option>
                  </select>
                </div>

                {/* Features */}
                <div>
                  <label className="form-label">Tính năng</label>
                  <div className="space-y-2">
                    {['Mái che', 'Quạt', 'Điều hòa', 'Wifi', 'Bãi đỗ xe', 'Ánh sáng'].map((feature) => (
                      <label key={feature} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filters.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                        />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Áp dụng bộ lọc
                </button>
              </div>
            </div>
          </div>

          {/* Fields List */}
          <div className="lg:w-3/4">
            {/* View Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Hiển thị {fields.length} sân thể thao
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Fields Grid/List */}
            <div className={viewMode === 'grid' ? 'card-grid card-grid-2' : 'space-y-6'}>
              {fields.map((field) => (
                <div key={field.id} className={viewMode === 'list' ? 'card flex flex-row' : 'card group'}>
                  <div className={viewMode === 'list' ? 'w-64 h-48 flex-shrink-0' : 'relative overflow-hidden'}>
                    <img
                      src={field.image}
                      alt={field.name}
                      className={`w-full h-full object-cover ${viewMode === 'grid' ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}
                    />
                    {viewMode === 'grid' && (
                      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">{field.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={viewMode === 'list' ? 'flex-1 p-6' : 'card-body'}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{field.name}</h3>
                      {viewMode === 'list' && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">{field.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{field.location}</span>
                    </div>
                    
                    {viewMode === 'list' && (
                      <p className="text-gray-600 text-sm mb-3">{field.address}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {field.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {field.features.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          +{field.features.length - 3} khác
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {field.price}đ
                        </div>
                        <div className="text-sm text-gray-500">
                          {field.availableSlots} khung giờ trống
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/field/${field.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Xem chi tiết
                        </Link>
                        <button className="btn btn-outline btn-sm">
                          Đặt ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button className="btn btn-outline btn-sm">Trước</button>
                <button className="btn btn-primary btn-sm">1</button>
                <button className="btn btn-outline btn-sm">2</button>
                <button className="btn btn-outline btn-sm">3</button>
                <button className="btn btn-outline btn-sm">Sau</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fields

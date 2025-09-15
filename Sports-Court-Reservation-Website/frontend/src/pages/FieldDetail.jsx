import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Clock, Star, Calendar, Users, Phone, Mail, ArrowLeft, CheckCircle } from 'lucide-react'

const FieldDetail = () => {
  const { id } = useParams()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  // Mock data - in real app, this would come from API
  const field = {
    id: parseInt(id),
    name: 'Sân Cầu Lông ABC',
    location: 'Quận 1, TP.HCM',
    address: '123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM',
    price: '150,000',
    rating: 4.8,
    reviews: 128,
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop'
    ],
    features: ['Mái che', 'Quạt', 'Wifi', 'Bãi đỗ xe', 'Khu vực thay đồ'],
    description: 'Sân cầu lông chất lượng cao với hệ thống chiếu sáng hiện đại, mái che chống nắng mưa, quạt thông gió và wifi miễn phí. Phù hợp cho cả người chơi nghiệp dư và chuyên nghiệp.',
    contact: {
      phone: '0123 456 789',
      email: 'info@sancaulongabc.com'
    },
    timeSlots: [
      { id: 1, time: '06:00 - 08:00', price: '120,000', available: true },
      { id: 2, time: '08:00 - 10:00', price: '150,000', available: true },
      { id: 3, time: '10:00 - 12:00', price: '150,000', available: false },
      { id: 4, time: '14:00 - 16:00', price: '150,000', available: true },
      { id: 5, time: '16:00 - 18:00', price: '180,000', available: true },
      { id: 6, time: '18:00 - 20:00', price: '200,000', available: true },
      { id: 7, time: '20:00 - 22:00', price: '200,000', available: false }
    ],
    services: [
      { id: 1, name: 'Thuê vợt cầu lông', price: '50,000', unit: 'cặp' },
      { id: 2, name: 'Thuê bóng cầu lông', price: '20,000', unit: 'hộp' },
      { id: 3, name: 'Nước uống', price: '15,000', unit: 'chai' },
      { id: 4, name: 'Khăn lạnh', price: '10,000', unit: 'cái' }
    ]
  }

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) {
      alert('Vui lòng chọn ngày và khung giờ')
      return
    }
    setShowBookingModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/fields" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách sân
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <img
                    src={field.images[0]}
                    alt={field.name}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  <img
                    src={field.images[1]}
                    alt={field.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <img
                    src={field.images[2]}
                    alt={field.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Field Info */}
            <div className="card mb-8">
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{field.name}</h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{field.location}</span>
                    </div>
                    <p className="text-gray-600">{field.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {field.price}đ
                    </div>
                    <div className="flex items-center justify-end space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{field.rating}</span>
                      <span className="text-gray-500">({field.reviews} đánh giá)</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Mô tả</h3>
                  <p className="text-gray-600 leading-relaxed">{field.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Tính năng</h3>
                  <div className="flex flex-wrap gap-2">
                    {field.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Dịch vụ bổ sung</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {field.services.map((service) => (
                      <div key={service.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-gray-500">{service.unit}</div>
                        </div>
                        <div className="font-semibold text-blue-600">
                          {service.price}đ
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Số điện thoại</div>
                      <div className="text-gray-600">{field.contact.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-600">{field.contact.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Đặt sân</h3>
              </div>
              <div className="card-body space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="form-label">Chọn ngày</label>
                  <input
                    type="date"
                    className="form-input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <label className="form-label">Chọn khung giờ</label>
                  <div className="space-y-2">
                    {field.timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        disabled={!slot.available}
                        className={`w-full p-3 text-left rounded-lg border transition-colors ${
                          selectedSlot?.id === slot.id
                            ? 'border-blue-500 bg-blue-50'
                            : slot.available
                            ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{slot.time}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-blue-600">
                              {slot.price}đ
                            </div>
                            {!slot.available && (
                              <div className="text-xs text-red-500">Đã đặt</div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedSlot}
                  className="btn btn-primary w-full btn-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Đặt sân ngay
                </button>

                {/* Quick Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Thông tin nhanh</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Hủy miễn phí trước 2 giờ</li>
                    <li>• Thanh toán tại sân hoặc online</li>
                    <li>• Xác nhận ngay lập tức</li>
                    <li>• Hỗ trợ 24/7</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Xác nhận đặt sân</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Sân:</span>
                <span className="font-medium">{field.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ngày:</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Khung giờ:</span>
                <span className="font-medium">{selectedSlot?.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giá:</span>
                <span className="font-medium text-blue-600">{selectedSlot?.price}đ</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="btn btn-outline flex-1"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setShowBookingModal(false)
                  alert('Đặt sân thành công!')
                }}
                className="btn btn-primary flex-1"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FieldDetail

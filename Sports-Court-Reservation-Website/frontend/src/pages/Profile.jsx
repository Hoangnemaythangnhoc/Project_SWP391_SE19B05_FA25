import React, { useState } from 'react'
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X, History, Settings } from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123 456 789',
    dateOfBirth: '1990-01-01',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    gender: 'Nam'
  })

  const [editData, setEditData] = useState({ ...userInfo })

  const bookingHistory = [
    {
      id: 1,
      fieldName: 'Sân Cầu Lông ABC',
      date: '2024-01-15',
      time: '18:00 - 20:00',
      price: '200,000',
      status: 'completed'
    },
    {
      id: 2,
      fieldName: 'Sân Tennis XYZ',
      date: '2024-01-20',
      time: '16:00 - 18:00',
      price: '180,000',
      status: 'completed'
    },
    {
      id: 3,
      fieldName: 'Sân Bóng Đá DEF',
      date: '2024-01-25',
      time: '20:00 - 22:00',
      price: '300,000',
      status: 'pending'
    }
  ]

  const handleEdit = () => {
    setEditData({ ...userInfo })
    setIsEditing(true)
  }

  const handleSave = () => {
    setUserInfo({ ...editData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...userInfo })
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành'
      case 'pending':
        return 'Chờ xác nhận'
      case 'cancelled':
        return 'Đã hủy'
      default:
        return 'Không xác định'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
            <p className="text-gray-600">Quản lý thông tin và lịch sử đặt sân</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <div className="card">
                <div className="card-body text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{userInfo.name}</h2>
                  <p className="text-gray-600 mb-4">{userInfo.email}</p>
                  <button
                    onClick={handleEdit}
                    className="btn btn-outline btn-sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card mt-6">
                <div className="card-body">
                  <h3 className="text-lg font-semibold mb-4">Thống kê</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng đặt sân:</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tháng này:</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Điểm tích lũy:</span>
                      <span className="font-semibold text-blue-600">1,250</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Personal Information */}
              <div className="card mb-8">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
                </div>
                <div className="card-body">
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="form-label">Họ và tên</label>
                          <input
                            type="text"
                            className="form-input"
                            value={editData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Giới tính</label>
                          <select
                            className="form-select"
                            value={editData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                          >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-input"
                            value={editData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Số điện thoại</label>
                          <input
                            type="tel"
                            className="form-input"
                            value={editData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Ngày sinh</label>
                          <input
                            type="date"
                            className="form-input"
                            value={editData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Địa chỉ</label>
                        <textarea
                          className="form-input"
                          rows="3"
                          value={editData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button onClick={handleSave} className="btn btn-primary">
                          <Save className="w-4 h-4 mr-2" />
                          Lưu thay đổi
                        </button>
                        <button onClick={handleCancel} className="btn btn-outline">
                          <X className="w-4 h-4 mr-2" />
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Họ và tên</div>
                            <div className="font-medium">{userInfo.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Email</div>
                            <div className="font-medium">{userInfo.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Số điện thoại</div>
                            <div className="font-medium">{userInfo.phone}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Ngày sinh</div>
                            <div className="font-medium">{userInfo.dateOfBirth}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Địa chỉ</div>
                            <div className="font-medium">{userInfo.address}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-500">Giới tính</div>
                            <div className="font-medium">{userInfo.gender}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking History */}
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold flex items-center">
                    <History className="w-5 h-5 mr-2" />
                    Lịch sử đặt sân
                  </h3>
                </div>
                <div className="card-body">
                  <div className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{booking.fieldName}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="font-semibold text-blue-600">
                            {booking.price}đ
                          </div>
                        </div>
                        {booking.status === 'pending' && (
                          <div className="mt-3 flex space-x-2">
                            <button className="btn btn-outline btn-sm">
                              Hủy đặt sân
                            </button>
                            <button className="btn btn-primary btn-sm">
                              Xem chi tiết
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {bookingHistory.length === 0 && (
                    <div className="text-center py-8">
                      <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Chưa có lịch sử đặt sân nào</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

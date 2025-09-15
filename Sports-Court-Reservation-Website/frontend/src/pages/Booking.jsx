import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, User, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react'

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    field: null,
    date: '',
    timeSlot: null,
    services: [],
    customerInfo: {
      name: '',
      phone: '',
      email: ''
    },
    paymentMethod: 'cash'
  })

  const fields = [
    { id: 1, name: 'Sân Cầu Lông ABC', location: 'Quận 1, TP.HCM', price: '150,000' },
    { id: 2, name: 'Sân Tennis XYZ', location: 'Quận 3, TP.HCM', price: '200,000' },
    { id: 3, name: 'Sân Bóng Đá DEF', location: 'Quận 7, TP.HCM', price: '300,000' }
  ]

  const timeSlots = [
    { id: 1, time: '06:00 - 08:00', price: '120,000' },
    { id: 2, time: '08:00 - 10:00', price: '150,000' },
    { id: 3, time: '10:00 - 12:00', price: '150,000' },
    { id: 4, time: '14:00 - 16:00', price: '150,000' },
    { id: 5, time: '16:00 - 18:00', price: '180,000' },
    { id: 6, time: '18:00 - 20:00', price: '200,000' },
    { id: 7, time: '20:00 - 22:00', price: '200,000' }
  ]

  const services = [
    { id: 1, name: 'Thuê vợt cầu lông', price: '50,000', unit: 'cặp' },
    { id: 2, name: 'Thuê bóng cầu lông', price: '20,000', unit: 'hộp' },
    { id: 3, name: 'Nước uống', price: '15,000', unit: 'chai' },
    { id: 4, name: 'Khăn lạnh', price: '10,000', unit: 'cái' }
  ]

  const steps = [
    { id: 1, title: 'Chọn sân', description: 'Chọn sân thể thao' },
    { id: 2, title: 'Chọn thời gian', description: 'Chọn ngày và khung giờ' },
    { id: 3, title: 'Dịch vụ bổ sung', description: 'Chọn dịch vụ kèm theo' },
    { id: 4, title: 'Thông tin khách hàng', description: 'Nhập thông tin liên hệ' },
    { id: 5, title: 'Thanh toán', description: 'Xác nhận và thanh toán' }
  ]

  const handleFieldSelect = (field) => {
    setBookingData(prev => ({ ...prev, field }))
    setCurrentStep(2)
  }

  const handleTimeSlotSelect = (timeSlot) => {
    setBookingData(prev => ({ ...prev, timeSlot }))
    setCurrentStep(3)
  }

  const handleServiceToggle = (service) => {
    setBookingData(prev => ({
      ...prev,
      services: prev.services.find(s => s.id === service.id)
        ? prev.services.filter(s => s.id !== service.id)
        : [...prev.services, { ...service, quantity: 1 }]
    }))
  }

  const handleServiceQuantityChange = (serviceId, quantity) => {
    setBookingData(prev => ({
      ...prev,
      services: prev.services.map(s =>
        s.id === serviceId ? { ...s, quantity: Math.max(1, quantity) } : s
      )
    }))
  }

  const handleCustomerInfoChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, [field]: value }
    }))
  }

  const calculateTotal = () => {
    const fieldPrice = bookingData.timeSlot ? parseInt(bookingData.timeSlot.price.replace(/,/g, '')) : 0
    const servicesPrice = bookingData.services.reduce((total, service) => {
      return total + (parseInt(service.price.replace(/,/g, '')) * service.quantity)
    }, 0)
    return fieldPrice + servicesPrice
  }

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Trang chủ
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Đặt sân thể thao</h1>
          <p className="text-gray-600">Hoàn thành các bước để đặt sân thành công</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-4">Các bước đặt sân</h3>
                <div className="space-y-4">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-start space-x-3 p-3 rounded-lg ${
                        currentStep === step.id
                          ? 'bg-blue-50 border border-blue-200'
                          : currentStep > step.id
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-gray-50'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          currentStep === step.id
                            ? 'bg-blue-600 text-white'
                            : currentStep > step.id
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                      </div>
                      <div>
                        <div className={`font-medium ${
                          currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </div>
                        <div className="text-sm text-gray-500">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Step 1: Field Selection */}
            {currentStep === 1 && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-xl font-semibold">Chọn sân thể thao</h2>
                </div>
                <div className="card-body">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fields.map((field) => (
                      <div
                        key={field.id}
                        onClick={() => handleFieldSelect(field)}
                        className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                      >
                        <h3 className="text-lg font-semibold mb-2">{field.name}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{field.location}</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {field.price}đ
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Time Selection */}
            {currentStep === 2 && bookingData.field && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-xl font-semibold">Chọn thời gian</h2>
                  <p className="text-gray-600">Sân: {bookingData.field.name}</p>
                </div>
                <div className="card-body">
                  <div className="mb-6">
                    <label className="form-label">Chọn ngày</label>
                    <input
                      type="date"
                      className="form-input"
                      value={bookingData.date}
                      onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="form-label">Chọn khung giờ</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => handleTimeSlotSelect(slot)}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{slot.time}</span>
                            </div>
                            <div className="font-semibold text-blue-600">
                              {slot.price}đ
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Services */}
            {currentStep === 3 && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-xl font-semibold">Dịch vụ bổ sung</h2>
                  <p className="text-gray-600">Chọn các dịch vụ kèm theo (tùy chọn)</p>
                </div>
                <div className="card-body">
                  <div className="space-y-4">
                    {services.map((service) => {
                      const isSelected = bookingData.services.find(s => s.id === service.id)
                      return (
                        <div
                          key={service.id}
                          className={`p-4 border rounded-lg ${
                            isSelected ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={!!isSelected}
                                onChange={() => handleServiceToggle(service)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <div>
                                <div className="font-medium">{service.name}</div>
                                <div className="text-sm text-gray-500">{service.unit}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="font-semibold text-blue-600">
                                {service.price}đ
                              </div>
                              {isSelected && (
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleServiceQuantityChange(service.id, isSelected.quantity - 1)}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center">{isSelected.quantity}</span>
                                  <button
                                    onClick={() => handleServiceQuantityChange(service.id, isSelected.quantity + 1)}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="btn btn-primary"
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Customer Info */}
            {currentStep === 4 && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>
                </div>
                <div className="card-body">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="form-label">Họ và tên *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={bookingData.customerInfo.name}
                        onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Số điện thoại *</label>
                      <input
                        type="tel"
                        className="form-input"
                        value={bookingData.customerInfo.phone}
                        onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div className="form-group md:col-span-2">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-input"
                        value={bookingData.customerInfo.email}
                        onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                        placeholder="Nhập email (tùy chọn)"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => setCurrentStep(5)}
                      className="btn btn-primary"
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {currentStep === 5 && (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-xl font-semibold">Xác nhận và thanh toán</h2>
                </div>
                <div className="card-body">
                  {/* Booking Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Tóm tắt đặt sân</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sân:</span>
                        <span className="font-medium">{bookingData.field?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngày:</span>
                        <span className="font-medium">{bookingData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Khung giờ:</span>
                        <span className="font-medium">{bookingData.timeSlot?.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giá sân:</span>
                        <span className="font-medium">{bookingData.timeSlot?.price}đ</span>
                      </div>
                      {bookingData.services.length > 0 && (
                        <>
                          <div className="border-t pt-3">
                            <div className="text-gray-600 mb-2">Dịch vụ bổ sung:</div>
                            {bookingData.services.map((service) => (
                              <div key={service.id} className="flex justify-between text-sm">
                                <span>{service.name} x{service.quantity}</span>
                                <span>{formatPrice(parseInt(service.price.replace(/,/g, '')) * service.quantity)}đ</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Tổng cộng:</span>
                          <span className="text-blue-600">{formatPrice(calculateTotal())}đ</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <label className="form-label">Phương thức thanh toán</label>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          checked={bookingData.paymentMethod === 'cash'}
                          onChange={(e) => setBookingData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        />
                        <CreditCard className="w-5 h-5" />
                        <span>Thanh toán tại sân</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="online"
                          checked={bookingData.paymentMethod === 'online'}
                          onChange={(e) => setBookingData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        />
                        <CreditCard className="w-5 h-5" />
                        <span>Thanh toán online</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="btn btn-outline"
                    >
                      Quay lại
                    </button>
                    <button
                      onClick={() => {
                        alert('Đặt sân thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.')
                      }}
                      className="btn btn-primary btn-lg"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Xác nhận đặt sân
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking

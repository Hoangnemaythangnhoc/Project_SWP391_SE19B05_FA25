# Sports Court Reservation Frontend

Giao diện React cho website đặt sân thể thao.

## Công nghệ sử dụng

- **React 18** - Thư viện UI
- **Vite** - Build tool nhanh
- **React Router** - Điều hướng trang
- **Lucide React** - Icon library
- **CSS Custom** - Styling tùy chỉnh

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 16+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
cd frontend
npm install
```

### Chạy development server
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:3000

### Build cho production
```bash
npm run build
```

## Cấu trúc dự án

```
frontend/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx     # Navigation bar
│   │   └── Footer.jsx     # Footer
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Trang chủ
│   │   ├── Fields.jsx     # Danh sách sân
│   │   ├── FieldDetail.jsx # Chi tiết sân
│   │   ├── Booking.jsx    # Đặt sân
│   │   ├── Profile.jsx    # Hồ sơ cá nhân
│   │   ├── Login.jsx      # Đăng nhập
│   │   └── Register.jsx   # Đăng ký
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## Tính năng chính

### 🏠 Trang chủ
- Hero section với call-to-action
- Tìm kiếm sân thể thao
- Sân thể thao nổi bật
- Tính năng nổi bật của website

### 🏟️ Danh sách sân thể thao
- Hiển thị danh sách sân với grid/list view
- Bộ lọc theo loại sân, khu vực, giá
- Phân trang
- Tìm kiếm nâng cao

### 📋 Chi tiết sân
- Thông tin chi tiết sân
- Hình ảnh sân
- Tính năng sân
- Dịch vụ bổ sung
- Đặt sân trực tiếp

### 🎯 Đặt sân
- Quy trình đặt sân 5 bước
- Chọn sân → Thời gian → Dịch vụ → Thông tin → Thanh toán
- Tóm tắt đặt sân
- Phương thức thanh toán

### 👤 Hồ sơ cá nhân
- Thông tin cá nhân
- Chỉnh sửa thông tin
- Lịch sử đặt sân
- Thống kê

### 🔐 Đăng nhập/Đăng ký
- Form đăng nhập với validation
- Form đăng ký với validation
- Đăng nhập social (Google, Facebook)
- Quên mật khẩu

## API Integration

Frontend được cấu hình để kết nối với Spring Boot backend:

- **Backend URL**: http://localhost:9090
- **API Proxy**: Được cấu hình trong `vite.config.js`
- **CORS**: Cần cấu hình CORS trong Spring Boot

## Responsive Design

Giao diện được thiết kế responsive cho:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## Styling

- **CSS Custom Properties** cho theme
- **Utility Classes** cho layout nhanh
- **Component-based** styling
- **Mobile-first** approach

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### Scripts có sẵn

```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run preview      # Preview production build
npm run lint         # Chạy ESLint
```

### Code Style

- Sử dụng functional components với hooks
- Props destructuring
- Consistent naming convention
- Comment code phức tạp

## Deployment

### Build và deploy
```bash
npm run build
# Upload thư mục dist/ lên server
```

### Environment Variables
Tạo file `.env` cho các biến môi trường:
```
VITE_API_URL=http://localhost:9090
VITE_APP_NAME=Sports Court Reservation
```

## Troubleshooting

### Lỗi thường gặp

1. **Port 3000 đã được sử dụng**
   ```bash
   npm run dev -- --port 3001
   ```

2. **Dependencies không cài được**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build lỗi**
   ```bash
   npm run build -- --mode development
   ```

## Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## License

MIT License



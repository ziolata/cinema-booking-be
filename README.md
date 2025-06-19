# Tên dự án: Cinema Booking API

#### 📄 Mô Tả:
    Cinema Booking API 🎬
    Xây dựng hệ thống API cho ứng dụng đặt vé xem phim, hỗ trợ các chức năng: Quản lý người dùng, lịch chiếu, rạp chiếu, tìm kiếm phim, đặt vé và thanh toán trực tuyến.

#### ⚙️ Tính Năng Chính
- Quản lý người dùng: đăng ký, đăng nhập, phân quyền.
- Quản lý lịch chiếu, rạp chiếu, bộ phim, phòng chiếu, ghế ngồi.
- Tìm kiếm bộ phim, Đặt vé, thanh toán trực tuyến.
- Xác thực người dùng bằng JWT.



#### 🚀 Công Nghệ Sử Dụng:
- **Node.js**, **Express.js**
- **Database:** MongoDB (Mongoose)
- **Xác thực:** JWT (JSON Web Token)
- **Tài liệu API:** Swagger UI
- **Triển khai:** PM2 & Nginx

#### 📂 Cấu Trúc Thư mục

    📂 src/
    │
    ├── config/         # Cấu hình server, database, swagger
    ├── controllers/    # Xử lý logic các API
    ├── middleware/     # Middleware: auth, logger, geoip
    ├── models/         # Định nghĩa MongoDB Schema
    ├── routes/         # Định nghĩa các API routes
    ├── services/       # Các xử lý nghiệp vụ
    ├── utils/          # Các hàm tiện ích
    │
    └── server.js       # File khởi chạy server

#### 🌐 Demo
    API Docs: http://cinema.ziodev.site/api-docs (Giao diện Swagger UI – hỗ trợ kiểm thử API trực tiếp)
   

#### ⚡Hướng Dẫn Cài Đặt
    
    1. Clone Project
     - git clone https://github.com/ziolata/cinema-booking-be.git 
    2. Cài đặt thư viện
     - npm install
    3. Cấu hình môi trường
    Tạo file .env và cấu hình:
    theo mẫu:
        PORT=5000
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        EMAIL_USER=your_email@gmail.com
        EMAIL_PASS=your_email_password
        LINK=yourdomain
        CLOUD_NAME=cloudinary_name
        API_KEY=API_key_cloudinary
        API_SECRET=secret_key_cloudinary
        vnp_TmnCode=tmncode_vnpay_sandbox
        vnp_HashSecret=secret_vnpay_sandbox
        vnp_Url=url_vnpay_sandbox
        vnp_ReturnUrl=url_return

    4.Chạy server
      - npm run dev


#### 📚 Tài Liệu API
    Tài liệu hóa API với Swagger UI.
    Swagger UI: http://cinema.ziodev.site/api-docs

Bạn có thể kiểm thử các API trực tiếp trên Swagger UI:
-   Đăng ký, đăng nhập

-   Kích hoạt tài khoản, Đổi mật khẩu, quên mật khẩu - đặt lại mật khẩu

-   Tìm kiếm phim, Đặt vé và thanh toán

-    Các chức năng quản lý khác

#### 🛠 Triển khai
    Triển khai với PM2 và Nginx trên Windows Server.

    PM2: Quản lý tiến trình Node.js

    Nginx: Cấu hình proxy và phục vụ API

#### 📫 Tác Giả & Liên hệ
**Tác giả:** ziolata  

**Email:** [ziolata3@gmail.com](mailto:ziolata3@gmail.com)

**GitHub:** [https://github.com/ziolata/](https://github.com/ziolata)

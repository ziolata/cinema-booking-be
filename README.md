Tên dự án: Cinema Booking API
Mô Tả:
    Xây dựng hệ thống API cho ứng dụng đặt vé xem phim với các chức năng:

    Quản lý người dùng: đăng ký, đăng nhập, phân quyền.

    Quản lý lịch chiếu, rạp chiếu, phòng chiếu, ghế ngồi.

    Tìm kiếm bộ phim, đặt vé, thanh toán.

    Xác thực và phân quyền người dùng bằng JWT.

    Tài liệu hóa API với Swagger UI, hỗ trợ kiểm thử trực tiếp.

    Triển khai cơ bản với PM2 và Nginx trên Windows Server.

Công Nghệ Sử Dụng:
    Node.js, Express.js

    MongoDB (Mongoose)

    JWT (JSON Web Token)

    Swagger UI

    PM2 & Nginx (Triển khai trên Windows Server)

Demo
    API Docs: http://cinema.ziodev.site/api-docs
    (Giao diện Swagger UI – hỗ trợ kiểm thử API trực tiếp)

Hướng Dẫn Cài Đặt
    1. Clone Project
    bash
    Sao chép
    Chỉnh sửa
    git clone https://github.com/ziolata/cinema-booking-be.git
    cd cinema-booking-be
    2. Cài đặt thư viện
    bash
    Sao chép
    Chỉnh sửa
    npm install
    3. Cấu hình môi trường
    Tạo file .env và cấu hình:

    env
    Sao chép
    Chỉnh sửa
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password
    LINK= yourdomain
Chạy server
    bash
    Sao chép
    Chỉnh sửa
    npm run dev
📂 Cấu Trúc Thư Mục
    text
    Sao chép
    Chỉnh sửa
    src/
    ├── config/           # Cấu hình server, database, swagger
    ├── controllers/      # Xử lý logic các API
    ├── middleware/       # Các middleware (auth, logger, geoip)
    ├── models/           # Định nghĩa các schema MongoDB
    ├── routes/           # Định nghĩa các API routes
    ├── services/         # Các xử lý nghiệp vụ
    ├── utils/            # Các hàm tiện ích
    ├── server.js         # File chạy server chính
📚 Tài Liệu API
    Swagger UI: http://cinema.ziodev.site/api-docs

    Bạn có thể kiểm thử các API trực tiếp trên Swagger UI:

    Đăng ký, đăng nhập

    Đổi mật khẩu

    Kích hoạt tài khoản

    Đặt vé, thanh toán

    Các chức năng quản lý khác

Deployment
    Dự án được triển khai bằng:

    PM2: Quản lý tiến trình Node.js

    Nginx: Cấu hình proxy và phục vụ API

Liên Hệ
    Email: ziolata3@gmail.com

    GitHub: https://github.com/ziolata


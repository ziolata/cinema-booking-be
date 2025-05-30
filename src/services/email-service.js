import { transporter } from "../config/nodemailer.js";
export const sendResetEmail = async (to, link) => {
	const mailOptions = {
		from: `"Cinema AZ Web App" <${process.env.EMAIL_USER}>`,
		to,
		subject: "Đặt lại mật khẩu",
		html: `<p>Bạn đã yêu cầu đặt lại mật khẩu.</p>
            <p>Nhấp vào liên kết dưới đây để đặt lại mật khẩu:</p>
            <a href="${link}">Click vào đây để đặt lại mật khẩu</a>
            <p>Liên kết này sẽ hết hạn sau 15 phút.</p>`,
	};

	await transporter.sendMail(mailOptions);
};

export const sendActivateEmail = async (to, link) => {
	const mailOptions = {
		from: `"Cinema AZ Web App" <${process.env.EMAIL_USER}>`,
		to,
		subject: "Kích hoạt tài khoản Cinema AZ",
		html: `<p>Bạn vừa tạo tài khoản tại.....</p>
            <p>Nhấp vào liên kết dưới đây để kích hoạt tài khoản:</p>
            <a href="${link}">Click vào đây</a>
            <p>Liên kết này sẽ hết hạn sau 15 phút.</p>`,
	};

	await transporter.sendMail(mailOptions);
};

export const sendBookingEmail = async (to, link) => {
	const mailOptions = {
		from: `"Cinema AZ Web App" <${process.env.EMAIL_USER}>`,
		to,
		subject: "Bạn có một đơn booking vé xem phim",
		html: `<p>Bạn vừa booking vé xem phim tại Cinema AZ.....</p>
            <p>Nhấp vào liên kết dưới đây để xem chi tiết:</p>
            <a href="${link}">Click vào đây</a>
           `,
	};

	await transporter.sendMail(mailOptions);
};

export const sendTicket = async (to, item) => {
	const mailOptions = {
		from: `"Cinema AZ Web App" <${process.env.EMAIL_USER}>`,
		to,
		subject: "Bạn đã thanh toán thành công tại Cinema AZ",
		html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #2c3e50;">Bạn đã đặt Vé thành công! 🎉</h2>
                <p style="font-size: 16px; color: #555;">Cảm ơn bạn đã đặt vé tại <strong>CinemaAZ</strong>.</p>
                
                <!-- Danh sách sản phẩm hiển thị theo hàng ngang -->
                <p style="font-size: 16px; color: #555;">Sản phẩm đã đặt:</p>
                <table style="width: 100%; text-align: center; margin: 20px auto;">
                
                    <tr>
                        ${item
													.map(
														(product) => `
                            <td style="padding: 10px;">
                               
                                <p style="font-size: 16px; font-weight: bold; color: #333;">${product}</p>
                            </td>
                        `,
													)
													.join("")}
                    </tr>
                </table>

                <!-- Nút xem đơn hàng -->
                <a href="https://your-ecommerce-site.com/" 
                   style="display: inline-block; padding: 10px 15px; background-color: #3498db; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; margin-top: 20px;">
                    Xem chi tiết tại đây
                </a>
            </div>
        `,
	};

	await transporter.sendMail(mailOptions);
};

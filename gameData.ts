import type { ScamScenario, ShopItem, TypingCommand } from "./schema";

export const scamScenarios: ScamScenario[] = [
  // Level 1-3: Easy scenarios
  {
    id: "email-1",
    type: "email",
    title: "Thông báo trúng thưởng iPhone 15",
    content: `Xin chào,

Chúc mừng bạn đã TRÚNG THƯỞNG iPhone 15 Pro Max trị giá 35.000.000 VNĐ!

Để nhận giải thưởng, vui lòng click vào link bên dưới và nhập thông tin cá nhân + số tài khoản ngân hàng để chúng tôi chuyển khoản phí vận chuyển 500.000đ.

👉 http://iphone-tructhot.xyz/nhan-thuong

Nhanh tay! Giải thưởng chỉ có hiệu lực trong 24 giờ!

Trân trọng,
Ban Tổ Chức`,
    sender: "tructhot@iphone-khuyen-mai.com",
    isScam: true,
    explanation: "Email lừa đảo điển hình: yêu cầu trả phí để nhận thưởng, link giả mạo với đuôi .xyz đáng ngờ, tạo áp lực thời gian, yêu cầu thông tin ngân hàng.",
    difficulty: 1,
    redFlags: ["Yêu cầu trả phí để nhận thưởng", "Link .xyz đáng ngờ", "Email không chính thức", "Tạo áp lực thời gian"]
  },
  {
    id: "sms-1",
    type: "sms",
    title: "Tin nhắn từ Ngân hàng",
    content: `[VIETCOMBANK] Tai khoan cua ban vua bi khoa do phat hien hoat dong bat thuong. Truy cap ngay: vietcombank-xacthuc.com de mo khoa. Lien he 1900xxxx neu can ho tro.`,
    sender: "+84987654321",
    isScam: true,
    explanation: "SMS giả mạo ngân hàng: link không phải domain chính thức (vietcombank.com.vn), số điện thoại không phải hotline chính thức, tạo hoảng loạn để nạn nhân click link.",
    difficulty: 2,
    redFlags: ["Domain giả mạo", "Số điện thoại lạ", "Tạo hoảng loạn", "Không có thông tin cá nhân"]
  },
  {
    id: "email-2",
    type: "email",
    title: "Xác nhận đơn hàng Shopee",
    content: `Kính gửi Quý khách,

Đơn hàng #SPE892347123 của bạn đã được xác nhận thành công.

Chi tiết đơn hàng:
- Sản phẩm: Tai nghe Bluetooth Sony WH-1000XM4
- Số tiền: 6.490.000đ
- Phương thức thanh toán: Thanh toán khi nhận hàng

Đơn hàng sẽ được giao trong 3-5 ngày làm việc.

Theo dõi đơn hàng: https://shopee.vn/tracking/SPE892347123

Cảm ơn bạn đã mua sắm tại Shopee!
---
Shopee Vietnam
Email: support@shopee.vn
Hotline: 1900 1234`,
    sender: "noreply@shopee.vn",
    isScam: false,
    explanation: "Email chính thống từ Shopee: domain email chính xác (@shopee.vn), link tracking chính thức (shopee.vn), không yêu cầu thông tin nhạy cảm, có hotline chính thức.",
    difficulty: 2,
  },
  {
    id: "website-1",
    type: "website",
    title: "Trang web đăng nhập Facebook",
    content: `URL: faceb00k-login.security-check.com

Trang hiển thị giao diện Facebook yêu cầu:
- Nhập email hoặc số điện thoại
- Nhập mật khẩu
- Thông báo: "Tài khoản của bạn cần xác minh bảo mật"`,
    url: "faceb00k-login.security-check.com",
    isScam: true,
    explanation: "Website phishing: URL giả mạo với chữ '0' thay 'o', không phải facebook.com, domain lạ security-check.com, mục đích đánh cắp thông tin đăng nhập.",
    difficulty: 3,
    redFlags: ["URL giả mạo (faceb00k thay vì facebook)", "Domain không chính thức", "Yêu cầu đăng nhập lại"]
  },
  // Level 4-6: Medium difficulty
  {
    id: "email-3",
    type: "email",
    title: "Cơ hội việc làm tại nhà",
    content: `Xin chào bạn,

Chúng tôi đang tìm kiếm cộng tác viên làm việc online tại nhà với thu nhập hấp dẫn:

📌 Công việc: Like, share bài viết trên mạng xã hội
💰 Thu nhập: 500.000đ - 2.000.000đ/ngày
⏰ Thời gian: Linh hoạt, 2-3 giờ/ngày
✅ Không cần kinh nghiệm

Để bắt đầu, bạn chỉ cần nạp 200.000đ phí đăng ký để nhận tài khoản làm việc.

Liên hệ Zalo: 0912.xxx.xxx để được hướng dẫn chi tiết.

Chân thành,
HR Team - Digital Marketing Co.`,
    sender: "hr@digital-job-online.net",
    isScam: true,
    explanation: "Lừa đảo việc làm: hứa hẹn thu nhập phi thực tế, yêu cầu đóng phí trước khi làm việc, công việc mơ hồ (like/share), liên hệ qua Zalo thay vì kênh chính thức.",
    difficulty: 4,
    redFlags: ["Thu nhập phi thực tế", "Yêu cầu đóng phí trước", "Công việc mơ hồ", "Liên hệ qua Zalo cá nhân"]
  },
  {
    id: "call-1",
    type: "call",
    title: "Cuộc gọi từ Công an",
    content: `Người gọi tự xưng là Đại úy Nguyễn Văn A từ Công an TP.HCM:

"Chứng minh nhân dân của anh/chị đang bị sử dụng trong một đường dây rửa tiền. Anh/chị cần chuyển tiền vào tài khoản an toàn để phục vụ điều tra. Nếu không hợp tác, anh/chị sẽ bị khởi tố ngay lập tức."

Yêu cầu giữ bí mật, không được thông báo cho gia đình.`,
    sender: "+84123456789",
    isScam: true,
    explanation: "Lừa đảo mạo danh công an: Công an không bao giờ yêu cầu chuyển tiền qua điện thoại, không đe dọa khởi tố qua điện thoại, không yêu cầu giữ bí mật với gia đình.",
    difficulty: 5,
    redFlags: ["Yêu cầu chuyển tiền", "Đe dọa khởi tố", "Yêu cầu giữ bí mật", "Gọi điện trực tiếp thay vì triệu tập"]
  },
  {
    id: "sms-2",
    type: "sms",
    title: "Thông báo từ Bưu điện",
    content: `[VNPOST] Buu pham cua ban khong the giao do dia chi khong chinh xac. Cap nhat dia chi tai: vnpost-capnhat.com/tracking?id=VN123456 trong 24h de tranh bi tra lai.`,
    sender: "VNPOST",
    isScam: true,
    explanation: "SMS giả mạo VNPOST: domain không chính thức (vnpost.vn mới đúng), tạo áp lực thời gian 24h, link đáng ngờ với subdomain lạ.",
    difficulty: 4,
    redFlags: ["Domain giả mạo", "Tạo áp lực thời gian", "Không có thông tin cụ thể về bưu phẩm"]
  },
  {
    id: "email-4",
    type: "email",
    title: "Thông báo bảo trì từ Google",
    content: `Kính gửi người dùng Google,

Hệ thống của chúng tôi phát hiện tài khoản của bạn có hoạt động đăng nhập bất thường từ:
- Vị trí: Moscow, Russia
- Thiết bị: Windows PC
- Thời gian: Hôm qua lúc 03:45 AM

Nếu đây không phải bạn, vui lòng xác minh tài khoản ngay:
https://accounts.google.com/security-check

Nếu bạn nhận ra hoạt động này, bạn có thể bỏ qua email này.

Trân trọng,
Google Security Team
---
This email was sent to your.email@gmail.com
Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043`,
    sender: "no-reply@accounts.google.com",
    isScam: false,
    explanation: "Email bảo mật chính thức từ Google: domain email đúng (@accounts.google.com), link đến domain chính thức (accounts.google.com), không yêu cầu nhập lại mật khẩu qua email, có thông tin footer đầy đủ.",
    difficulty: 5,
  },
  // Level 7-10: Hard scenarios
  {
    id: "website-2",
    type: "website",
    title: "Trang thanh toán Agoda",
    content: `URL: agoda-payment.secure-booking.net

Trang hiển thị:
- Logo Agoda chính thức
- Giao diện thanh toán giống y hệt Agoda
- Yêu cầu nhập thông tin thẻ tín dụng
- Có biểu tượng SSL "Secure" màu xanh
- Giá phòng rẻ hơn 40% so với các trang khác`,
    url: "agoda-payment.secure-booking.net",
    isScam: true,
    explanation: "Website phishing tinh vi: domain không phải agoda.com, giá rẻ bất thường, SSL không đảm bảo website an toàn (lừa đảo cũng có SSL), giao diện copy y hệt.",
    difficulty: 7,
    redFlags: ["Domain không chính thức", "Giá rẻ bất thường", "Chỉ có SSL không đủ đảm bảo", "Redirect từ link lạ"]
  },
  {
    id: "email-5",
    type: "email",
    title: "Cập nhật bảo mật từ Ngân hàng",
    content: `Kính gửi Quý khách hàng,

Theo quy định của Ngân hàng Nhà nước, Techcombank yêu cầu tất cả khách hàng cập nhật thông tin sinh trắc học (eKYC) trước ngày 31/12/2024.

Quý khách vui lòng:
1. Đăng nhập vào ứng dụng Techcombank Mobile
2. Vào mục Cài đặt > Cập nhật thông tin
3. Thực hiện theo hướng dẫn

Trường hợp không cập nhật, tài khoản có thể bị hạn chế một số tính năng.

Mọi thắc mắc xin liên hệ:
- Hotline: 1800 588 822 (miễn phí)
- Website: techcombank.com.vn

Trân trọng,
Ngân hàng TMCP Kỹ Thương Việt Nam`,
    sender: "ekyc-notification@techcombank.com.vn",
    isScam: false,
    explanation: "Email chính thức từ ngân hàng: hướng dẫn thực hiện trong app chính thức (không qua link), domain email đúng (@techcombank.com.vn), có hotline chính thức, không yêu cầu thông tin nhạy cảm qua email.",
    difficulty: 6,
  },
  {
    id: "sms-3",
    type: "sms",
    title: "Khuyến mãi từ nhà mạng",
    content: `[VIETTEL] Chuc mung ban duoc tang 50GB DATA mien phi thang nay! Soan TK gui 191 de kiem tra tai khoan. Chi tiet: viettel.vn/khuyenmai`,
    sender: "VIETTEL",
    isScam: false,
    explanation: "SMS chính thức từ Viettel: hướng dẫn soạn tin nhắn đến đầu số chính thức (191), link đến website chính thức (viettel.vn), không yêu cầu thông tin cá nhân.",
    difficulty: 6,
  },
  {
    id: "call-2",
    type: "call",
    title: "Cuộc gọi từ số lạ",
    content: `Người gọi tự xưng là nhân viên bảo hiểm:

"Xin chào, tôi là nhân viên từ công ty bảo hiểm XYZ. Chúng tôi đang có chương trình bảo hiểm sức khỏe ưu đãi đặc biệt chỉ 500.000đ/năm. Tôi có thể gặp anh/chị để tư vấn chi tiết không?"

Yêu cầu hẹn gặp trực tiếp để tư vấn.`,
    sender: "+84901234567",
    isScam: false,
    explanation: "Cuộc gọi telesales bình thường: không yêu cầu chuyển tiền, không đe dọa, chỉ xin hẹn gặp tư vấn. Mặc dù có thể phiền nhưng không phải lừa đảo.",
    difficulty: 7,
  },
  {
    id: "email-6",
    type: "email",
    title: "Thư mời đầu tư crypto",
    content: `Hi there,

I'm reaching out because I noticed your interest in cryptocurrency investments.

Our AI-powered trading bot has generated consistent returns of 15-25% monthly for our members. With just a $500 initial investment, you can start earning passive income today.

✅ Guaranteed returns - no risk
✅ Withdraw anytime
✅ 24/7 support
✅ Used by 50,000+ investors worldwide

Join now: https://crypto-ai-profits.io/invest

Limited spots available. Don't miss out on this life-changing opportunity!

Best,
Alex Chen
Senior Investment Advisor
CryptoAI Trading Ltd.`,
    sender: "alex.chen@crypto-ai-profits.io",
    isScam: true,
    explanation: "Lừa đảo đầu tư crypto: hứa hẹn lợi nhuận cao không rủi ro (không có đầu tư nào như vậy), tạo FOMO (limited spots), domain đáng ngờ, không có giấy phép hoạt động.",
    difficulty: 8,
    redFlags: ["Hứa lợi nhuận cao không rủi ro", "Tạo FOMO", "Không có giấy phép", "Yêu cầu đầu tư tiền"]
  },
  {
    id: "website-3",
    type: "website",
    title: "Trang đổi mật khẩu Microsoft",
    content: `URL: login.microsoftonline.com/reset-password

Trang hiển thị:
- Logo Microsoft chính thức
- Form nhập email
- Sau đó yêu cầu xác minh qua mã OTP gửi về email/điện thoại
- Giao diện chuẩn Microsoft 365`,
    url: "login.microsoftonline.com/reset-password",
    isScam: false,
    explanation: "Trang đổi mật khẩu chính thức của Microsoft: domain chính xác (microsoftonline.com là domain chính thức của Microsoft), quy trình xác minh qua OTP là chuẩn bảo mật.",
    difficulty: 8,
  },
  {
    id: "email-7",
    type: "email",
    title: "Thông báo vi phạm bản quyền",
    content: `THÔNG BÁO KHẨN CẤP

Chúng tôi phát hiện tài khoản của bạn đã tải lên nội dung vi phạm bản quyền. Theo quy định, bạn có thể bị phạt đến 150.000 USD.

Tuy nhiên, nếu bạn thanh toán phí giải quyết $299 trong vòng 48 giờ, vụ việc sẽ được hủy bỏ.

Thanh toán ngay: [Link thanh toán]

Nếu không thanh toán, hồ sơ của bạn sẽ được chuyển đến cơ quan pháp luật.

Legal Department
Copyright Protection Agency`,
    sender: "legal@copyright-claims.org",
    isScam: true,
    explanation: "Lừa đảo tống tiền: tạo hoảng loạn với số tiền phạt lớn, yêu cầu thanh toán gấp, không có cơ quan nào xử lý vi phạm bản quyền theo cách này, domain không chính thức.",
    difficulty: 9,
    redFlags: ["Yêu cầu thanh toán gấp", "Đe dọa pháp lý", "Tạo hoảng loạn", "Không có thông tin cụ thể về vi phạm"]
  },
  {
    id: "sms-4",
    type: "sms",
    title: "Thông báo từ cơ quan thuế",
    content: `[THUEVN] Ban co khoan hoan thue 2.500.000d. Dang ky tai khoan nhan tien tai: thuevietnam-hoantien.com. Het han: 15/12/2024`,
    sender: "THUEVN",
    isScam: true,
    explanation: "SMS giả mạo cơ quan thuế: cơ quan thuế không thông báo hoàn tiền qua SMS, domain giả (thuevietnam.gov.vn mới đúng), tạo áp lực thời gian.",
    difficulty: 9,
    redFlags: ["Domain giả mạo", "Cơ quan nhà nước không làm việc qua SMS", "Tạo áp lực thời gian", "Yêu cầu đăng ký tài khoản"]
  },
];

export const shopItems: ShopItem[] = [
  // Items
  {
    id: "shield-basic",
    name: "Khiên Cơ Bản",
    description: "Tăng 10 HP khi bị trả lời sai",
    price: 100,
    icon: "shield",
    type: "item",
    effect: "hp_protect_10",
  },
  {
    id: "shield-pro",
    name: "Khiên Titan",
    description: "Tăng 25 HP khi bị trả lời sai",
    price: 300,
    icon: "shield-half",
    type: "item",
    effect: "hp_protect_25",
  },
  {
    id: "time-bonus",
    name: "Đồng Hồ Thời Gian",
    description: "+5 giây cho mỗi câu hỏi",
    price: 150,
    icon: "clock",
    type: "item",
    effect: "time_bonus_5",
  },
  {
    id: "hint-pack",
    name: "Gói Gợi Ý",
    description: "Hiển thị 1 red flag mỗi câu",
    price: 200,
    icon: "lightbulb",
    type: "item",
    effect: "show_hint",
  },
  {
    id: "double-money",
    name: "Nhân Đôi Tiền",
    description: "x2 tiền thưởng trong game",
    price: 500,
    icon: "coins",
    type: "item",
    effect: "double_money",
  },
  {
    id: "scanner",
    name: "Máy Quét URL",
    description: "Highlight URL đáng ngờ",
    price: 250,
    icon: "scan",
    type: "item",
    effect: "url_scanner",
  },
  // Avatars
  {
    id: "avatar-hacker",
    name: "Hacker Elite",
    description: "Avatar hacker chuyên nghiệp",
    price: 400,
    icon: "terminal",
    type: "avatar",
  },
  {
    id: "avatar-detective",
    name: "Thám Tử Mạng",
    description: "Avatar thám tử điều tra",
    price: 350,
    icon: "search",
    type: "avatar",
  },
  {
    id: "avatar-shield",
    name: "Chiến Binh Bảo Mật",
    description: "Avatar chiến binh bảo vệ",
    price: 450,
    icon: "shield-check",
    type: "avatar",
  },
  {
    id: "avatar-robot",
    name: "AI Guardian",
    description: "Avatar robot bảo vệ",
    price: 600,
    icon: "bot",
    type: "avatar",
  },
  {
    id: "avatar-ninja",
    name: "Cyber Ninja",
    description: "Avatar ninja mạng",
    price: 500,
    icon: "swords",
    type: "avatar",
  },
];

export const typingCommands: TypingCommand[] = [
  { command: "sudo kill virus", difficulty: 1 },
  { command: "rm -rf malware", difficulty: 2 },
  { command: "firewall --enable", difficulty: 2 },
  { command: "scan --deep --all", difficulty: 3 },
  { command: "encrypt --aes256", difficulty: 3 },
  { command: "sudo apt purge trojan", difficulty: 4 },
  { command: "nmap -sV localhost", difficulty: 4 },
  { command: "iptables -A INPUT -j DROP", difficulty: 5 },
  { command: "gpg --encrypt --armor file", difficulty: 5 },
  { command: "openssl req -x509 -nodes", difficulty: 6 },
  { command: "hashcat -m 1000 -a 0 hash.txt", difficulty: 7 },
  { command: "tcpdump -i eth0 port 443", difficulty: 7 },
  { command: "nikto -h target -ssl -Cgidirs", difficulty: 8 },
  { command: "sqlmap -u url --dbs --batch", difficulty: 8 },
  { command: "msfconsole -x exploit/multi", difficulty: 9 },
  { command: "wireshark -k -i eth0 -f icmp", difficulty: 9 },
  { command: "aircrack-ng -w wordlist.txt cap", difficulty: 10 },
];
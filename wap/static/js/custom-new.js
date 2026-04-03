/**
 * custom-new.js
 * Tạo ngày: 2024
 * Mô tả: Tệp JavaScript tùy chỉnh - Dịch Tiếng Trung sang Tiếng Việt
 */

// ============================================================
// BẢNG DỊCH TIẾNG TRUNG → TIẾNG VIỆT
// ============================================================
var VI_TRANSLATIONS = {
    // Điều hướng chính
    '首页': 'Trang chủ',
    '优惠': 'Khuyến mãi',
    '客服': 'Hỗ trợ',
    '赞助': 'Tài trợ',
    '我的': 'Của tôi',

    // Đăng nhập / Đăng ký
    '登录': 'Đăng nhập',
    '注册': 'Đăng ký',
    '立即登录': 'Đăng nhập ngay',
    '请登录！': 'Vui lòng đăng nhập!',
    '用户名': 'Tên đăng nhập',
    '密码': 'Mật khẩu',
    '验证码': 'Mã xác nhận',
    '验证码 ': 'Mã xác nhận ',
    '登录密码': 'Mật khẩu đăng nhập',
    '确认密码': 'Xác nhận mật khẩu',
    '真实姓名': 'Tên thật',
    '支付密码': 'Mật khẩu thanh toán',
    '先去逛逛': 'Khám phá trước',
    '在线客服': 'Hỗ trợ trực tuyến',
    '您还未登录': 'Bạn chưa đăng nhập',
    '登录/注册后查看': 'Xem sau khi đăng nhập/đăng ký',
    '您的账号登陆过期，请重新登陆': 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại',
    '认证失败': 'Xác thực thất bại',
    '注': '  Đăng',
    '册': '  ký',
    '新': '  Người',
    '用': '  dùng',
    '户': '  mới',
    '返': '  Quay',
    '回': '  lại',
    '登': '  Đăng',

    // Xác thực form
    ' 用户名长度6~16位，以字母或数字组合！': 'Tên đăng nhập 6-16 ký tự, bao gồm chữ và số!',
    '请输入正确的密码长度，最少6位！': 'Mật khẩu tối thiểu 6 ký tự!',
    '请输入您的真实姓名!': 'Vui lòng nhập họ tên thật!',
    '请输入正确的支付密码长度，最少6位！': 'Mật khẩu thanh toán tối thiểu 6 ký tự!',
    '验证码错误！': 'Mã xác nhận sai!',
    '请输入验证码！': 'Vui lòng nhập mã xác nhận!',
    '两次密码不一致！': 'Hai mật khẩu không khớp!',
    '请输入您的账号和密码！': 'Vui lòng nhập tài khoản và mật khẩu!',

    // Tài khoản & Ví
    '中心钱包': 'Ví trung tâm',
    '我的钱包': 'Ví của tôi',
    '游戏钱包': 'Ví trò chơi',
    '平台钱包': 'Ví nền tảng',
    '钱包金额': 'Số dư ví',
    '总资产（元）': 'Tổng tài sản (đ)',
    '场馆内钱包不支持互转': 'Ví trong sảnh không hỗ trợ chuyển đổi',
    '同平台不支持互转': 'Cùng nền tảng không hỗ trợ chuyển đổi',
    '操作成功！': 'Thao tác thành công!',
    '自动免转': 'Tự động chuyển',
    '开启后余额自动转入游戏场馆': 'Sau khi bật, số dư tự động chuyển vào sảnh trò chơi',
    '请输入转账金额': 'Vui lòng nhập số tiền chuyển',
    '立即转账': 'Chuyển ngay',

    // Nạp tiền
    '存款': 'Nạp tiền',
    '立即充值': 'Nạp ngay',
    '立即存款': 'Nạp ngay',
    '存款金额': 'Số tiền nạp',
    '存款人姓名': 'Tên người nạp',
    '为及时到账，请务必输入正确的存款人姓名': 'Để nạp kịp thời, vui lòng nhập đúng tên người nạp',
    '开户行地址': 'Địa chỉ ngân hàng',
    '充值信息': 'Thông tin nạp tiền',
    '充值完成': 'Nạp tiền hoàn tất',
    '充值方式': 'Phương thức nạp',
    '成功付款后，将自动到账！': 'Sau khi thanh toán thành công, tiền sẽ tự động được ghi nhận!',
    '提交成功，等待后台审核': 'Gửi thành công, đang chờ xét duyệt',
    '存款遇到问题？联系 ': 'Gặp vấn đề khi nạp? Liên hệ ',
    '网银转账': 'Chuyển khoản ngân hàng',
    '微信': 'WeChat',
    '支付宝': 'Alipay',
    ' 收款账号 ': ' Số tài khoản nhận ',
    ' 复制 ': ' Sao chép ',
    ' 银行户名 ': ' Chủ tài khoản ',
    ' 开户行 ': ' Ngân hàng ',
    ' 银行地址 ': ' Địa chỉ ngân hàng ',
    '开户银行': 'Ngân hàng',
    '选择开户银行': 'Chọn ngân hàng',
    '选择银行卡': 'Chọn thẻ ngân hàng',

    // Rút tiền
    '取款': 'Rút tiền',
    '立即取款': 'Rút ngay',
    '取款金额': 'Số tiền rút',
    '请输入取款金额': 'Vui lòng nhập số tiền rút',
    '请输入取款金额 ': 'Vui lòng nhập số tiền rút ',
    '最大金额': 'Số tiền tối đa',
    '每笔手续费': 'Phí mỗi giao dịch',
    '实际到账：': 'Thực nhận:',
    '折合USDT': 'Quy đổi USDT',
    '银行卡取款': 'Rút tiền qua thẻ ngân hàng',
    'USDT取款': 'Rút tiền USDT',
    '选择USDT地址': 'Chọn địa chỉ USDT',
    '+添加USDT地址': '+ Thêm địa chỉ USDT',
    '+添加银行卡': '+ Thêm thẻ ngân hàng',
    '收起': 'Thu gọn',
    '展开': 'Mở rộng',
    '取款遇到问题？联系 ': 'Gặp vấn đề khi rút? Liên hệ ',
    '请输入您的支付密码': 'Vui lòng nhập mật khẩu thanh toán',
    '请选择您要提现到的银行卡': 'Vui lòng chọn thẻ ngân hàng để rút',
    '请选择USDT地址': 'Vui lòng chọn địa chỉ USDT',
    '单笔取款不能低于100元': 'Mỗi lần rút tối thiểu 100 đ',

    // Chuyển khoản
    '转账': 'Chuyển khoản',
    '转入': 'Nạp vào',
    '转出': 'Rút ra',
    '请输入操作金额！': 'Vui lòng nhập số tiền!',
    '转账遇到问题？联系 ': 'Gặp vấn đề khi chuyển? Liên hệ ',
    '选择钱包': 'Chọn ví',

    // Ngân hàng & USDT
    '银行卡': 'Thẻ ngân hàng',
    '添加银行卡': 'Thêm thẻ ngân hàng',
    '新增银行卡': 'Thêm thẻ ngân hàng mới',
    '持卡人姓名': 'Tên chủ thẻ',
    '请输入持卡人姓名': 'Vui lòng nhập tên chủ thẻ',
    '为了您的资金能够迅速到账，请确保填写的姓名与银行卡的开户姓名一致': 'Để tiền về nhanh, hãy đảm bảo tên trùng với tên mở tài khoản ngân hàng',
    '银行类型': 'Loại ngân hàng',
    '请选择银行类型': 'Vui lòng chọn loại ngân hàng',
    '银行卡号': 'Số thẻ ngân hàng',
    '请输入银行卡号': 'Vui lòng nhập số thẻ',
    '开户行': 'Ngân hàng mở tài khoản',
    '请输入开户行': 'Vui lòng nhập ngân hàng mở tài khoản',
    '请输入开户行地址': 'Vui lòng nhập địa chỉ ngân hàng',
    '请输入银行': 'Vui lòng nhập ngân hàng',
    '请输入姓名': 'Vui lòng nhập tên',
    '请输人银行卡号': 'Vui lòng nhập số thẻ ngân hàng',
    '请输人支付密码': 'Vui lòng nhập mật khẩu thanh toán',
    '请输人支付密码长度': 'Mật khẩu thanh toán không đủ độ dài',
    '请输人正确的卡号长度': 'Độ dài số thẻ không hợp lệ',
    '请选择钱包协议': 'Vui lòng chọn giao thức ví',
    '绑定成功': 'Liên kết thành công',
    '绑定协议地址': 'Liên kết địa chỉ giao thức',
    '交易所划转': 'Chuyển sàn giao dịch',
    '完成取款': 'Hoàn tất rút tiền',
    '虚拟币': 'Tiền điện tử',
    '添加USDT地址': 'Thêm địa chỉ USDT',
    '新增USDT地址': 'Thêm địa chỉ USDT mới',
    'USDT地址': 'Địa chỉ USDT',
    '请输入USDT地址': 'Vui lòng nhập địa chỉ USDT',
    '最多支持添加5个地址': 'Tối đa 5 địa chỉ',
    '最多支持添加5张银行卡': 'Tối đa 5 thẻ ngân hàng',
    'USDT价格稳定 流通性高 不受监管 ': 'USDT giá ổn định, thanh khoản cao, không bị kiểm soát ',
    '了解更多 >': 'Tìm hiểu thêm >',
    '确认添加': 'Xác nhận thêm',

    // Thông tin cá nhân
    '个人资料': 'Thông tin cá nhân',
    '个人头像': 'Ảnh đại diện',
    '请输入用户名': 'Vui lòng nhập tên đăng nhập',
    '请输入真实姓名': 'Vui lòng nhập tên thật',
    '出生日期': 'Ngày sinh',
    '请选择出入日期': 'Vui lòng chọn ngày',
    '手机号码': 'Số điện thoại',
    '绑定手机号，保障账号安全': 'Liên kết số điện thoại để bảo mật tài khoản',
    '电子邮箱': 'Email',
    '绑定邮箱保护账号安全': 'Liên kết email để bảo mật tài khoản',
    '确认修改': 'Xác nhận thay đổi',
    '完善账户信息，更安全': 'Hoàn thiện thông tin tài khoản để an toàn hơn',
    '完善个人资料': 'Hoàn thiện hồ sơ',
    '资料更完整，我们的服务更加周到': 'Hồ sơ đầy đủ hơn, dịch vụ tốt hơn',
    '去完善 ': 'Hoàn thiện ',

    // Quản lý tài khoản
    '卡片管理': 'Quản lý thẻ',
    '如需提现，请绑定银行卡或虚拟币地址': 'Để rút tiền, hãy liên kết thẻ ngân hàng hoặc địa chỉ ví',
    '登录密码管理': 'Quản lý mật khẩu đăng nhập',
    '定期修改登录密码，有利账户安全': 'Thường xuyên đổi mật khẩu để bảo mật tài khoản',
    '取款密码管理': 'Quản lý mật khẩu rút tiền',
    '温馨提示': 'Lưu ý quan trọng',
    '确定要解除绑定该卡片吗？': 'Bạn có chắc muốn hủy liên kết thẻ này không?',
    '解绑成功': 'Hủy liên kết thành công',
    '修改登录密码': 'Đổi mật khẩu đăng nhập',
    '设置提现密码': 'Đặt mật khẩu rút tiền',
    '原密码': 'Mật khẩu cũ',
    '请输入当前密码': 'Vui lòng nhập mật khẩu hiện tại',
    '新密码': 'Mật khẩu mới',
    '确认新密码': 'Xác nhận mật khẩu mới',
    '请再次输入密码': 'Vui lòng nhập lại mật khẩu',
    '请输入正确的旧密码长度': 'Độ dài mật khẩu cũ không hợp lệ',
    '请输入正确的新密码长度': 'Độ dài mật khẩu mới không hợp lệ',
    '新旧密码不能一致！': 'Mật khẩu mới không được giống cũ!',
    '密码修改成功！': 'Đổi mật khẩu thành công!',
    '请输入确认密码': 'Vui lòng nhập xác nhận mật khẩu',
    '请输入新密码': 'Vui lòng nhập mật khẩu mới',
    '请输入旧密码': 'Vui lòng nhập mật khẩu cũ',

    // Menu / Trung tâm thành viên
    '会员中心': 'Trung tâm thành viên',
    '消息中心': 'Trung tâm thông báo',
    '意见反馈': 'Phản hồi',
    '永久域名': 'Tên miền vĩnh cửu',
    '关于我们': 'Về chúng tôi',
    '安全退出': 'Đăng xuất',
    '退出系统': 'Thoát hệ thống',
    '帮助中心': 'Trung tâm hỗ trợ',
    '代理登录': 'Đăng nhập đại lý',
    '加入我们，共赢财富': 'Tham gia cùng chúng tôi, cùng thịnh vượng',
    '合营计划': 'Chương trình đại lý',
    '返水中心': 'Hoàn tiền',
    '活动记录': 'Lịch sử hoạt động',
    '福利中心': 'Phúc lợi',
    '交易记录': 'Lịch sử giao dịch',
    '投注记录': 'Lịch sử cược',
    '账户设置': 'Cài đặt tài khoản',
    '加入': 'Tham gia',
    '第': 'Hạng ',

    // VIP
    'VIP特权': 'Đặc quyền VIP',
    '豪礼赠送': 'Quà tặng hào phóng',
    'Hi，欢迎进入': 'Xin chào, chào mừng đến với',
    '专属VIP体验': 'Trải nghiệm VIP độc quyền',
    '立享会员特权': 'Tận hưởng đặc quyền thành viên ngay',
    '享受只属于你的与众不同': 'Tận hưởng sự khác biệt chỉ dành cho bạn',
    'VIP等级': 'Cấp độ VIP',
    'VIP返水': 'Hoàn tiền VIP',
    '真人(%)': 'Trực tiếp (%)',
    '体育(%)': 'Thể thao (%)',
    '电竞(%)': 'Thể thao điện tử (%)',
    '棋牌(%)': 'Cờ bài (%)',
    '电子(%)': 'Điện tử (%)',
    '彩票(%)': 'Xổ số (%)',
    '晋升标准': 'Tiêu chuẩn thăng hạng',
    '晋升顺序': 'Thứ tự thăng hạng',
    '保级要求': 'Yêu cầu giữ hạng',
    '降级标准': 'Tiêu chuẩn hạ hạng',
    '活动规则': 'Quy tắc hoạt động',

    // Danh mục trò chơi
    '真人': 'Trực tiếp',
    '体育': 'Thể thao',
    '电竞': 'Thể thao điện tử',
    '棋牌': 'Cờ bài',
    '电子': 'Điện tử',
    '彩票': 'Xổ số',
    'OB电子': 'OB Điện tử',
    'FG电子': 'FG Điện tử',
    'PP电子': 'PP Điện tử',
    'AE电子': 'AE Điện tử',

    // Trang chủ
    '真人娱乐，体育投注，电子游艺等尽在一手掌握': 'Trò chơi trực tiếp, cược thể thao, game điện tử - tất cả trong tầm tay',
    '立即下载': 'Tải ngay',
    '更多公告': 'Thêm thông báo',
    '欢迎来到': 'Chào mừng đến với',
    'app下载': 'Tải ứng dụng',
    '可扫描下发二维码进行app下载': 'Quét mã QR để tải ứng dụng',
    '需在同一网络环境下下载安装注册，请勿切换网络； 若无法正常安装，请使用手机自带浏览器打开本页面': 'Vui lòng tải, cài đặt và đăng ký trong cùng một mạng, không đổi mạng; Nếu không cài được, hãy dùng trình duyệt mặc định của điện thoại',

    // Khuyến mãi
    '优惠活动': 'Khuyến mãi',
    '全部': 'Tất cả',
    '没有更多了~': 'Không còn nữa~',
    '没有更多了': 'Không còn nữa',
    '活动详情': 'Chi tiết sự kiện',
    '活动说明': 'Giới thiệu sự kiện',
    '立即申请': 'Đăng ký ngay',
    '前往登录': 'Đến đăng nhập',
    '已达标': 'Đã đạt',
    '未达标': 'Chưa đạt',
    '累计存款': 'Tổng tiền nạp',
    '流水要求': 'Yêu cầu doanh thu',

    // Phong bì đỏ
    '红包已关闭': 'Phong bì đỏ đã đóng',
    '一键回收': 'Thu hồi một chạm',
    '活动时间': 'Thời gian sự kiện',
    '累计充值金额': 'Tổng số tiền nạp tích lũy',
    '红包次数': 'Số lần nhận phong bì',
    '抢红包': 'Nhận phong bì đỏ',
    '恭喜您': 'Xin chúc mừng bạn',
    '活动还没开始，请静待活动开始。': 'Sự kiện chưa bắt đầu, vui lòng chờ.',
    '请静待下次活动。': 'Vui lòng chờ sự kiện tiếp theo.',
    '您暂未达到领取条件，快去完成吧！': 'Bạn chưa đủ điều kiện nhận, hãy hoàn thành ngay!',
    '天': ' ngày',
    '时': ' giờ',
    '分': ' phút',
    '秒': ' giây',

    // Thông báo & Hệ thống
    '提示': 'Thông báo',
    '您确定要退出登录吗?': 'Bạn có chắc muốn đăng xuất không?',
    '复制成功！': 'Sao chép thành công!',
    '精彩内容等你来体验，快来登录吧！': 'Nội dung hấp dẫn đang chờ bạn, hãy đăng nhập ngay!',
    '已在当前页面！': 'Đã ở trang hiện tại!',
    '刷新成功': 'Làm mới thành công',
    '加载中...': 'Đang tải...',
    '服务器异常，请稍后再试': 'Máy chủ lỗi, vui lòng thử lại sau',
    '正在进入游戏,请稍后': 'Đang vào trò chơi, vui lòng chờ',
    '消息': 'Thông báo',
    '条款与规则': 'Điều khoản & Quy tắc',
    '隐私政策': 'Chính sách bảo mật',
    '操作成功': 'Thao tác thành công',
    '请输入正确的日期格式：YYYY-MM-DD': 'Vui lòng nhập đúng định dạng ngày: YYYY-MM-DD',
    '请输入正确邮箱号': 'Vui lòng nhập email hợp lệ',

    // Hỗ trợ / Trợ giúp
    '常见问题': 'Câu hỏi thường gặp',
    '免责说明': 'Tuyên bố miễn trách nhiệm',
    '联系我们': 'Liên hệ chúng tôi',
    '代理加盟': 'Đại lý liên kết',
    '博彩责任': 'Trách nhiệm cờ bạc',
    '没有找到解决办法？请联系': 'Không tìm thấy giải pháp? Hãy liên hệ',
    '人工客服': 'Tổng đài hỗ trợ',
    '解决': 'để giải quyết',
    'Hi,尊敬的会员用户': 'Xin chào quý hội viên',
    '早上好，欢迎来到帮助中心': 'Chào buổi sáng, chào mừng đến Trung tâm hỗ trợ',
    '若相关问题仍未解决，可咨询在线客服': 'Nếu vấn đề chưa được giải quyết, hãy liên hệ hỗ trợ trực tuyến',

    // Công bố & Hộp thư
    '公告': 'Thông báo',
    '没有更多了': 'Không còn nữa',
    '站内信': 'Hộp thư nội bộ',
    '全平台': 'Toàn nền tảng',
    '今日': 'Hôm nay',
    '近7日': '7 ngày gần đây',
    '近15日': '15 ngày gần đây',
    '近30日': '30 ngày gần đây',

    // Hoàn tiền
    '暂无领取额度！': 'Chưa có hạn mức nhận!',
    ' 返水记录 ': ' Lịch sử hoàn tiền ',
    '点击领取': 'Nhấn để nhận',
    '累计领取': 'Tổng đã nhận',
    '待领取': 'Chờ nhận',
    '返水金额 :': 'Số tiền hoàn :',
    '返水时间:': 'Thời gian hoàn:',
    '领取时间：': 'Thời gian nhận:',
    '暂未领取': 'Chưa nhận',
    '空空如也': 'Trống không',

    // Lịch sử
    '无效注单': 'Cược không hợp lệ',
    '已结算': 'Đã thanh toán',
    '未结算': 'Chưa thanh toán',
    '待审核': 'Đang xét duyệt',
    '通过': 'Thông qua',
    '拒绝': 'Từ chối',
    '未定义': 'Không xác định',
    '审核通过': 'Đã duyệt',
    '审核拒绝': 'Bị từ chối',
    '失败': 'Thất bại',
    '成功': 'Thành công',
    '待结算': 'Đang chờ thanh toán',
    '活动申请记录': 'Lịch sử đăng ký sự kiện',
    '活动标题：': 'Tên sự kiện:',
    '状态： ': 'Trạng thái: ',
    '资金明细': 'Chi tiết tài chính',

    // Phong bì đỏ - chi tiết
    ' 红包记录 ': ' Lịch sử phong bì đỏ ',
    '前往领取': 'Đến nhận',
    ' 剩余领取次数：': ' Số lần còn lại:',
    '已领取次数：': 'Số lần đã nhận:',

    // Hợp tác
    '联系方式': 'Thông tin liên hệ',
    '请输入您的联系方式': 'Vui lòng nhập thông tin liên hệ',
    '申请理由': 'Lý do đăng ký',
    '请输入申请说明': 'Vui lòng nhập lý do đăng ký',
    '加入我们': 'Tham gia cùng chúng tôi',
    '合营部': 'Bộ phận hợp tác',
    '立即咨询': 'Tư vấn ngay',
    '请输入申请理由': 'Vui lòng nhập lý do',
    '请输入正确手机号': 'Vui lòng nhập số điện thoại hợp lệ',

    // Giao thức
    '协议的区别': 'Sự khác biệt giữa các giao thức',
    '区别点': 'Điểm khác biệt',
    'TRC20协议': 'Giao thức TRC20',
    'ERC20协议': 'Giao thức ERC20',
    '地址样式': 'Định dạng địa chỉ',
    '使用网络': 'Mạng sử dụng',
    '网络状态': 'Trạng thái mạng',
    '转账速度': 'Tốc độ giao dịch',
    '手续费用': 'Phí giao dịch',
    '安全系数': 'Hệ số an toàn',
    '使用建议': 'Gợi ý sử dụng',
    '小额高频': 'Giao dịch nhỏ, thường xuyên',
    '交易推荐': 'Được khuyến nghị',
    '中等额度': 'Mức trung bình',
    '常规交易推荐': 'Giao dịch thông thường được khuyến nghị',
    '低手续费，秒级到账。': 'Phí thấp, xác nhận tức thì.',
    '基本不堵': 'Hầu như không tắc nghẽn',
    '经常拥堵': 'Thường xuyên tắc nghẽn',
    '极快': 'Rất nhanh',
    '普通': 'Bình thường',
    '低': 'Thấp',
    '高': 'Cao',
    '小额交易推荐': 'Gợi ý giao dịch nhỏ',
    '中等额度推荐': 'Gợi ý mức trung bình',

    // Đối tác tài trợ
    '尤文图斯': 'Juventus',
    '官方区域合作伙伴': 'Đối tác khu vực chính thức',
    '阿斯顿维拉': 'Aston Villa',
    '官方全球顶级合作伙伴': 'Đối tác hàng đầu toàn cầu chính thức',
};

// ============================================================
// HÀM DỊCH VĂN BẢN
// ============================================================
function translateText(text) {
    if (!text || !text.trim()) return text;
    var trimmed = text.trim();

    // Kiểm tra nếu toàn là ký tự Trung Quốc hoặc cụm từ cần dịch
    for (var zh in VI_TRANSLATIONS) {
        if (trimmed === zh || text === zh) {
            return text.replace(zh, VI_TRANSLATIONS[zh]);
        }
    }

    // Thay thế từng cụm từ trong văn bản dài
    var result = text;
    // Sắp xếp theo độ dài giảm dần để ưu tiên cụm từ dài hơn
    var keys = Object.keys(VI_TRANSLATIONS).sort(function(a, b) {
        return b.length - a.length;
    });
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (result.indexOf(key) !== -1) {
            result = result.split(key).join(VI_TRANSLATIONS[key]);
        }
    }
    return result;
}

// Kiểm tra chuỗi có chứa ký tự Tiếng Trung không
function hasChinese(str) {
    return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(str);
}

// Dịch một node văn bản
function translateNode(node) {
    if (node.nodeType === 3 && hasChinese(node.data)) {
        var translated = translateText(node.data);
        if (translated !== node.data) {
            node.data = translated;
        }
    }
}

// Dịch toàn bộ cây DOM
function translateDOM(root) {
    var walker = document.createTreeWalker(
        root || document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                var tag = node.parentNode && node.parentNode.tagName;
                if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );
    var node;
    while ((node = walker.nextNode())) {
        translateNode(node);
    }
}

// MutationObserver theo dõi thay đổi DOM và dịch tự động
function startTranslationObserver() {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        translateDOM(node);
                    } else if (node.nodeType === 3) {
                        translateNode(node);
                    }
                });
            } else if (mutation.type === 'characterData') {
                translateNode(mutation.target);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

// Khởi động dịch thuật
function initTranslation() {
    translateDOM(document.body);
    startTranslationObserver();
    // Dịch lại sau khi nội dung Vue.js render xong
    setTimeout(function() { translateDOM(document.body); }, 500);
    setTimeout(function() { translateDOM(document.body); }, 1500);
    setTimeout(function() { translateDOM(document.body); }, 3000);
}

// ============================================================
// KHỞI ĐỘNG
// ============================================================

// Đợi DOM tải xong
document.addEventListener('DOMContentLoaded', function() {
    console.log('Khởi động dịch Tiếng Trung → Tiếng Việt');
    initTranslation();
    // Bắt đầu kiểm tra nội dung phân loại
    waitForContent();
});

// 等待分类内容加载完成
function waitForContent() {
    console.log('等待分类内容加载...');
    const checkContent = () => {
        const containers = document.querySelectorAll('.rigts');
        if (containers.length > 0) {
            console.log('分类内容已加载，找到容器数量:', containers.length);
            // 内容已加载，添加热度标签
            addHotTagToRigtsImages();
            // 设置分类切换监听
            setupCategoryListeners();
        } else {
            console.log('分类内容未加载，继续等待...');
            // 继续等待
            setTimeout(checkContent, 100);
        }
    };
    checkContent();
}

// 设置分类切换监听
function setupCategoryListeners() {
    // 监听分类切换
    document.body.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('ls') || target.closest('.ls')) {
            console.log('分类被点击');
            // 等待分类切换动画完成
            setTimeout(() => {
                console.log('分类切换完成，更新热度标签');
                addHotTagToRigtsImages();
            }, 300);
        }
    });

    // 监听滚动和调整大小
    window.addEventListener('scroll', throttle(updateTagPositions, 100));
    window.addEventListener('resize', throttle(updateTagPositions, 100));
}

function addHotTagToRigtsImages() {
    console.log('开始添加热度标签');
    const containers = document.querySelectorAll('.rigts');
    console.log('找到容器数量:', containers.length);
    
    containers.forEach(function(container, containerIndex) {
        console.log(`处理第 ${containerIndex + 1} 个容器`);
        
        // 移除旧的标签
        const oldTags = container.querySelectorAll('.hot-tag');
        console.log(`移除 ${oldTags.length} 个旧标签`);
        oldTags.forEach(tag => tag.remove());

        // 添加新标签
        const imgs = container.querySelectorAll('img');
        console.log(`找到 ${imgs.length} 个图片元素`);
        
        imgs.forEach(function(img, imgIndex) {
            console.log(`处理第 ${imgIndex + 1} 个图片`);
            console.log('图片尺寸:', img.offsetWidth, 'x', img.offsetHeight);
            console.log('图片位置:', img.getBoundingClientRect());
            
            const rand = Math.floor(Math.random() * (1555 - 155 + 1)) + 155;
            const tag = document.createElement('div');
            tag.className = 'hot-tag';
            tag.innerHTML = `<span class="hot-num">${rand}</span><span class="hot-text">热度</span>`;
            
            // 设置标签样式
            const imgRect = img.getBoundingClientRect();
            const parentRect = container.getBoundingClientRect();
            const left = imgRect.left - parentRect.left + 30;
            const top = imgRect.top - parentRect.top + img.offsetHeight * 0.6;
            
            console.log('标签位置:', { left, top });
            
            Object.assign(tag.style, {
                position: 'absolute',
                left: left + 'px',
                top: top + 'px',
                transform: 'translateY(-50%)',
                background: 'none',
                color: '#303442',
                fontFamily: "'AkrobatBold', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
                fontWeight: 'bold',
                padding: '0',
                borderRadius: '0',
                zIndex: '2',
                pointerEvents: 'none',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'flex-end',
                gap: '2px'
            });
            
            container.appendChild(tag);
            console.log('标签已添加到容器');
        });
    });
}

function updateTagPositions() {
    const containers = document.querySelectorAll('.rigts');
    containers.forEach(function(container) {
        const imgs = container.querySelectorAll('img');
        const tags = container.querySelectorAll('.hot-tag');
        
        imgs.forEach(function(img, index) {
            if (tags[index]) {
                const imgRect = img.getBoundingClientRect();
                const parentRect = container.getBoundingClientRect();
                const left = imgRect.left - parentRect.left + 30;
                const top = imgRect.top - parentRect.top + img.offsetHeight * 0.6;
                
                tags[index].style.left = left + 'px';
                tags[index].style.top = top + 'px';
            }
        });
    });
}

/**
 * 工具函数：节流
 * @param {Function} func 要执行的函数
 * @param {number} limit 时间限制（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 导出工具函数
window.utils = {
    throttle
}; 
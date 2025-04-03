import '../App.css'

function Footer() {
    return <div className="text-center bg-white d-none d-md-block">
        <div className="container cus-p">
            <div className="row text-start border-bottom">
                <div className="col mt-4">
                    <h5>Hỗ trợ khách hàng</h5>
                    <p>Hotline: <span className='text-dark fw-medium'>1900-6035</span>
                    <br /> (1000 đ/phút, 8-21h kể cả T7, CN)</p>
                    <p>Các câu hỏi thường gặp</p>
                    <p>Gửi yêu cầu hỗ trợ</p>
                    <p>Hướng dẫn đặt hàng</p>
                    <p>Phương thức vận chuyển</p>
                    <p>Chính sách đổi trả</p>
                    <p>Hướng dẫn trả góp</p>
                    <p>Chính sách hàng nhập khẩu</p>
                    <p>Hỗ trợ khách hàng: hotro@tiki.vn</p>
                    <p>Báo lỗi bảo mật: security@tiki.vn</p>
                </div>
                <div className="col mt-4">
                    <h5>Về Tiki</h5>
                    <p>Giới thiệu Tiki</p>
                    <p>Tiki Blog</p>
                    <p>Tuyển dụng</p>
                    <p>Chính sách bảo mật thanh toán</p>
                    <p>Chính sách bảo mật thông tin cá nhân</p>
                    <p>Chính sách giải quyết khiếu nại</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Giới thiệu Tiki Xu</p>
                    <p>Gói hội viên VIP</p>
                    <p>Tiếp thị liên kết cùng Tiki</p>
                    <p>Bán hàng doanh nghiệp</p>
                    <p>Điều kiện vận chuyển</p>
                </div>
                <div className="col mt-4">
                    <h5>Hợp tác và liên kết</h5>
                    <p>Quy chế hoạt động sàn GDTMĐT</p>
                    <p>Bán hàng cùng Tiki</p>
                    <br />
                    <h5>Chứng nhận bởi</h5>
                    <div className='text-end pe-5 me-5 mt-3'>
                    <img src="https://webmedia.com.vn/images/2021/09/logo-da-dang-ky-bo-cong-thuong-mau-do.jpg" 
                        alt="" 
                        width={90}
                        />
                    </div>
                </div>
                <div className="col mt-4">
                    <h5>Phương thức thanh toán</h5>
                    <br />
                    <h5>Dịch vụ giao hàng</h5>
                </div>
                <div className="col mt-4">
                    <h5>Kết nối với chúng tôi</h5>
                    <div id='favicon'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" 
                            alt=""/>
                        <img src="https://cdn-icons-png.flaticon.com/512/2504/2504848.png" 
                            alt=""/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png" 
                            alt=""/>
                        </div>
                    <br />
                    <h5>Tải ứng dụng trên điện thoại</h5>
                </div>
            </div>
            <div className="row text-start mt-4 mb-5 border-bottom">
                <h5>Công ty TNHH TIKI</h5>
                <p>Địa chỉ trụ sở: Tòa nhà Viettel, Số 285, Đường Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh</p>
                <p>Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.</p>
                <p>Hotline: <span className='text-primary fw-medium'>1900 6035</span></p>
                <br/>
            </div>
        </div>
    </div>
}

export default Footer;
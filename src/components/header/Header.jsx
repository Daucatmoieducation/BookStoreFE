import Search from "./Search";
import Infor from "./Infor";
import Logo from "./Logo";
import React, { useState,useContext } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import Cart from "./Cart";
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';


function Header({ CartCount, onSearch }){
  const [NavOpen, setNavOpen] = useState(false);
  const { user, authenticated, logout } = useContext(UserContext);
  const [showAccountOptions, setShowAccountOptions] = useState(false);

  const handleLoginLogout = () => {
    if (authenticated) {
      logout(); // Đăng xuất
    } else {
      window.location.href = "/login"; 
    }
    setShowAccountOptions(false);
  };

  return (
    <div className="nav collapse-lg bg-white pt-2 pb-2">
      <div className="d-flex container align-items-center justify-content-between" id="header">
        <div className="col-md-1 d-none d-md-block">
          <Logo />
        </div>
        <div className="col-md-1 d-block d-md-none" >
          <Link to={"/"} style={{color:'black'}}>
            <i className="bi bi-chevron-compact-left"></i>
          </Link>
        </div>

        <Button
            onClick={() => setNavOpen(!NavOpen)}
            aria-expanded={open}
            className="border-0 d-block d-md-none bg-white">
          <i className="bi bi-list" style={{fontSize:"1rem", color:"black"}}></i>
        </Button>

        <div className="col-md-8">
          <Search onSearch={onSearch}/>
        </div>

        {/* Các nút điều hướng */}
        <div className="gap-0 pe-2 border-end d-none d-md-flex">
          <Link to="/" className="text-decoration-none" >
            <Infor icon="bi bi-house-door-fill" name="Trang chủ" color={{color:"#81818a"}}/>
          </Link>
          {/* Hiển thị menu tài khoản khi bấm */}
          <div className="position-relative">
            <button 
              className="border-0 bg-transparent text-dark d-flex align-items-center" 
              onClick={() => setShowAccountOptions(!showAccountOptions)}
            >
              <Infor icon="bi bi-emoji-wink" name="Tài khoản" color={{ color: "#81818a" }} />
            </button>

            <Collapse in={showAccountOptions}>
              <div className="position-absolute bg-white shadow-sm rounded p-2 mt-2" style={{ right: 0, minWidth: "150px", zIndex: 10 }}>
                {authenticated ? (
                  <>
                    <p className="mb-1">Xin chào, {user?.username}</p>
                    <button className="btn btn-danger btn-sm w-100" onClick={handleLoginLogout}>Đăng xuất</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-primary btn-sm w-100 mb-1">Đăng nhập</Link>
                    <Link to="/register" className="btn btn-secondary btn-sm w-100">Đăng ký</Link>
                  </>
                )}
              </div>
            </Collapse>
          </div>
        </div>

        <div> 
          <Cart CartCount={CartCount} />
        </div>
      </div>
      <Collapse in={NavOpen}>
        <div className="mt-2 container d-md-none w-100">
          <Link to="/" className="text-decoration-none" >
            <Infor icon="bi bi-house-door-fill" name="Trang chủ" color={{color:"#81818a"}}/>
          </Link>
          <Link to="#" className="text-decoration-none" >
            <Infor icon="bi bi-emoji-wink" name="Tài khoản" color={{color:"#81818a"}}/>
          </Link>
        </div>
      </Collapse>
    </div>
  )

}

export default Header

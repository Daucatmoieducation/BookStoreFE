function Logo(){
    return (
      <a href="/" 
          className="d-flex flex-column align-items-center text-decoration-none">
        <img
          src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
          alt="Tiki Logo"
          width={100}
          height={42}
        />
        <span className="c fw-medium" style={{color:'#1046a1'}}>Tốt & Nhanh</span>
      </a>
    )
}

export default Logo
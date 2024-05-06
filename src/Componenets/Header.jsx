import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('user');
 
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg bg-body">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarExample01"
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
                <li className="nav-item active">
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                    <span className="h4 fw-bold mb-0">  <a style={{ textDecoration: "none", color: "black" }} href='/home'>Home</a> </span>
                  </div>
                </li>
                <li className="nav-item ms-3">
                
                </li>
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3">
                <li className="nav-item me-2">
                  <h4  className="h4 fw-bold mb-0 me-3" >
                    {user ? user.f_userName : null}
                  </h4>
                </li>
                <li className="nav-item">
                {user ? <button className="btn" onClick={handleLogout}>Logout</button> : null}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;

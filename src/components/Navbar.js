import React, { useState , useEffect} from "react";
import logo from "../assets/images/paw-print-bold-svgrepo-com.svg";
import "../assets/css/bootstrap.min.css";
import "../assets/css/templatemo-tiya-golf-club.css";
import "../assets/css/NavbarWithSidebar.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig"; 

function NavbarWithSidebar({ scrollToSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      setIsSidebarOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 0); // when scrolled down even 1px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      {/* Navbar */}
      <div className={`sticky-wrapper ${isSticky ? "is-sticky" : ""}`}>

      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Logo / Brand */}
          <a className="navbar-brand d-flex align-items-center" href="https://github.com/aphyueh/paws-preferences">
            <img src={logo} className="navbar-brand-image img-fluid" alt="Paws & Preferences" />
            <span className="navbar-brand-text">
              Paws<small>Preferences</small>
            </span>
          </a>
          
          {/* Right-side container for Login + Hamburger */}
          <div className="d-flex align-items-center ms-auto">
            
            {/* Member Login */}
             <div class="d-lg-none ms-auto me-3">
                <button class="btn custom-btn custom-border-btn" data-bs-toggle="offcanvas" role="button" onClick={() => setIsSidebarOpen(true)}>Member Login</button>
            </div>
    
            {/* Hamburger toggle (mobile only) */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Menu links */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link click-scroll" onClick={() => scrollToSection("section_1")}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link click-scroll" onClick={() => scrollToSection("section_2")}>Start Purring</a>
              </li>
              <li className="nav-item">
                <a className="nav-link click-scroll" onClick={() => scrollToSection("section_3")}>Summary</a>
              </li>
              <li className="nav-item">
                <a className="nav-link click-scroll" onClick={() => scrollToSection("section_4")}>Sign Up</a>
              </li>
            </ul>
          </div>
          <div class="d-none d-lg-block ms-lg-3">
              <a class="btn custom-btn custom-border-btn" data-bs-toggle="offcanvas" role="button" onClick={() => setIsSidebarOpen(true)}>Member Login</a>
          </div>
        </div>
      </nav>
      {/* Sidebar */}
      <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
        <div className="custom-sidebar">
          <div className="sidebar-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Member Login</h5>
            <button className="btn-close" onClick={() => setIsSidebarOpen(false)}> &times;
            </button>
          </div>
          <div className="sidebar-body d-flex flex-column">
            <form className="custom-form member-login-form" onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="form-label mb-2" htmlFor="member-login-number">Email</label>
                <input
                  type="text"
                  name="member-login-email"
                  id="member-login-email"
                  className="form-control"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label mb-2" htmlFor="member-login-password">Password</label>
                <input
                  type="password"
                  name="member-login-password"
                  id="member-login-password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
              </div>

              <div className="mb-4">
                <button type="submit" className="form-control">Login</button>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">{error}</div>
              )}

              <div className="text-center mb-4">
                <a href="#">Forgotten password?</a>
              </div>
            </form>

            <div className="mt-auto mb-5">
              <p>
                <strong className="text-white me-3">Any Questions?</strong>
                <a href="https://github.com/aphyueh/paws-preferences/tree/gh-pages" className="xx-small">Check out Github page</a>
              </p>
            </div>
          </div>
        </div>
        <svg className="sidebar-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#C75D2C" fill-opacity="1" d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
      </div>
      </div>
    </>
  );
}

export default NavbarWithSidebar;

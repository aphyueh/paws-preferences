// SidebarLogin.js
import React from "react";
import "../assets/css/bootstrap-icons.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/templatemo-tiya-golf-club.css";

function SidebarLogin() {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
      data-bs-scroll="true"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Member Login
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body d-flex flex-column">
        <form className="custom-form member-login-form" action="#" method="post" role="form">
          <div className="member-login-form-body">
            <div className="mb-4">
              <label className="form-label mb-2" htmlFor="member-login-number">
                Membership No.
              </label>
              <input
                type="text"
                name="member-login-number"
                id="member-login-number"
                className="form-control"
                placeholder="11002560"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label mb-2" htmlFor="member-login-password">
                Password
              </label>
              <input
                type="password"
                name="member-login-password"
                id="member-login-password"
                className="form-control"
                placeholder="Password"
                pattern="[0-9a-zA-Z]{4,10}"
                required
              />
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>

            <div className="col-lg-5 col-md-7 col-8 mx-auto">
              <button type="submit" className="form-control">
                Login
              </button>
            </div>

            <div className="text-center my-4">
              <a href="#">Forgotten password?</a>
            </div>
          </div>
        </form>

        <div className="mt-auto mb-5">
          <p>
            <strong className="text-white me-3">Any Questions?</strong>
            <a href="tel: 010-020-0340" className="contact-link">
              010-020-0340
            </a>
          </p>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#3D405B"
          fillOpacity="1"
          d="M0,224L34.3,192C68.6,160,137,96,206,90.7C274.3,85,343,139,411,144C480,149,549,107,617,122.7C685.7,139,754,213,823,240C891.4,267,960,245,1029,224C1097.1,203,1166,181,1234,160C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

export default SidebarLogin;
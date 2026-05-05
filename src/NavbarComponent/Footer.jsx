
import { Link } from "react-router-dom";
 
const Footer = () => {
  return (
    <div style={{ backgroundColor: '#49111C' }} className="mt-auto py-4 text-white-50">
      <div className="container">
        <footer className="text-center text-lg-start">
          <div className="row justify-content-center">
            {/* Brand/Logo Section - Now col-lg-5 to balance the 12-column grid */}
            <div className="col-lg-5 col-md-6 mb-4 mb-md-0 text-center text-lg-start">
              <h5 className="text-uppercase text-white mb-3">Hammer-Time</h5>
              <p className="small">
                Your premier online auction platform. Bid, sell, and discover unique treasures from around the globe.
              </p>
              <div className="social-icons mt-3">
               
                <a href="#" className="text-white-50 me-3"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white-50 me-3"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white-50"><i className="bi bi-instagram"></i></a>
              </div>
            </div>
 
            {/* About Us Section */}
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0 text-center text-lg-start">
              <h5 className="text-uppercase text-white mb-3">About Us</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="/aboutus" className="text-white-50 text-decoration-none">Our Story</Link>
                </li>
                <li>
                  <Link to="#" className="text-white-50 text-decoration-none">How It Works</Link>
                </li>
                <li>
                  <Link to="#" className="text-white-50 text-decoration-none">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="#" className="text-white-50 text-decoration-none">Privacy Policy</Link>
                </li>
              </ul>
            </div>
 
            {/* Support/Contact Us Section */}
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0 text-center text-lg-start">
              <h5 className="text-uppercase text-white mb-3">Support</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="/contactus" className="text-white-50 text-decoration-none">Contact Us</Link>
                </li>
                <li>
                  <Link to="#" className="text-white-50 text-decoration-none">FAQ</Link>
                </li>
                <li>
                  <Link to="#" className="text-white-50 text-decoration-none">Help Center</Link>
                </li>
              </ul>
            </div>
 
            {/* Careers Section */}
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 text-center text-lg-start"> {/* Adjusted to col-lg-3 */}
              <h5 className="text-uppercase text-white mb-3">Careers</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="#" className="text-white-50 text-decoration-none">Join Our Team</Link>
                </li>
                <li>
                  <Link to="#" className="text-white-50 text-decoration-none">Current Openings</Link>
                </li>
              </ul>
            </div>
 
            {/* Quick Links Section has been removed */}
 
          </div>
 
          <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
 
          <section className="mb-4">
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3 text-white">Already a member?</span>
              <Link to="/user/login">
                <button
                  type="button"
                  className="btn btn-outline-light btn-rounded"
                >
                  Log In
                </button>
              </Link>
            </p>
          </section>
 
          <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
 
        </footer>
      </div>
 
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} className="text-center py-3 text-white-50">
        © {new Date().getFullYear()} Copyright: Hammer-Time. All rights reserved.
      </div>
    </div>
  );
};
 
export default Footer;
 
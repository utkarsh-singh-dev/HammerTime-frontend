const AboutUs = () => (
  <div className="container py-5"> {/* Use container for better responsiveness and py-5 for top/bottom padding */}
    <h2 className="text-center mb-5 display-4 fw-bold">About Us</h2> {/* Larger, centered heading */}
   
    <div className="row justify-content-center"> {/* Center the content column */}
      <div className="col-lg-8"> {/* Limit content width for readability */}
        <p className="lead text-center mb-5">
          Welcome to Hammer-Time, your premier online platform for thrilling auctions. We connect buyers and sellers, offering a dynamic and secure marketplace for unique items across India and the globe.
        </p>
 
        <div className="card shadow-sm mb-4"> {/* Card for "What We Offer" section */}
          <div className="card-body">
            <h4 className="card-title text-primary mb-3">What We Offer</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <h5 className="text-dark">For Buyers:</h5>
                <p>Discover a vast selection of items, enjoy competitive bidding, and benefit from transparent processes and secure transactions.</p>
              </div>
              <div className="col-md-6 mb-3">
                <h5 className="text-dark">For Sellers:</h5>
                <p>Reach a global audience, easily list your items, choose flexible auction formats, and receive dedicated support.</p>
              </div>
            </div>
          </div>
        </div>
 
        <div className="card shadow-sm mb-4"> {/* Card for "Our Mission" section */}
          <div className="card-body">
            <h4 className="card-title text-primary mb-3">Our Mission</h4>
            <p>We aim to make the auction experience accessible and exciting for everyone. Whether you're hunting for rare finds or selling items to a global audience, we strive to be your most trusted and user-friendly online auction hub.</p>
          </div>
        </div>
 
        <div className="card shadow-sm mb-4"> {/* Card for "Trust & Security" section */}
          <div className="card-body">
            <h4 className="card-title text-primary mb-3">Trust & Security</h4>
            <p>Built on a foundation of security and transparency, we employ robust measures to protect your data and ensure fair dealings. Our clear policies and community guidelines foster a trustworthy environment for all participants.</p>
          </div>
        </div>
 
        <div className="card shadow-sm mb-4"> {/* Card for "Join Our Community" section */}
          <div className="card-body text-center">
            <h4 className="card-title text-primary mb-3">Join Our Community</h4>
            <p>Founded to bring the classic auction experience online, Hammer-Time invites you to join our growing community. Experience the excitement, find incredible deals, and be part of the future of auctions.</p>
            <p className="fw-bold mt-4">Thank you for choosing Hammer-Time!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
 
export default AboutUs;
 
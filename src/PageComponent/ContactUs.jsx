import React from 'react';
 
const ContactUs = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 display-4 fw-bold">Contact Us</h2>
     
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <p className="lead text-center mb-5 text-secondary">
            We value your feedback, questions, and inquiries. Whether you need assistance with an auction, have a suggestion, or simply want to connect, our team is here to help.
          </p>
 
          <div className="card shadow-lg mb-4 border-0">
            <div className="card-body p-4">
              <h4 className="card-title text-primary mb-4 text-center">Send us a Message</h4>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input type="text" className="form-control" id="name" placeholder="John Doe" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" placeholder="name@example.com" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" className="form-control" id="subject" placeholder="Question about an auction" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea className="form-control" id="message" rows="5" placeholder="Type your message here..." required></textarea>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg mt-3">Send Message</button>
                </div>
              </form>
            </div>
          </div>
 
          <div className="text-center mt-5">
            <h4 className="text-primary mb-3">Other Ways to Connect</h4>
            <p className="fs-5">
              Email us directly at: <a href="mailto:support@hammertime.com" className="text-decoration-none">support@hammertime.com</a>
            </p>
            <p className="fs-5">
              Call us at: <a href="tel:+911234567890" className="text-decoration-none">+91 12345 67890</a> (Mon-Fri, 9 AM - 5 PM IST)
            </p>
            <p className="mt-4 fs-6 text-muted">
              Your satisfaction is our priority, and we look forward to hearing from you. We'll respond promptly to ensure your experience with us is nothing short of exceptional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ContactUs;
 
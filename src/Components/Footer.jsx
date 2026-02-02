import logo from "../living-rent-logo.png";
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrapper">
      <div className="content-wrapper footer-content">
        <a href="https://www.livingrent.org/">
          <img src={logo} alt="Living Rent Logo" className="footer-logo" />
        </a>
        <div className="footer-text">
          This complaints portal was created by <a href="https://www.livingrent.org/">Living Rent</a>, because the City of Edinburgh
          Council refuse to do it.
          <br />
          <br />
          Despite having a wealth of powers and even legal obligations to help
          tenants, our Council make it about as difficult as possible for tenants to
          ask for - nevermind receive - that help.
        </div>
      </div></div>
    </div>
  );
};

export default Footer;

const Footer = () => {
  return (
    <div className="box">
      <div className="footer1">
        <div className="overlap">
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="rectangle" />
              <img
                className="message"
                alt="Message"
                src="message.png"
              />
              <div className="email">www.chamacomputers.lk</div>
              <div className="connect">connect with us.....</div>
              <input type="text" className="mailfield" />
              <button className="subbutton" />
              <div className="subtxt">Submit</div>
              <div className="followtxt">FOLLOW US ON...</div>
            </div>
          </div>
          <img
            className="instagram"
            alt="Instagram"
            src="icons8-instagram-48.png"
          />
          <img
            className="linkedin"
            alt="Linkedin"
            src="icons8-linkedin-48.png"
          />
          <img className="youtube" alt="Youtube" src="icons8-youtube-48.png" />
          <img className="twitter" alt="Twitter" src="icons8-twitter-48.png" />
          <img
            className="facebook"
            alt="Facebook"
            src="icons8-facebook-48.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;

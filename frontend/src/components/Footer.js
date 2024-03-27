const Footer = () => {
  return (
    <div className="footer d-flex w-100">
      <div className="conatact">
        <img className="message img-fluid" alt="Message" src="message.png" />
        <div className="email">www.chamacomputers.lk</div>
        <div className="connect">connect with us.....</div>
        <div className="input-field">
          <input type="text" className="mail-field" />
          <button className="send-btn">Send</button>
        </div>
      </div>
      <div className="social col-3 d-flex flex-column">
        <h5 className="follow">FOLLOW US ON...</h5>
        <div className="icons">
          <a href="#">
            <img className="icon fb" src="facebook.png" alt="social" />
          </a>
          <a href="#">
            <img className="icon ws" src="whatsapp.png" alt="social" />
          </a>
          <a href="#">
            <img className="icon" src="insta.png" alt="social" />
          </a>
          <a href="#">
            <img className="icon" src="twitter.png" alt="social" />
          </a>
          <a href="#">
            <img className="icon" src="tiktok.png" alt="social" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

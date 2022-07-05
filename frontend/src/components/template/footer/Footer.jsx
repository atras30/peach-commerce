import React from "react";
import "../../../assets/css/footer.css";
import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer1">
        <img className="logofooter" src={require("../../../assets/img/logo.png")} alt="Peach Commerce Logo" />
        <Link to="/peach/about" className="about">
          ABOUT PEACH
        </Link>
      </div>

      <div className="footer2">
        <p className="follow">FOLLOW US:</p> <br />
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="sosmed">
          INSTAGRAM
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" className="sosmed">
          TWITTER
        </a>
        <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" className="sosmed">
          TIKTOK
        </a>
      </div>
      <div className="footer3">
        <p className="download">DOWNLOAD PEACH HERE:</p>
        <div className="footer4">
          <img className="barcode" src={require("../../../assets/img/barcode.png")} alt="Barcode" />
          <div className="footer5">
            <a href="https://play.google.com/store/games" target="_blank">PLAYSTORE</a>
            <a href="https://www.apple.com/app-store/" target="_blank">APPSTORE</a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "../assets/css/footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer1">
        <img className="logofooter" src="./assets/img/logo.png" alt="Peach Commerce Logo" />
        <a href="#" className="about">
          ABOUT PEACH
        </a>
      </div>

      <div className="footer2">
        <p className="follow">FOLLOW US:</p> <br />
        <a href="https://www.instagram.com/" target="_blank" className="sosmed">
          INSTAGRAM
        </a>
        <a href="https://www.twitter.com/" target="_blank" className="sosmed">
          TWITTER
        </a>
        <a href="https://www.tiktok.com/" target="_blank" className="sosmed">
          TIKTOK
        </a>
      </div>
      <div className="footer3">
        <p className="download">DOWNLOAD PEACH HERE:</p>
        <div className="footer4">
          <img className="barcode" src="./assets/img/barcode.png" alt="Barcode" />
          <div className="footer5">
            <a href="https://www.play.google.com/">PLAYSTORE</a>
            <a href="https://www.apple.com/app-store/">APPSTORE</a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function LandingPage() {
  return (
    <div className='landing-page'>
        <link rel="stylesheet" href='./assets/css/landingPage.css'/>

        <div className='header'>
            <div className='img-container'>
                <img className='logo' src='./assets/img/logo.png' alt="Peach Commerce Logo"/>
            </div>
            <div className='flexitem'>
                <div className='searchbar'>
                    <input className='search' type="text" placeholder='Search here . . .' />
                    <img className='logosearch' src='./assets/img/search-icon.png' alt="Search Icon"/>
                </div>
                <div className='faq'>
                    <img className='logofaq' src='./assets/img/faq.png' alt="Frequently Asked Questions"/>
                </div>
                <div className='loginbutton'>
                    <button className='login'>
                        <p className='loginn'>LOGIN</p>
                    </button>
                </div>
            </div>
        </div>

        <div className='category'>
            <p className='categories'>Category 1</p>
            <p className='categories'>Category 2</p>
            <p className='categories'>Category 3</p>
            <p className='categories'>Category 4</p>
            <p className='categories'>Category 5</p>
            <p className='categories'>Category 6</p>
            <p className='categories'>Category 7</p>
        </div>

        <div className='footer'>
            <div className='footer1'>
                <img className='logofooter' src='./assets/img/logo.png' alt="Peach Commerce Logo"/>
                <p className='about'>ABOUT PEACH</p>
            </div>
            <div className='footer2'>
                <p className='follow'>FOLLOW US:</p> <br/>
                <p className='sosmed'>INSTAGRAM</p>
                <p className='sosmed'>TWITTER</p>
                <p className='sosmed'>TIKTOK</p>
            </div>
            <div className='footer3'>
                <p className='download'>DOWNLOAD PEACH HERE:</p>
                <img className='barcode' src='./assets/img/barcode.png' alt="Barcode"/>
            </div>
            <div className='link'>
                <div className='downloadlink'>
                    <p>PLAYSTORE</p>
                    <p>APPSTORE</p>
                </div>
            </div>
        </div>
    </div>
  )
}

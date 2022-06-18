import React from 'react';

export default function LandingPage() {
  return (
    <div>
        <link rel="stylesheet" href='./assets/css/landingPage.css'/>

        <div className='header'>
            <div className='img-container'>
                <img className='logo' src='./assets/img/logo.png'/>
            </div>
            <div className='flexitem'>
                <div className='searchbar'>
                    <input className='search' type="text" placeholder='Search here . . .' />
                    <img className='logosearch' src='./assets/img/search-icon.png'/>
                </div>
                <div className='faq'>
                    <img className='logofaq' src='./assets/img/faq.png'/>
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
            <p className='categories'>Category 8</p>
            <p className='categories'>Category 9</p>
            <p className='categories'>Category 10</p>
            </div>
        </div>
  )
}

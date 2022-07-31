import React from 'react'
import Header from '../template/header/Header'
import Footer from '../template/footer/Footer'
import "../../assets/css/base_layout.css";

export default function BaseLayout({children, headerExclude}) {
  return (
    <div className='base-layout d-flex justify-content-between flex-column'>  
      <div>
        <Header exclude={headerExclude}/>
        {children}
      </div>

      <div>
        <Footer/>
      </div>
    </div>
  )
}

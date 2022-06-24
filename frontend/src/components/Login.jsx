import React, {useRef, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Product from './Product.jsx';

export default function Login() {
  const inputSearch = useRef(null);
    const [products,setProducts] = useState([]);

    useEffect(
        function () {
            Axios.get('http://127.0.0.1:8000/api/products')
            .then(function (response) {
                // handle success
                setProducts(response.data.products);
            })
            .catch(function (error) {
                // handle error
                console.log (error);
            });
            
        },[]
    )

    useEffect(
        function () {
            console.log(products);
        },[products]
    )

    function handleSearch() {
      let text = inputSearch.current.value;

      if(text == "") {
        Axios.get(`http://127.0.0.1:8000/api/products`)
          .then(function (response) {
              // handle success
              setProducts(response.data.products);
          })
          .catch(function (error) {
              // handle error
              console.log (error);
          });
      } else {
        Axios.get(`http://127.0.0.1:8000/api/products/search/${text}`)
          .then(function (response) {
              // handle success
              setProducts(response.data.products);
          })
          .catch(function (error) {
              // handle error
              console.log (error);
          });
      }
  }

  return (
    <div className='loginpage'>
    <link rel="stylesheet" href='./assets/css/landingPage.css'/>

    <div className='header'>
        <div className='img-container'>
            <Link to="/" className='img-logo-wrapper'>
                <img className='logo' src='./assets/img/logo.png' alt="Peach Commerce Logo"/>  
            </Link>
        </div>
        <div className='flexitem'>
            <div className='searchbar'>
                <input ref={inputSearch} className='search' type="text" placeholder='Search here . . .' />
                <img onClick={handleSearch} className='logosearch' src='./assets/img/search-icon.png' alt="Search Icon"/>
            </div>
            <div className='faq'>
                <Link to="/FAQ">
                    <img className='logofaq' src='./assets/img/faq.png' alt="Frequently Asked Questions"/>
                </Link>
            </div>
            </div>
            </div>
            </div>
  )
      //{/* <Link to="/" className='img-logo-wrapper'>
          //<img className='logo' src='./assets/img/logo.png' alt="Peach Commerce Logo"/>  
      //</Link> */}
}

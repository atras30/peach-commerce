import React, {useRef,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Product from './Product.jsx';

export default function LandingPage() {
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
    
    // Filter produk berdasarkan input user (search input)
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

    // Fetch data API Product
    function getAllProducts() {
        // Axios.get('http://127.0.0.1:8000/api/products')
        // .then(function (response) {
        //     // handle success
        //     return response.data.products;
        // })
        // .catch(function (error) {
        //     // handle error
        //     return error;
        // });
    }
    
  return (
    <div className='landing-page'>
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
                <div className='loginbutton'>
                    <Link to="/Login">
                        <button className='login'>
                            <p className='loginn'>LOGIN</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>

        <div className='category'>
            <p className='categories'>Pakaian</p>
            <p className='categories'>Makanan</p>
            <p className='categories'>Elektronik</p>
            <p className='categories'>Komputer & Aksesoris</p>
            <p className='categories'>Kesehatan</p>
            <p className='categories'>Perawatan</p>
        </div>

        <div className='productContainer'>
            {products.map(function(eachProduct){
                return <Product product={eachProduct}/>
            })}
        </div>
        
        <div className='footer'>
            <div className='footer1'>
                <img className='logofooter' src='./assets/img/logo.png' alt="Peach Commerce Logo"/>
                <a href="#" className='about'>ABOUT PEACH</a>
            </div>
        
            <div className='footer2'>
                <p className='follow'>FOLLOW US:</p> <br/>
                <a href="#" className='sosmed'>INSTAGRAM</a>
                <a href="#" className='sosmed'>TWITTER</a>
                <a href="#" className='sosmed'>TIKTOK</a>
            </div>
            <div className='footer3'>
                <p className='download'>DOWNLOAD PEACH HERE:</p>
                <div className='footer4'>
                    <img className='barcode' src='./assets/img/barcode.png' alt="Barcode"/>
                    <div className='footer5'>
                        <a href="#">PLAYSTORE</a>
                        <a href="#">APPSTORE</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

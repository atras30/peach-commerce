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
                <div>
                    <button className='loginbutton' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Login
                    </button>
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
                <a href="https://www.instagram.com/" target="_blank" className='sosmed'>INSTAGRAM</a>
                <a href="https://www.twitter.com/" target="_blank" className='sosmed'>TWITTER</a>
                <a href="https://www.tiktok.com/" target="_blank" className='sosmed'>TIKTOK</a>
            </div>
            <div className='footer3'>
                <p className='download'>DOWNLOAD PEACH HERE:</p>
                <div className='footer4'>
                    <img className='barcode' src='./assets/img/barcode.png' alt="Barcode"/>
                    <div className='footer5'>
                        <a href="https://www.play.google.com/">PLAYSTORE</a>
                        <a href="https://www.apple.com/app-store/">APPSTORE</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">LOGIN</h5>
                    </div>
                    <div class="modal-body">
                        <label for="username">Username:</label><br/>
                        <input type="text" class="input" id="username" name="username"/><br/><br/>
                        <label for="password">Password:</label><br/>
                        <input type="text" class="input" id="password" name="password"/>
                    </div>
                    <div class="modal-footer">
                        <div className='buttonfooter'>
                            <button type="button" class="login" data-bs-dismiss="modal">Login</button>
                            <button type="button" class="register" data-bs-dismiss="modal">Register</button>
                        </div>
                        <div className='mt-4'>
                            Or login using
                        </div>
                        <div className='mb-3'>
                            <img className='google' src='./assets/img/google.png'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

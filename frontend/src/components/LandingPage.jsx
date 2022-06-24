import React, {useRef,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import axios from 'axios';
import Product from './Product.jsx';
import "../assets/css/landingPage.css";
import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';

export default function LandingPage() {
    const inputSearch = useRef(null);
    const inputUsername = useRef(null);
    const inputPassword = useRef(null);
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState("");

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
    
    function handleLogin() {
        let username = inputUsername.current.value;
        let password = inputPassword.current.value;

        let data = {
          email: username,
          password: password
        }

        // Send a POST request
        axios.post('http://127.0.0.1:8000/api/auth/login', data)
        .then(response =>{
            if (response.data.message == "Login failed. Wrong email or password") {
                alert("Login gagal");
            }
            else {
                setToken(response.data.token);
            }
        });
    }

    function handleLogout() {
        axios.post("http://127.0.0.1:8000/api/auth/logout",{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response=>console.log(response));
    }

    useEffect(function(){
        if (token=='') {
            return;
        }
        axios.get("http://127.0.0.1:8000/api/auth/user",{
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response=>console.log(response));
    }, [token]);

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
                    <img className='logofaq' src='./assets/img/faq.png' alt="Frequently Asked Questions" data-bs-toggle="modal" data-bs-target="#faqModalScrollable"/>
                </div>
                <div>
                    {token == "" ? <LoginButton/> : <LogoutButton handleLogout={handleLogout}/>}
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
                return <Product key={eachProduct.id} product={eachProduct}/>
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

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">LOGIN</h5>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="username">Username / Email:</label><br/>
                        <input ref={inputUsername} type="text" className="input" id="username" name="username"/><br/><br/>
                        <label htmlFor="password">Password:</label><br/>
                        <input ref={inputPassword} type="password" className="input" id="password" name="password"/>
                    </div>
                    <div className="modal-footer">
                        <div className='buttonfooter'>
                            <button onClick={handleLogin} type="button" className="login" data-bs-dismiss="modal">Login</button>
                            <button type="button" className="register" data-bs-dismiss="modal">Register</button>
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

        <div class="modal fade" id="faqModalScrollable" tabindex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="faqModalScrollableTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="faqModalScrollableTitle">Peach's Frequently Asked Questions</h5>
                    </div>
                    <div class="modal-body modal-faq">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dolorum ratione neque, consectetur ducimus iste similique illum ea, in quisquam a quo enim ut provident dicta commodi eaque alias. Placeat quaerat laborum quis quos labore error deleniti nulla natus dolorem, animi eos esse accusantium possimus minima impedit minus. Eveniet numquam, ipsam dolor quod explicabo beatae? Dolore, ipsum natus voluptatum magni vero excepturi repudiandae. Odio nisi error dolorem deleniti quaerat nesciunt esse tenetur minus tempore qui placeat, ad expedita aliquid explicabo laborum ab molestiae quisquam, ullam voluptas. Iusto officiis facilis perferendis maxime debitis odit quo aliquam, sit beatae! Tempore at illo numquam, modi incidunt mollitia? Aspernatur explicabo tempora ad quam! Fugiat adipisci porro optio rerum ipsam illum ducimus vitae, cupiditate, consequatur provident architecto id consequuntur nulla, quisquam sint. Ducimus autem quos exercitationem iusto fugiat id quam consectetur, perferendis dolore aspernatur quis unde quas repellendus delectus deleniti eligendi molestias eveniet quo quisquam eos praesentium, similique minus sed! Similique fuga dignissimos, qui deserunt, molestiae quo eos veniam unde repellat corporis tenetur porro corrupti ratione temporibus non alias. Quod possimus dicta illo, ullam deleniti fuga unde vero at non labore veniam, tenetur cupiditate explicabo et architecto similique facere earum voluptas alias adipisci nam. Nisi corporis alias velit facilis esse saepe earum deserunt minima delectus! Voluptate deleniti ipsum voluptates earum eum dignissimos atque fugiat ipsam? Quis tempora distinctio libero deserunt quae itaque vel accusantium voluptatum ad voluptate, asperiores nemo similique unde sapiente doloribus quasi, voluptatibus non fugit ipsa. Error hic doloribus perferendis nostrum architecto? Molestiae ducimus, ipsa, doloremque quia aliquid aut deleniti culpa expedita enim incidunt commodi. Nisi tempora nam quam a dolorum tenetur facilis quisquam magni itaque atque corrupti consequuntur molestias est, mollitia sit soluta labore porro laudantium eos nemo doloremque sunt? Ad repudiandae velit obcaecati molestiae veritatis consequuntur? Accusantium dolor eius reiciendis pariatur unde voluptate laborum nulla sed, hic quas explicabo accusamus rerum perferendis nihil illo error repellat ut. Nesciunt laboriosam, vitae qui possimus magni hic. Officiis similique iste voluptatibus recusandae nostrum impedit tenetur, nisi nemo doloremque veritatis, accusamus expedita optio voluptatem ea dolor commodi assumenda magnam eius error a architecto. Dolor molestias vel iste, explicabo, praesentium eveniet ipsa corrupti temporibus iusto voluptatum rerum vitae ratione excepturi sapiente dolore aperiam dolorum at aliquid. Est fuga eius modi minus exercitationem minima eveniet quae reprehenderit sit. Impedit necessitatibus laborum perferendis! Vero sint doloremque, nesciunt ex nobis aliquam aut, quidem illum cumque aperiam necessitatibus unde et doloribus inventore fugit atque quod excepturi ab debitis! Consectetur quasi necessitatibus repudiandae molestiae consequuntur maxime velit animi quo, debitis iusto autem dolorem quaerat quibusdam non quidem dolore laboriosam iure optio aliquid corrupti laudantium. Non dicta earum veniam, quidem id inventore amet consectetur ut explicabo iste natus esse provident eaque perspiciatis magnam nam modi? Distinctio, reprehenderit voluptatum veniam, a sunt unde, molestias pariatur ratione cum deserunt ullam doloribus odio qui numquam illo! Eum quidem pariatur quod nulla quis repellat voluptatum repellendus exercitationem expedita cum beatae laboriosam eaque facere voluptas delectus deleniti, obcaecati id officia similique porro voluptates eius! Repudiandae, repellendus deleniti?
                        <div class="modal-footer">
                            <button type="button" class="button-close-faq" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

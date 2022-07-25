import React, {useEffect} from 'react'
import Header from "../template/header/Header";
import Footer from "../template/footer/Footer";
import ShoppingCartCard from "./ShoppingCartCard";
import "../../assets/css/shopping_cart.css";
import { useUserContext } from '../../provider/ContextProvider';
import Loading from "../template/Loading";

export default function ShopingCartPage() {
  const {authenticatedUser} = useUserContext();

  return (
    <div className='shopping-cart-container d-flex justify-content-between flex-column'>
      <div>
        <Header navbarBrand="shopping_cart" exclude={["form"]}/>
        <div className='mt-4'>
          {!authenticatedUser ? 
            <Loading description={"Fetching Shoppping Cart Data..."}/> :
            authenticatedUser?.shopping_carts.length === 0 ? 
              "Anda belum memasukkan produk apapun kedalam keranjang" : 
              authenticatedUser?.shopping_carts?.map(shoppingCart => <ShoppingCartCard key={shoppingCart.id} shoppingCart={shoppingCart}></ShoppingCartCard>)}
        </div>
      </div>

      <div>
        <Footer/>
      </div>
    </div>
  )
}

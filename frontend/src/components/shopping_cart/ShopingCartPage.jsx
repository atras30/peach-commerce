import React from 'react'
import ProfileHeader from '../profile/ProfileHeader';
import ShoppingCartCard from "./ShoppingCartCard";
import "../../assets/css/shopping_cart.css";

export default function ShopingCartPage() {
  return (
    <div className='shopping-cart-container'>
      <ProfileHeader></ProfileHeader>
      <ShoppingCartCard></ShoppingCartCard>
      <ShoppingCartCard></ShoppingCartCard>
      <ShoppingCartCard></ShoppingCartCard>
      <ShoppingCartCard></ShoppingCartCard>
      <ShoppingCartCard></ShoppingCartCard>
    </div>
  )
}

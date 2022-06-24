import React, {useEffect} from 'react';

export default function Product({product}) {
    useEffect(function() {
        console.log(product);
      },[]);

  return (
    <div className='product'>
        <img className='productimg' src={`assets/img/product/${product.img_link}`} alt='product image' />
        <div className='producttitle'>
            {product.title}
        </div>
        <div className='productprice'>
            {product.price}
        </div>
        <div className='productrating'>
            <div className='stars'>{product.rating}</div>
            <div className='totalsells'>{product.total_sales}</div>
        </div>
        <div className='productlocation'>
            <div className='lokasi'>{product.location}</div>
        </div>
        
        <button className='buttonbuy'>add to cart</button>
    </div>
  )
}

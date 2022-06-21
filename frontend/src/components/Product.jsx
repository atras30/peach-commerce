import React from 'react';

export default function Product({product}) {
  return (
    <div className='product'>
        <img className='productimg' src='' alt='product image'></img>
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
            <div className='lokasi'>INI LOKASI</div>
            <div className='buttonbuy'>
                <button>add to cart</button>
            </div>
        </div>
    </div>
  )
}

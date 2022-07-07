import React, {useRef} from "react";
import axios from "axios";
import { useEffect } from "react";
import "../../assets/css/add_product.css";

export default function AddProductPage() {
  const inputTitle = useRef(null);
  const inputDiscount = useRef(null);
  const inputPrice = useRef(null);
  const inputUserId = useRef(null);
  const inputStock = useRef(null);
  const inputLocation = useRef(null);
  const inputImageLink = useRef(null);

  function handleAddProduct() {
    // let title = inputTitle.current.value;
    // let discount = inputDiscount.current.value;
    // let price = inputPrice.current.value;
    // let userId = inputUserId.current.value;
    // let stock = inputStock.current.value;
    // let location = inputLocation.current.value;
    // let imageLink = inputImageLink.current.value;
  }

  useEffect(function() {
    // let data = {
    //   title: "Testing Product",
    //   discount: 40,
    //   price: 200000,
    //   user_id: 1,
    //   stock: 20,
    //   location: "Tangerang",
    //   img_link: "testing.jpg",
    // }

    // axios.post("http://127.0.0.1:8000/api/products", data)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    let loginData = {
      email: "atrasshalhan@gmail.com",
      password: "testing12345"
    }

    axios.post("http://127.0.0.1:8000/api/auth/login", loginData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  return (
    <div>
      <div className="container mt-4">
        <div className="form-container">
          <div className="mb-3">
            <label htmlFor="input-title" className="form-label">
              Product Title
            </label>
            <input ref={inputTitle} type="text" className="form-control" id="input-title" />
          </div>

          <div className="mb-3">
            <label htmlFor="input-discount" className="form-label">
              Product Discount
            </label>
            <input ref={inputDiscount} type="text" className="form-control" id="input-discount" />
          </div>

          <div className="mb-3">
            <label htmlFor="input-price" className="form-label">
              Product Price
            </label>
            <input ref={inputPrice} type="text" className="form-control" id="input-price" />
          </div>

          <div className="mb-3">
            <label htmlFor="input-user-id" className="form-label">
              User Id
            </label>
            <input ref={inputUserId} type="text" className="form-control" id="input-user-id" />
          </div>

          <div className="mb-3">
            <label htmlFor="input-stock" className="form-label">
              Product Stock
            </label>
            <input ref={inputStock} type="text" className="form-control" id="input-stock" />
          </div>

          <div className="mb-3">
            <label htmlFor="input-location" className="form-label">
              Location
            </label>
            <input ref={inputLocation} type="text" className="form-control" id="input-location" />
          </div>

          <div className="mb-3">
            <label htmlFor="input-image-link" className="form-label">
              image-link
            </label>
            <input ref={inputImageLink} type="text" className="form-control" id="input-image-link" />
          </div>
          <button onClick={handleAddProduct} type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createProduct } from "../services/api";
import "./AddProduct.css";


function AddProduct() {

  const [storeId, setStoreId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setSubmitting(true);
      setMessage("");
      setError("");


      const product = await createProduct({

        store_id: Number(storeId),

        category_id: Number(categoryId),

        name,

        price: Number(price),

        stock_qty: Number(stockQty)

      });


      console.log(product);


      setMessage("Product added successfully!");

      setStoreId("");
      setCategoryId("");
      setName("");
      setPrice("");
      setStockQty("");


    } catch(err) {

      console.error(err);

      setError("Failed to add product.");

    }

    finally {

      setSubmitting(false);

    }

  }



  return (

    <div className="product-page">

      <Navbar />


      <main className="product-container">


        <section className="product-header">

          <p className="product-label">
            KenaKata Administration
          </p>


          <h1>
            Add New Product
          </h1>


          <p>
            Add products available in your stores.
          </p>


        </section>



        <section className="product-card">


          <div className="product-card-header">

            <h2>
              Product Information
            </h2>

            <p>
              Fill in the details below to add a product.
            </p>

          </div>



          <form 
            className="product-form"
            onSubmit={handleSubmit}
          >



            <div className="product-form-group">

              <label>
                Store ID
              </label>

              <input

                type="number"

                value={storeId}

                onChange={(e)=>
                  setStoreId(e.target.value)
                }

                required

              />

            </div>




            <div className="product-form-group">

              <label>
                Category ID
              </label>

              <input

                type="number"

                value={categoryId}

                onChange={(e)=>
                  setCategoryId(e.target.value)
                }

                required

              />

            </div>





            <div className="product-form-group">

              <label>
                Product Name
              </label>


              <input

                type="text"

                placeholder="Example: iPhone 17"

                value={name}

                onChange={(e)=>
                  setName(e.target.value)
                }

                required

              />

            </div>





            <div className="product-form-group">

              <label>
                Price
              </label>


              <input

                type="number"

                placeholder="Example: 120000"

                value={price}

                onChange={(e)=>
                  setPrice(e.target.value)
                }

                required

              />

            </div>





            <div className="product-form-group">

              <label>
                Stock Quantity
              </label>


              <input

                type="number"

                placeholder="Example: 10"

                value={stockQty}

                onChange={(e)=>
                  setStockQty(e.target.value)
                }

                required

              />

            </div>





            <button

              className="product-submit-button"

              type="submit"

              disabled={submitting}

            >

              {

                submitting

                ?

                "Adding Product..."

                :

                "Add Product"

              }


            </button>



          </form>





          {
            message &&

            <div className="product-message success">

              {message}

            </div>
          }



          {
            error &&

            <div className="product-message error">

              {error}

            </div>
          }



        </section>



      </main>


      <Footer />


    </div>

  );

}


export default AddProduct;
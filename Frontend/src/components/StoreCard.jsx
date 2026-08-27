import { Link } from 'react-router-dom';
import BookingButton from './BookingButton';

import './StoreCard.css';


function StoreCard({ store }) {

  return (

    <Link
      to={`/products?store=${store.store_id}`}
      className="store-card"
    >


      <div className="store-card-image">

        <div className="store-placeholder">
          🏬
        </div>

      </div>



      <div className="store-card-content">


        <h3>
          {store.store_name}
        </h3>


        <p className="store-location">

          {store.address}

        </p>



        <div className="store-meta">

          <span className="store-category">

            Store

          </span>


        </div>



        <div className="store-card-footer">


          <span className="store-cta">

            View Products →

          </span>


          <BookingButton
            storeName={store.store_name}
          />


        </div>


      </div>


    </Link>

  );

}


export default StoreCard;
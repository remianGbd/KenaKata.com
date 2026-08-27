import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StoreCard from '../components/StoreCard';

import { getStores } from '../services/api';

import './Stores.css';


function Stores() {

  const [searchParams] = useSearchParams();

  const marketId = searchParams.get('market');


  const [stores, setStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadStores() {

      try {

        const data = await getStores(marketId);

        setStores(data);

      }

      catch(error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    }


    loadStores();

  }, [marketId]);



  const filteredStores = stores.filter(store => {


    const matchesSearch =
      store.store_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

      ||

      store.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase());


    return matchesSearch;

  });



  return (

    <div className="stores-page">

      <Navbar />


      <div className="stores-container">


        <div className="stores-header">

          <h1>
            {marketId
              ? "Stores in Selected Market"
              : "All Stores"
            }
          </h1>


          <p>
            Browse stores available in KenaKata marketplace
          </p>


          {marketId && (

            <Link
              to="/stores"
              className="clear-market"
            >
              View all stores
            </Link>

          )}

        </div>



        <div className="stores-filters">


          <input

            type="text"

            className="stores-search"

            placeholder="Search stores by name or location..."

            value={searchQuery}

            onChange={(e)=>setSearchQuery(e.target.value)}

          />


        </div>




        {loading && (

          <p>
            Loading stores...
          </p>

        )}



        {!loading && (

          <div className="stores-grid">


            {filteredStores.map(store => (


              <StoreCard

                key={store.store_id}

                store={store}

              />


            ))}


          </div>

        )}



        {!loading && filteredStores.length === 0 && (

          <div className="stores-empty">

            <h3>
              No stores found
            </h3>

            <p>
              Try a different search.
            </p>

          </div>

        )}



      </div>


      <Footer />


    </div>

  );

}


export default Stores;
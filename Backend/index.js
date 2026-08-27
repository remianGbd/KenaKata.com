const express = require("express");
const cors = require("cors");

const pool = require("./src/config/db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("KenaKata Backend is running!");
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connected successfully!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database connection failed!",
    });
  }
});


app.get("/api/users/:id", async(req,res)=>{

    try{

        const user_id = req.params.id;


        const result = await pool.query(
            `
            SELECT
                user_id,
                name,
                email,
                phone,
                role

            FROM users

            WHERE user_id=$1
            `,
            [
                user_id
            ]
        );


        if(result.rows.length === 0){

            return res.status(404).json({
                message:"User not found"
            });

        }


        res.json(result.rows[0]);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.patch("/api/users/:id", async(req,res)=>{

    try{

        const user_id = req.params.id;

        const { name, phone } = req.body;



        const result = await pool.query(
            `
            UPDATE users

            SET
                name=$1,
                phone=$2

            WHERE user_id=$3

            RETURNING
                user_id,
                name,
                email,
                phone,
                role

            `,
            [
                name, phone, user_id
            ]
        );


        if(result.rows.length === 0){

            return res.status(404).json({
                message:"User not found"
            });

        }


        res.json({

            message:"Profile updated successfully",

            user:result.rows[0]

        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});




app.post("/api/markets", async (req, res) => {
  try {
    const { market_name, location } = req.body;

    const result = await pool.query(
      `INSERT INTO markets (market_name, location)
       VALUES ($1, $2)
       RETURNING *`,
      [market_name, location]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create market"
    });
  }
});


app.get("/api/markets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM markets ORDER BY market_id");

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch markets"
    });
  }
});




app.get("api/products",async(req,res)=>{
  try{
    const result=await pool.query(
      `
      SELECT *
      FROM products
      ORDER BY product_id
      `
    );

    res.json(result.rows);

  
  }

  catch(error){
    console.error(error);

        res.status(500).json({
       message :"Failed to fetch products"
    });
  }
});





app.post("/api/customers", async(req,res)=>{

    const client = await pool.connect();

    try{

        const {
            name,
            email,
            phone,
            password_hash,
            delivery_address
        } = req.body;


        await client.query("BEGIN");


        const userResult = await client.query(
        `
        INSERT INTO users
        (
            name,
            email,
            phone,
            password_hash,
            role
        )

        VALUES($1,$2,$3,$4,'CUSTOMER')

        RETURNING user_id
        `,
        [
            name,
            email,
            phone,
            password_hash
        ]
        );


        const user_id = userResult.rows[0].user_id;



        const customerResult = await client.query(
        `
        INSERT INTO customers
        (
            user_id,
            delivery_address
        )

        VALUES($1,$2)

        RETURNING *
        `,
        [
            user_id,
            delivery_address
        ]
        );


        await client.query("COMMIT");


        res.status(201).json({
            message:"Customer created successfully",
            customer:customerResult.rows[0]
        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }


    finally{

        client.release();

    }

});



app.get("/api/customers/:id", async(req,res)=>{

    try{

        const user_id = req.params.id;


        const result = await pool.query(
            `
            SELECT

                u.user_id,
                u.name,
                u.email,
                u.phone,
                u.role,
                c.delivery_address
            FROM users u
           JOIN customers c
            ON u.user_id = c.user_id
          WHERE u.user_id=$1

            `,
            [ user_id ]
        );


        if(result.rows.length === 0){

            return res.status(404).json({
                message:"Customer not found"
            });

        }


        res.json(result.rows[0]);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.patch("/api/customers/:id", async(req,res)=>{

    try{

        const user_id = req.params.id;

        const { name,  phone, delivery_address } = req.body;

        // update users table

        await pool.query(
            `
            UPDATE users
            SET
                name=$1,
                phone=$2
            WHERE user_id=$3

            `,
            [name, phone, user_id ]
        );

        // Update customers table

        const result = await pool.query(
            `
            UPDATE customers

            SET
                delivery_address=$1
               WHERE user_id=$2
                RETURNING *

            `,
            [ delivery_address, user_id ]
        );



        if(result.rows.length===0){

            return res.status(404).json({
                message:"Customer not found"
            });

        }



        res.json({

            message:"Customer profile updated successfully",

            customer:result.rows[0]

        });


    }


    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.post("/api/vendors",async(req,res)=>{
    const client = await pool.connect();
   try{
         const {
            name,
            email,
            phone,
            password_hash,
            business_name
        } = req.body;

          await client.query("BEGIN");


     const userResult = await client.query(
            `
            INSERT INTO users
            (
                name,
                email,
                phone,
                password_hash,
                role
            )

            VALUES($1,$2,$3,$4,'VENDOR')

            RETURNING user_id
            `,
            [
                name,
                email,
                phone,
                password_hash
            ]
        );
          const user_id = userResult.rows[0].user_id;

        const vendorResult = await client.query(
            `
            INSERT INTO vendors
            (
                user_id,
                business_name
            )

            VALUES($1,$2)

            RETURNING *
            `,
            [
                user_id,
                business_name
            ]
        );
              await client.query("COMMIT");


        res.status(201).json({
            message:"Vendor created successfully",
            vendor: vendorResult.rows[0]
        });


   }
   catch(error){
        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

    finally{

        client.release();

    }
   

});



app.get("/api/vendors/:id", async(req,res)=>{

    try{

        const user_id = req.params.id;
        const result = await pool.query(
            `
            SELECT

                u.user_id,
                u.name,
                u.email,
                u.phone,
                u.role,
                v.business_name
            FROM users u
            JOIN vendors v
           ON u.user_id = v.user_id
            WHERE u.user_id=$1

            `,
            [ user_id ]
        );


        if(result.rows.length === 0){

            return res.status(404).json({
                message:"Vendor not found"
            });

        }


        res.json(result.rows[0]);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.patch("/api/vendors/:id", async(req,res)=>{

    try{

        const user_id=req.params.id;


        const { name, phone, business_name } = req.body;
        // update users table

        await pool.query(
            `
            UPDATE users

            SET
                name=$1,
                phone=$2
            WHERE user_id=$3
            `,
            [ name, phone, user_id ]
        );



        // update vendors table

        const result = await pool.query(
            `
            UPDATE vendors

            SET
               business_name=$1
           WHERE user_id=$2
           RETURNING *

            `,
            [ business_name, user_id ]
        );



        if(result.rows.length===0){

            return res.status(404).json({
                message:"Vendor not found"
            });

        }

        res.json({

            message:"Vendor profile updated successfully",

            vendor:result.rows[0]

        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.post("/api/stores", async(req,res)=>{

    try{

        const {
            vendor_id,
            market_id,
            store_name,
            address
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO stores
            (
                vendor_id,
                market_id,
                store_name,
                address
            )

            VALUES($1,$2,$3,$4)

            RETURNING *
            `,
            [
                vendor_id,
                market_id,
                store_name,
                address
            ]
        );


        res.status(201).json(result.rows[0]);


    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.get("/api/stores", async(req,res)=>{

    try{

        const { market_id } = req.query;


        const result = await pool.query(
            `
            SELECT *
            FROM stores
            WHERE market_id = $1
            ORDER BY store_id
            `,
            [market_id]
        );


        res.json(result.rows);


    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message:"Failed to fetch stores"
        });

    }

});


//single store by store id

app.get("/api/stores/:id", async(req,res)=>{

    try{

        const store_id = req.params.id;

        const result = await pool.query(
            `
            SELECT

                s.store_id,
                s.vendor_id,
                s.store_name,
                s.address,
                u.name AS vendor_name


            FROM stores s
            JOIN vendors v
            ON s.vendor_id = v.user_id
           JOIN users u
           ON v.user_id = u.user_id
           WHERE s.store_id=$1

            `,
            [store_id]
        );


        if(result.rows.length===0){

            return res.status(404).json({
                message:"Store not found"
            });

        }


        res.json(result.rows[0]);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.patch("/api/stores/:id", async(req,res)=>{

    try{

        const store_id=req.params.id;


        const {store_name, address } = req.body;

        const result = await pool.query(
            `
            UPDATE stores
            SET
                store_name=$1,
                address=$2
            WHERE store_id=$3
            RETURNING *

            `,
            [store_name,address,store_id]
        );



        if(result.rows.length===0){

            return res.status(404).json({
                message:"Store not found"
            });

        }



        res.json({

            message:"Store updated successfully",

            store:result.rows[0]

        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});



//fk constraint in deletion ----> store e product thakle delete hobe na store
app.delete("/api/stores/:id", async(req,res)=>{

    try{

        const store_id = req.params.id;

        // ei store e product ase?

        const products = await pool.query(
            `
            SELECT product_id
            FROM products
            WHERE store_id=$1
            `,
            [ store_id ]
        );


        if(products.rows.length > 0){

            return res.status(400).json({
                message:"Cannot delete store because products exist under this store"

            });

        }



        // Delete store

        const result = await pool.query(
            `
            DELETE FROM stores
            WHERE store_id=$1
            RETURNING *
            `,
            [  store_id ]
        );



        if(result.rows.length === 0){

            return res.status(404).json({

                message:"Store not found"

            });

        }



        res.json({

            message:"Store deleted successfully",

            store:result.rows[0]

        });


    }


    catch(error){

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }

});

app.post("/api/categories", async(req,res)=>{

    try{

        const { category_name } = req.body;


        const result = await pool.query(
            `
            INSERT INTO categories
            (
                category_name
            )

            VALUES($1)

            RETURNING *
            `,
            [
                category_name
            ]
        );


        res.status(201).json(result.rows[0]);


    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.get("/api/categories", async(req,res)=>{

    try{


        let result;
            result = await pool.query(
            `
            SELECT *
            FROM categories
            ORDER BY category_id
            `
            );

        


        res.json(result.rows);


    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.patch("/api/categories/:id", async(req,res)=>{

    try{

        const category_id = req.params.id;
        const {category_name} = req.body;



        const result = await pool.query(
            `
            UPDATE categories

            SET
                category_name=$1
            WHERE category_id=$2
            RETURNING *

            `,
            [
                category_name,category_id
            ]
        );



        if(result.rows.length === 0){

            return res.status(404).json({
                message:"Category not found"

            });

        }
        res.json({
        message:"Category updated successfully",

            category:result.rows[0]

        });


    }


    catch(error){

        console.error(error);

        if(error.code === "23505"){

            return res.status(400).json({
            message:"Category name already exists"

            });

        }


        res.status(500).json({
            message:error.message

        });

    }

});




//payment is set as null
//status is default pending;
app.post("/api/orders", async(req,res)=>{

    try{

        const {
            customer_id,
            total_amount
        } = req.body;


        const result = await pool.query(

        `
        INSERT INTO orders
        (
            customer_id,
            total_amount
        )

        VALUES($1,$2)

        RETURNING *
        `,

        [
            customer_id,
            total_amount
        ]

        );


        res.status(201).json(result.rows[0]);


    }

    catch(error){

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }

});

app.get("/api/orders", async(req,res)=>{

    try{

        const result = await pool.query(

        `
        SELECT *
        FROM orders
        ORDER BY order_id
        `

        );


        res.json(result.rows);

    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});



app.get("/api/orders/customer/:id", async(req,res)=>{

    try{

        const customer_id = req.params.id;
        const result = await pool.query(
            `
            SELECT
                o.order_id,
                o.total_amount,
                o.status,
                O.customer_id,
                o.payment_id
            FROM orders o
            WHERE o.customer_id=$1
            ORDER BY o.order_id DESC

            `,
            [
                customer_id
            ]
        );


        res.json(result.rows);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.get("/api/orders/:id", async(req,res)=>{

    try{

        const order_id=req.params.id;
        const order = await pool.query(
            `
            SELECT

                o.order_id,
                o.customer_id,
                o.payment_id,
                o.total_amount,
                o.status
            FROM orders o
            WHERE o.order_id=$1

            `,
            [ order_id ]
        );


        if(order.rows.length===0){

            return res.status(404).json({
                message:"Order not found"
            });

        }



        const items = await pool.query(
            `
            SELECT

                oi.order_item_id,
                oi.product_id,
                p.name,
                oi.quantity,
                oi.price_at_purchase

            FROM order_items oi
            JOIN products p
            ON oi.product_id=p.product_id
            WHERE oi.order_id=$1

            `,
            [ order_id]
        );



        res.json({

            order:order.rows[0],
            items:items.rows

        });



    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


//order status (deliverd ? shipped ?) update korte
app.patch("/api/orders/:id/status", async(req,res)=>{

    try{

        const order_id=req.params.id;

        const {  status  }=req.body;

        const result = await pool.query(
            `
            UPDATE orders
            SET status=$1
            WHERE order_id=$2
            RETURNING *
            `,
            [status,order_id]
        );



        if(result.rows.length===0){

            return res.status(404).json({
                message:"Order not found"
            });

        }



        res.json({

            message:"Order status updated successfully",

            order:result.rows[0]

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.post("/api/order-items", async(req,res)=>{

    try{

        const {
            order_id,
            product_id,
            quantity,
            price_at_purchase
        } = req.body;


        const result = await pool.query(

        `
        INSERT INTO order_items
        (
            order_id,
            product_id,
            quantity,
            price_at_purchase
        )

        VALUES($1,$2,$3,$4)

        RETURNING *
        `,

        [
            order_id,
            product_id,
            quantity,
            price_at_purchase
        ]

        );


        res.status(201).json(result.rows[0]);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.get("/api/order-items", async(req,res)=>{

    try{

        const result = await pool.query(

        `
        SELECT *
        FROM order_items
        ORDER BY order_item_id
        `

        );


        res.json(result.rows);

    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

//get products of order_items from order-id
app.get("/api/order-items/order/:id", async(req,res)=>{

    try{

        const order_id = req.params.id;

        const result = await pool.query(
            `
            SELECT

                oi.order_item_id,
                oi.order_id,
                oi.product_id,
                p.name AS product_name,
                oi.quantity,
                oi.price_at_purchase
            FROM order_items oi
            JOIN products p
            ON oi.product_id = p.product_id
            WHERE oi.order_id=$1
           ORDER BY oi.order_item_id ASC

            `,
            [ order_id ]
        );


        if(result.rows.length === 0){

            return res.status(404).json({
                message:"No items found for this order"
            });

        }


        res.json(result.rows);


    }


    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.post("/api/reservations", async(req,res)=>{

    try{

        const {
            customer_id,
            product_id,
            store_id,
            payment_id,
            deadline
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO reservations
            (
                customer_id,
                product_id,
                store_id,
                payment_id,
                deadline
            )

            VALUES($1,$2,$3,$4,$5)

            RETURNING *
            `,
            [
                customer_id,
                product_id,
                store_id,
                payment_id,
                deadline
            ]
        );


        res.status(201).json({
            message:"Reservation created successfully",
            reservation: result.rows[0]
        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.get("/api/reservations", async(req,res)=>{

    try{

        const result = await pool.query(
            `
            SELECT *
            FROM reservations
            ORDER BY reservation_id
            `
        );


        res.json(result.rows);

    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

//bujha lagbe
app.get("/api/reservations/customer/:id", async(req,res)=>{

    try{

        const customer_id = req.params.id;


        const result = await pool.query(
            `
            SELECT 
                r.*,
                p.name AS product_name,
                s.store_name

            FROM reservations r

            JOIN products p
            ON r.product_id = p.product_id

            JOIN stores s
            ON r.store_id = s.store_id

            WHERE r.customer_id=$1

            ORDER BY r.reservation_id DESC
            `,
            [customer_id]
        );


        res.json(result.rows);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});
 //single reservation
app.get("/api/reservations/:id", async(req,res)=>{

    try{

        const reservation_id = req.params.id;

        const result = await pool.query(
            `
            SELECT 
                r.*,
                p.name AS product_name,
                s.store_name

            FROM reservations r

            JOIN products p
            ON r.product_id = p.product_id

            JOIN stores s
            ON r.store_id = s.store_id

            WHERE r.reservation_id=$1
            `,
            [reservation_id]
        );


        if(result.rows.length === 0){
            return res.status(404).json({
                message:"Reservation not found"
            });
        }


        res.json(result.rows[0]);

    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});
//status update PATCH
app.patch("/api/reservations/:id/status", async(req,res)=>{

    try{

        const reservation_id = req.params.id;

        const {status} = req.body;


        const result = await pool.query(
            `
            UPDATE reservations

            SET status=$1

            WHERE reservation_id=$2

            RETURNING *
            `,
            [
                status,
                reservation_id
            ]
        );


        if(result.rows.length === 0){

            return res.status(404).json({
                message:"Reservation not found"
            });

        }


        res.json({
            message:"Reservation status updated",
            reservation: result.rows[0]
        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.post("/api/wishlist", async(req,res)=>{

    try{

        const {
            customer_id,
            product_id
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO wishlists
            (
                customer_id,
                product_id
            )

            VALUES($1,$2)

            RETURNING *
            `,
            [
                customer_id,
                product_id
            ]
        );


        res.status(201).json({
            message:"Wishlist added successfully",
            wishlist: result.rows[0]
        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.get("/api/wishlist/customer/:id", async(req,res)=>{

    try{

        const customer_id = req.params.id;


        const result = await pool.query(
            `
            SELECT 
                w.wishlist_id,
                w.customer_id,
                w.product_id,
                p.name,
                p.price,
                p.stock_qty

            FROM wishlists w

            JOIN products p
            ON w.product_id = p.product_id

            WHERE w.customer_id = $1

            ORDER BY w.wishlist_id DESC
            `,
            [
                customer_id
            ]
        );


        res.json(result.rows);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.delete("/api/wishlist/:id", async(req,res)=>{

    try{

        const wishlist_id = req.params.id;


        const result = await pool.query(
            `
            DELETE FROM wishlists

            WHERE wishlist_id=$1

            RETURNING *
            `,
            [
                wishlist_id
            ]
        );


        if(result.rows.length === 0){

            return res.status(404).json({
                message:"Wishlist item not found"
            });

        }


        res.json({
            message:"Removed from wishlist",
            deleted: result.rows[0]
        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.post("/api/payments", async(req,res)=>{

    try{

        const {  method,  amount, transaction_id, order_id } = req.body;


        const result = await pool.query(
            `
            INSERT INTO payments
            (
                method,
                amount,
                transaction_id
            )

            VALUES($1,$2,$3)

            RETURNING *
            `,
            [
                method,
                amount,
                transaction_id
            ]
        );

           const pay_id = result.rows[0].pay_id;

          //   Update order payment_id
        const order = await pool.query(
            `
            UPDATE orders
            SET payment_id=$1
            WHERE order_id=$2
            RETURNING *
            `,
            [ pay_id, order_id]
        );


      res.status(201).json({

 message:"Payment created and order updated successfully",

 payment: result.rows[0],

 order: order.rows[0]

});


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.get("/api/payments",async(req,res)=>{
  try{
    const result = await pool.query(
                  `
            SELECT *
            FROM payments
            ORDER BY pay_id DESC
            `

    );
     res.json(result.rows);
  }
  catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });
      }

});

app.get("/api/payments/customer/:id", async(req,res)=>{

    try{

        const customer_id=req.params.id;
        const result = await pool.query(
            `
            SELECT

                p.pay_id,
                p.method,
                p.amount,
                p.transaction_id,
                o.order_id,
                o.status


            FROM payments p
             JOIN orders o
            ON p.pay_id=o.payment_id
            WHERE o.customer_id=$1
           ORDER BY p.pay_id DESC

            `,
            [  customer_id ]
        );


        res.json(result.rows);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.get("/api/payments/:id", async(req,res)=>{

    try{

        const pay_id = req.params.id;

        const result = await pool.query(
            `
            SELECT *
            FROM payments
            WHERE pay_id=$1
            `,
            [
                pay_id
            ]
        );


        if(result.rows.length===0){

            return res.status(404).json({
                message:"Payment not found"
            });

        }


        res.json(result.rows[0]);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.delete("/api/payments/:id", async(req,res)=>{

    try{

        const pay_id=req.params.id;
        const result=await pool.query(
            `
            DELETE FROM payments
            WHERE pay_id=$1
            RETURNING *
            `,
            [
                pay_id
            ]
        );


        if(result.rows.length===0){

            return res.status(404).json({
                message:"Payment not found"
            });

        }


        res.json({
            message:"Payment deleted successfully",
            payment:result.rows[0]
        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.post("/api/reviews", async(req,res)=>{

    try{

        const {
            customer_id,
            product_id,
            order_item_id,
            rating,
            comment
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO reviews
            (
                customer_id,
                product_id,
                order_item_id,
                rating,
                comment
            )

            VALUES($1,$2,$3,$4,$5)

            RETURNING *
            `,
            [
                customer_id,
                product_id,
                order_item_id,
                rating,
                comment
            ]
        );


        res.status(201).json({

            message:"Review added successfully",

            review:result.rows[0]

        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

//product er shob review by product id-->

app.get("/api/reviews/product/:id", async(req,res)=>{

    try{

        const product_id=req.params.id;

        const result=await pool.query(
            `
            SELECT

                r.review_id,
                r.rating,
                r.comment,

                u.name AS customer_name,

                r.order_item_id


            FROM reviews r
            JOIN customers c
            ON r.customer_id=c.user_id
            JOIN users u
            ON c.user_id=u.user_id

            WHERE r.product_id=$1


            ORDER BY r.review_id DESC

            `,
            [
                product_id
            ]
        );


        res.json(result.rows);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

app.post("/api/products",async(req,res)=>{
  try{
    const{
      store_id,
      category_id,
      name,
      price,
      stock_qty
    }=req.body;

    const result =await pool.query(
                `
            INSERT INTO products
            (
         store_id,
          category_id,
          name,
           price,
                stock_qty
            )

            VALUES($1,$2,$3,$4,$5)

            RETURNING *
            `,
            [
              store_id,
        category_id,
           name,
            price,
          stock_qty
        ]
    );
      res.status(201).json(result.rows[0]);

  }
    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });
}
});

app.get("/api/products", async(req,res)=>{

    try{

        const { store_id } = req.query;


        let result;


        if(store_id){

            result = await pool.query(
            `
            SELECT *
            FROM products
            WHERE store_id = $1
            ORDER BY product_id
            `,
            [store_id]
            );

        }

        else{

            result = await pool.query(
            `
            SELECT *
            FROM products
            ORDER BY product_id
            `
            );

        }


        res.json(result.rows);


    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});



app.get("/api/products/:id", async(req,res)=>{

    try{

        const product_id = req.params.id;

        const result = await pool.query(
            `
            SELECT 
                p.*,
                c.category_name,
                s.store_name

            FROM products p
            JOIN categories c
            ON p.category_id = c.category_id
            JOIN stores s
            ON p.store_id = s.store_id

            WHERE p.product_id=$1
            `,
            [
                product_id
            ]
        );


        if(result.rows.length === 0){

            return res.status(404).json({
                message:"Product not found"
            });

        }


        res.json(result.rows[0]);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});


app.patch("/api/products/:id", async(req,res)=>{

    try{

        const product_id=req.params.id;

        const {
            name,
            
            price,
            stock_qty,
            category_id
        }=req.body;


        const result = await pool.query(
            `
            UPDATE products

            SET
                name=$1,
               
                price=$2,
                stock_qty=$3,
                category_id=$4
             WHERE product_id=$5
               RETURNING *
            `,
            [
                name,
             
                price,
                stock_qty,
                category_id,
                product_id
            ]
        );


        if(result.rows.length===0){

            return res.status(404).json({
                message:"Product not found"
            });

        }


        res.json({

            message:"Product updated successfully",

            product:result.rows[0]

        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});



app.delete("/api/products/:id", async(req,res)=>{

    try{

        const product_id=req.params.id;


        const result = await pool.query(
            `
            DELETE FROM products

            WHERE product_id=$1

            RETURNING *
            `,
            [
                product_id
            ]
        );


        if(result.rows.length===0){

            return res.status(404).json({
                message:"Product not found"
            });

        }


        res.json({

            message:"Product deleted successfully",

            product:result.rows[0]

        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

//kono certain customer er dewa review
app.get("/api/reviews/customer/:id", async(req,res)=>{

    try{

        const customer_id=req.params.id;
        const result=await pool.query(
            `
            SELECT
                r.*,
                p.name AS product_name

            FROM reviews r
            JOIN products p
            ON r.product_id=p.product_id
            WHERE r.customer_id=$1
            ORDER BY r.review_id DESC
            `,
            [
                customer_id
            ]
        );


        res.json(result.rows);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

//get by review id
app.get("/api/reviews/:id", async(req,res)=>{

    try{

        const review_id=req.params.id;
        const result=await pool.query(
            `
            SELECT *
            FROM reviews
            WHERE review_id=$1
            `,
            [
                review_id
            ]
        );


        if(result.rows.length===0){

            return res.status(404).json({
                message:"Review not found"
            });

        }


        res.json(result.rows[0]);


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

//updating a review by its id
app.patch("/api/reviews/:id", async(req,res)=>{

    try{

        const review_id=req.params.id;
        const { rating, comment  }=req.body;


        const result=await pool.query(
            `
            UPDATE reviews
            SET
            rating=$1,
            comment=$2
            WHERE review_id=$3

            RETURNING *
            `,
            [
                rating, comment, review_id
            ]
        );


        res.json({

            message:"Review updated",

            review:result.rows[0]

        });


    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});

//deleting a review by its id

app.delete("/api/reviews/:id", async(req,res)=>{

    try{

        const review_id=req.params.id;

        const result=await pool.query(
            `
            DELETE FROM reviews

            WHERE review_id=$1

            RETURNING *
            `,
            [
                review_id
            ]
        );


        res.json({

            message:"Review deleted",

            review:result.rows[0]

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({
            message:error.message
        });

    }

});




app.listen(PORT, () => {
  console.log(`KenaKata backend running on http://localhost:${PORT}`);
});
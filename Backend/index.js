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
      message:"Failed to fetch products"
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


app.listen(PORT, () => {
  console.log(`KenaKata backend running on http://localhost:${PORT}`);
});
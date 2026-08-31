const express = require("express");

const router = express.Router();

const pool = require("../config/db");

const verifyToken = require("../middleware/authMiddleware");

const checkRole = require("../middleware/roleMiddleware");


//everyone product dekhte parbe, tai ekhane authentication lagbe na
router.get("/", async (req, res) => {

  try {

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

  catch (error) {

    console.error(error);

    res.status(500).json({ message: error.message });

  }

});





//product create korbe only VENDOR
//tai check korlam user logged in kina and role VENDOR kina
router.post("/",

    verifyToken,

checkRole("VENDOR"),

 async (req, res) => {

  try {


    const { store_id, category_id, name, price, stock_qty } = req.body;


    const vendor_id = req.user.user_id; 
    //logged in vendor er id
    //jate ekjon vendor onno vendor er store e product add korte na pare


    //first check korbo ei store ta ei vendor er kina

    const storeCheck = await pool.query(

      `

      SELECT store_id

      FROM stores

      WHERE store_id=$1

      AND vendor_id=$2

      `,

      [

        store_id,

        vendor_id

      ]

    );


    if(storeCheck.rows.length===0){

      return res.status(403).json({

        message:"You cannot add product to this store"

      });

    }



    const result = await pool.query(

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

      [store_id, category_id, name, price, stock_qty]

    );


    res.status(201).json(result.rows[0]);


  } 

  catch (error) {

    console.error(error);

    res.status(500).json({ message: error.message });

  }

});





router.get("/:id", async (req, res) => {

  try {


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

      [product_id]

    );


    if (result.rows.length === 0) {

      return res.status(404).json({ message: "Product not found" });

    }


    res.json(result.rows[0]);


  } 

  catch (error) {

    console.error(error);

    res.status(500).json({ message: error.message });

  }

});





//product update korbe only VENDOR
//kintu sudhu nijer store er product update korte parbe
router.patch("/:id",

    verifyToken,

checkRole("VENDOR"),

 async (req, res) => {


  try {


    const product_id = req.params.id;


    const vendor_id = req.user.user_id;
    //logged in vendor er id


    const { name, price, stock_qty, category_id } = req.body;



    //check korbo ei product er store ei vendor er kina

    const ownership = await pool.query(

      `

      SELECT

          p.product_id

      FROM products p

      JOIN stores s

      ON p.store_id=s.store_id

      WHERE p.product_id=$1

      AND s.vendor_id=$2

      `,

      [

        product_id,

        vendor_id

      ]

    );



    if(ownership.rows.length===0){

      return res.status(403).json({

        message:"You cannot update this product"

      });

    }



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



    res.json({

      message:"Product updated successfully",

      product:result.rows[0]

    });



  }


  catch(error){

    console.error(error);

    res.status(500).json({message:error.message});

  }

});





//product delete korbe only VENDOR
//vendor sudhu nijer product delete korte parbe
router.delete("/:id",

    verifyToken,

checkRole("VENDOR"),

 async (req,res)=>{


  try{


    const product_id=req.params.id;


    const vendor_id=req.user.user_id;



    //check korbo product ta logged in vendor er kina

    const ownership = await pool.query(

      `

      SELECT

          p.product_id

      FROM products p

      JOIN stores s

      ON p.store_id=s.store_id

      WHERE p.product_id=$1

      AND s.vendor_id=$2

      `,

      [

        product_id,

        vendor_id

      ]

    );



    if(ownership.rows.length===0){

      return res.status(403).json({

        message:"You cannot delete this product"

      });

    }



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



module.exports = router;
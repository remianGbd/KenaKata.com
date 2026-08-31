const express = require("express");

const router = express.Router();

const pool = require("../config/db");

const verifyToken = require("../middleware/authMiddleware");

const checkRole = require("../middleware/roleMiddleware");


//wishlist e product add korbe only CUSTOMER

//tai authentication ar role check korlam

//customer_id body theke nibo na, token theke nibo
//tai req.user.user_id
//jate ekjon customer onno customer er wishlist e add korte na pare

router.post("/",

    verifyToken,

checkRole("CUSTOMER"),

 async (req, res) => {

  try {


    const { product_id } = req.body;


    const customer_id = req.user.user_id;
    //logged in customer er id
    //server nijer moto identify korbe, user fake id dite parbe na



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

      message: "Wishlist added successfully",

      wishlist: result.rows[0],

    });



  } 

  catch (error) {

    console.error(error);

    res.status(500).json({ message: error.message });

  }

});







//customer sudhu nijer wishlist dekhte parbe

//postman e customer_id change kore onno customer er wishlist dekha jabe na

//tai id parameter use korchi na, token theke customer identify korchi

router.get("/customer/:id",

    verifyToken,

checkRole("CUSTOMER"),

 async (req, res) => {


  try {


    const customer_id = req.user.user_id;
    //logged in customer er id



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

  catch (error) {

    console.error(error);

    res.status(500).json({ message: error.message });

  }

});






//wishlist item remove korbe only nijer wishlist theke

//onnno customer er wishlist item delete korte parbe na

router.delete("/:id",

    verifyToken,

checkRole("CUSTOMER"),

 async (req, res) => {


  try {


    const wishlist_id = req.params.id;


    const customer_id = req.user.user_id;
    //logged in customer er id



    //check korbo wishlist item ta ei customer er kina

    const result = await pool.query(

      `

      DELETE FROM wishlists

      WHERE wishlist_id=$1

      AND customer_id=$2

      RETURNING *

      `,

      [

        wishlist_id,

        customer_id

      ]

    );




    if(result.rows.length===0){

      return res.status(403).json({

        message:"You cannot delete this wishlist item"

      });

    }




    res.json({

      message:"Removed from wishlist",

      deleted:result.rows[0],

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
const express = require("express");

const router = express.Router();

const pool = require("../config/db");

const verifyToken = require("../middleware/authMiddleware");

const checkRole = require("../middleware/roleMiddleware");


//review add korbe only CUSTOMER

//customer_id body theke nibo na, token theke nibo

//jate ekjon customer onno customer hoye review dite na pare

router.post("/",

    verifyToken,

checkRole("CUSTOMER"),

 async (req, res) => {

  try {


    const { product_id, order_item_id, rating, comment } = req.body;


    const customer_id = req.user.user_id;
    //logged in customer er id
         if(rating<1 || rating>5){

       return res.status(400).json({

            message:"Rating must be between 1 and 5"

        });

              }


    //check korbo ei order item ei customer er kina

    const orderCheck = await pool.query(

      `

      SELECT oi.order_item_id

      FROM order_items oi

      JOIN orders o

      ON oi.order_id=o.order_id

      WHERE oi.order_item_id=$1

      AND o.customer_id=$2

      `,

      [

        order_item_id,

        customer_id

      ]

    );



    if(orderCheck.rows.length===0){

      return res.status(403).json({

        message:"You cannot review this product"

      });

    }





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







//product er review sobai dekhte parbe

//tai ekhane authentication lagbe na

router.get("/product/:id",

 async(req,res)=>{


  try{


    const product_id=req.params.id;


    const result = await pool.query(

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

//customer sudhu nijer review dekhbe

//postman e customer_id change kore onno customer er review dekha jabe na

router.get("/customer/:id",

    verifyToken,

checkRole("CUSTOMER"),

 async(req,res)=>{


  try{


    const customer_id=req.user.user_id;


    const result = await pool.query(

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




//specific review dekhar jonno

//check korbo review ta logged in customer er kina

router.get("/:id",

    verifyToken,

checkRole("CUSTOMER"),

 async(req,res)=>{


  try{


    const review_id=req.params.id;


    const customer_id=req.user.user_id;



    const result = await pool.query(

      `

      SELECT *

      FROM reviews

      WHERE review_id=$1

      AND customer_id=$2

      `,

      [

        review_id,

        customer_id

      ]

    );



    if(result.rows.length===0){

      return res.status(403).json({

        message:"You cannot access this review"

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






//review update korbe sudhu review er owner

router.patch("/:id",

    verifyToken,

checkRole("CUSTOMER"),

 async(req,res)=>{


  try{


    const review_id=req.params.id;


    const customer_id=req.user.user_id;


    const { rating, comment } = req.body;



    const result = await pool.query(

      `

      UPDATE reviews

      SET

      rating=$1,

      comment=$2

      WHERE review_id=$3

      AND customer_id=$4

      RETURNING *

      `,

      [

        rating,

        comment,

        review_id,

        customer_id

      ]

    );



    if(result.rows.length===0){

      return res.status(403).json({

        message:"You cannot update this review"

      });

    }



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






//review delete korbe sudhu review er owner

router.delete("/:id",

    verifyToken,

checkRole("CUSTOMER"),

 async(req,res)=>{


  try{


    const review_id=req.params.id;


    const customer_id=req.user.user_id;



    const result = await pool.query(

      `

      DELETE FROM reviews

      WHERE review_id=$1

      AND customer_id=$2

      RETURNING *

      `,

      [

        review_id,

        customer_id

      ]

    );



    if(result.rows.length===0){

      return res.status(403).json({

        message:"You cannot delete this review"

      });

    }



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



module.exports = router;
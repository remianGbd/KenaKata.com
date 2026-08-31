const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const verifyToken=require("../middleware/authMiddleware");
const checkRole=require("../middleware/roleMiddleware");


router.post("/", async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      name,
      email,
      phone,
      password_hash,
      business_name,
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

      [name, email, phone, password_hash]

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
      [user_id, business_name]

    );

    await client.query("COMMIT");

    res.status(201).json({
      message: "Vendor created successfully",
      vendor: vendorResult.rows[0],

    });
  } 
  catch (error) {
    console.error(error);

    res.status(500).json({ 
        message: error.message 
    });
  } 
  finally {
    client.release();
  }
});


//vendor nijer profile dekhte parbe

//onno vendor er business information access korte parbe na

router.get("/:id",
    verifyToken,
    checkRole("VENDOR"),
     async (req, res) => {
  try {
    const user_id = req.params.id;

    const logged_user_id=req.user.user_id;

    if(Number(user_id)!==logged_user_id){
        return res.status(403).json({
            message:"You cannot access another vendors profile"
        });
    }
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
      [user_id]

    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json(result.rows[0]);
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//vendor nijer business information update korte parbe

//onnoder vendor profile update block kora holo

router.patch("/:id", 
    verifyToken,
    checkRole("VENDOR"),
    async (req, res) => {
  try {
    const user_id = req.params.id;
    const logged_user_id=req.user.user_id;

   


    if(Number(user_id)!==logged_user_id){

      return res.status(403).json({

        message:"You cannot update another vendor's profile"

      });

    }
           const { name, phone, business_name } = req.body;

    await pool.query(
      `
      UPDATE users
      SET
          name=$1,
          phone=$2
      WHERE user_id=$3
      `,
      [name, phone, user_id]
    );
    const result = await pool.query(
      `
      UPDATE vendors
      SET
         business_name=$1
      WHERE user_id=$2
      RETURNING *
      `,
      [business_name, user_id]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({
      message: "Vendor profile updated successfully",
      vendor: result.rows[0],
    });
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");


//register a user

router.post("/register", async(req,res)=>{
    const client = await pool.connect();

    try{

        const {
            name,
            email,
            phone,
            password,
            role,
            delivery_address,
            business_name
        } = req.body;


        // validation

        if(!name || !email || !password || !role){

            return res.status(400).json({
                message:"Required fields missing"
            });

        }

        if(role!=="CUSTOMER"  && role!=="VENDOR"){
            return res.status(400).json({
                message : "INVALID ROLE"
            });
            }


           await client.query("BEGIN");

        // check existing user

        const existingUser = await client.query(
            `
            SELECT *
            FROM users
            WHERE email=$1
            `,
            [email]
        );


        if(existingUser.rows.length > 0){

            return res.status(409).json({
                message:"Email already exists"
            });

        }

        //now hashing pass

        const password_hash = await bcrypt.hash(password,10);


        //inserting user now

        const Userresult = await client.query(
            `
            INSERT INTO users
            (
                name,
                email,
                phone,
                password_hash,
                role
            )

            VALUES($1,$2,$3,$4,$5)

            RETURNING user_id,name,email,role

            `,
            [
                name,
                email,
                phone,
                password_hash,
                role
            ]
        );

        const user_id = Userresult.rows[0].user_id;

        if(role==="CUSTOMER"){


            await client.query(
                `
                INSERT INTO customers
                (
                user_id,
                delivery_address
                )
                VALUES ( $1,$2)
                
                `,
                [user_id , delivery_address]
            );
        }


        if(role === "VENDOR"){


            await client.query(
                `
                INSERT INTO vendors
                (
                    user_id,
                    business_name
                )

                VALUES($1,$2)

                `,
                [
                    user_id,
                    business_name
                ]
            );


        }

         await client.query("COMMIT");

          res.status(201).json({

            message:"Registration successful",

            user:Userresult.rows[0]

        });



    }

    catch(error){

        await client.query("ROLLBACK");

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }

    finally{
        client.release();
    }

});



//login


router.post("/login", async(req,res)=>{


    try{

        const {  email, password } = req.body;


        if(!email || !password){

            return res.status(400).json({

                message:"Email and password required"

            });

        }

        // find user

        const result = await pool.query(

            `
            SELECT *
            FROM users
            WHERE email=$1
            `,

            [email]

        );



        if(result.rows.length===0){

            return res.status(401).json({

                message:"Invalid credentials"

            });

        }



        const user = result.rows[0]; //result contains user , found by the sql query above

//compare entered pass
        const match = await bcrypt.compare(  password, user.password_hash  );


        if(!match){

            return res.status(401).json({

                message:"Invalid credentials"

            });

        }

        ///creation of token

        const token = jwt.sign(

            { user_id:user.user_id , role:user.role  },

            process.env.JWT_SECRET,

            { expiresIn:"1d" }

        );



        res.json({

            message:"Login successful",

            token,

            user:{
                user_id:user.user_id,
                name:user.name,
                role:user.role
            }

        });



    }


    catch(error){

        console.error(error);

        res.status(500).json({

            message:error.message

        });

    }


});

   router.post("/logout",
    verifyToken,
        (req,res)=>{

        res.json({
      message:"Logout successful"

      });

});

module.exports = router;
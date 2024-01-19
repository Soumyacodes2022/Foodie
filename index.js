 const express = require('express');
 const mongoose = require('mongoose');
 const verifyToken = require('./api/middleware/verifyToken')
 const jwt = require('jsonwebtoken')
 const cors = require('cors');
 const app = express();
 const port = process.env.PORT || 3000;
 require('dotenv').config();
 //middleware
 app.use(cors());
 app.use(express.json());
 //mongoDB connect using Mongoose
 //UserName: flash_7439
 //Password: L0fbidpX4kewX49H

 mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@foodi-cluster.3aqfpuy.mongodb.net/demo-foodi-client?retryWrites=true&w=majority`).then(console.log("Mongoose Connected Successfully.")).catch(error=>console.log(error));



 //jwt authentication
 app.post('/jwt',async(req,res)=>{
   const user = req.body;
   const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN,{
      expiresIn: '1hr'
   })
   res.send({token})
 })


 

 //receive routes here
 const menuRoutes = require('./api/router/menuRouter')
 const cartRoutes = require('./api/router/cartRouter')
 const userRoutes = require('./api/router/userRoutes')
 app.use('/menu', menuRoutes)
 app.use('/carts',cartRoutes )
 app.use('/users',userRoutes)




 app.get('/', verifyToken, (req,res)=>{
    res.send("Hello World!")
 })

 app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
 })
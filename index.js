 const express = require('express');
 const mongoose = require('mongoose');
 
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

 mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@foodi-cluster.3aqfpuy.mongodb.net/demo-foodi-client?retryWrites=true&w=majority`).then(console.log("Mongoose Connected Successfully.")).catch(error=>console.log(error.message));

 //receive routes here
 const menuRoutes = require('./api/router/menuRouter')
 const cartRoutes = require('./api/router/cartRouter')
 app.use('/menu', menuRoutes)
 app.use('/carts',cartRoutes )




 app.get('/', (req,res)=>{
    res.send("Hello World!")
 })

 app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
 })
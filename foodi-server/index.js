const express = require('express');
const cors = require ('cors');
const app = express();
const port = process.env.port || 3000;
require('dotenv').config()
//middleware
app.use(cors())
app.use(express.json())

//mongo atlas
//username: flash_34
//password: c9vM75WbkHejQkHS

//mongodb config file

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@food-cluster.ogyaqml.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // database and collections
    const menuCollections = client.db("foodi-db").collection("menus")
    const cartCollections = client.db("foodi-db").collection("cartItems")

    //get The Cart Items
    app.get('/menu', async(req,res)=>{
      const result = await menuCollections.find().toArray();
      res.send(result)
    })

    //post Cart Items To FrontEnd
    app.post('/carts', async(req,res)=>{
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send("Hello Developer!");
})

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})
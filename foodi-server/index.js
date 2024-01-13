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

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URI, {
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

    //get The menu Items
    app.get('/menu', async(req,res)=>{
      const result = await menuCollections.find().toArray();
      res.send(result)
    })

    //post Cart Items To db
    app.post('/carts', async(req,res)=>{
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result)
    })

    //get the cart items in frontend
    app.get('/carts', async(req,res)=>{
      const email = req.query.email;
      const filter = {email: email};
      const result = await cartCollections.find(filter).toArray();
      res.send(result);
    })
    //get specific carts
    app.get('/carts/:id', async(req,res)=>{
      const  id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await cartCollections.findOne(filter);
      res.send(result)
    })

    //delete items from the cart
    app.delete('/carts/:id', async(req,res)=>{
      const  id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await cartCollections.deleteOne(filter);
      res.send(result)
    })

    //Delete All items from the cart
    app.delete('/carts', async(req,res)=>{
      const result = await cartCollections.drop();
      res.send(result)
    })

    //Update items of cart
    app.put('/carts/:id', async(req,res)=>{
      try{
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId format' });
      }
      const {quantity} = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: parseInt(quantity, 10),
        },
      };
      console.log(filter)
      console.log(updateDoc)
      const result = await cartCollections.updateOne(filter,options,updateDoc);
      if(updateDoc){
        res.json(updateDoc.value);
      }
      else{
        res.status(404).json({error: "Document not found"});
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }

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
const express = require('express');
const app = express();
const port = process.env.port || 3000;

//middleware
app.use(cors())
app.use(express.json())

//mongo atlas
//username: flash_34
//password: c9vM75WbkHejQkHS

app.get('/', (req,res)=>{
    res.send("Hello Developer!");
})

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})
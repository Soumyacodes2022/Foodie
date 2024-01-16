const Carts = require("../model/carts")

//get carts using email
const getCartByEmail = async(req,res)=>{
    try {
    const email = req.query.email;
    const query = {email:email};
    const result = await Carts.find(query).exec();
    res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//post a cart item when add-to-cart btn is clicked
const postAddToCart = async(req,res)=>{
    const {menuItemId, name, recipe, image, price, quantity, email} = req.body;
    try {
        const existingcart = await Carts.findOne({menuItemId});
        if(existingcart){
           return res.status(400).json({message: "Item already added to the Cart.", failedData:"Failed to add this item again!"})
        }
        const cartItem = await Carts.create({
            menuItemId, name, recipe, image, price, quantity, email
        })
        res.status(201).json( {message:cartItem, createdData: "Data Added to the cart"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
module.exports = {
    getCartByEmail,
    postAddToCart
}
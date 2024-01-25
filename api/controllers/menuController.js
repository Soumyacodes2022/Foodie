const Menu = require('../model/Menu');

const getAllMenuItems = async(req,res)=>{
    try {
        const menus = await Menu.find({});
        res.status(200).json(menus)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}

const postNewMenuItem = async(req,res)=> {
    const newItem = req.body;
    try {

        const result = await Menu.create(newItem);
        res.status(200).json(result);
        
    } catch (error) {
    
        res.status(500).json({message: error.message})
        
    }
}
module.exports={
    getAllMenuItems,
    postNewMenuItem
}
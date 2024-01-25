const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController')
//get all menu items
router.get('/', menuController.getAllMenuItems)
router.post('/',menuController.postNewMenuItem)
module.exports = router

const express = require('express');


const router = express.Router(); 

//token
const verifyToken = require('../middleware/verifyToken');
const paymentController = require('../controllers/paymentController');
//post payment infomations to db
router.post('/', paymentController.paymentControl);

module.exports = router;
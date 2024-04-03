const express = require('express');
//token
const verifyToken = require('../middleware/verifyToken')
const paymentRequest = require('../controllers/PaymentsController');
const router = express.Router(); 
//post payment infomations to db
router.post('/',verifyToken, paymentRequest)
module.exports = router;
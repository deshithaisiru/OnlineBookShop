const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const {
  protect
} = require('../middleware/auth');
// All cart routes are protected
router.use(protect);
router.get('/', cartController.getCart);
router.post('/add-item', cartController.addItem);
router.put('/update-item', cartController.updateItem);
router.delete('/remove-item/:bookId', cartController.removeItem);
router.delete('/clear', cartController.clearCart);
module.exports = router;
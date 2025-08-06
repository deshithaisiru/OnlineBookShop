const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const {
  protect,
  authorize
} = require('../middleware/auth');
// Public routes
router.get('/', bookController.getAllBooks);
router.get('/featured', bookController.getFeaturedBooks);
router.get('/new-arrivals', bookController.getNewArrivals);
router.get('/:id', bookController.getBook);
// Admin only routes
router.post('/', protect, authorize('admin'), bookController.createBook);
router.put('/:id', protect, authorize('admin'), bookController.updateBook);
router.delete('/:id', protect, authorize('admin'), bookController.deleteBook);
module.exports = router;
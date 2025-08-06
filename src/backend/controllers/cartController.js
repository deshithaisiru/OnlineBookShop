const Cart = require('../models/Cart');
const Book = require('../models/Book');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// Get user cart
exports.getCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({
    user: req.user.id
  }).populate({
    path: 'items.book',
    select: 'title author price coverImage discount'
  });
  if (!cart) {
    // Create empty cart if none exists
    cart = await Cart.create({
      user: req.user.id,
      items: []
    });
  }
  res.status(200).json({
    success: true,
    data: cart
  });
});
// Add item to cart
exports.addItem = catchAsync(async (req, res, next) => {
  const {
    bookId,
    quantity = 1
  } = req.body;
  // Check if book exists
  const book = await Book.findById(bookId);
  if (!book) {
    return next(new AppError('Book not found', 404));
  }
  // Find user cart or create new one
  let cart = await Cart.findOne({
    user: req.user.id
  });
  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: []
    });
  }
  // Check if item already in cart
  const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
  if (itemIndex > -1) {
    // Update quantity if item exists
    cart.items[itemIndex].quantity += Number(quantity);
  } else {
    // Add new item
    cart.items.push({
      book: bookId,
      quantity: Number(quantity)
    });
  }
  // Save and populate cart
  await cart.save();
  cart = await Cart.findById(cart._id).populate({
    path: 'items.book',
    select: 'title author price coverImage discount'
  });
  res.status(200).json({
    success: true,
    data: cart
  });
});
// Update item quantity
exports.updateItem = catchAsync(async (req, res, next) => {
  const {
    bookId,
    quantity
  } = req.body;
  if (quantity < 1) {
    return next(new AppError('Quantity must be at least 1', 400));
  }
  // Find user cart
  let cart = await Cart.findOne({
    user: req.user.id
  });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }
  // Find item index
  const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
  if (itemIndex === -1) {
    return next(new AppError('Item not found in cart', 404));
  }
  // Update quantity
  cart.items[itemIndex].quantity = Number(quantity);
  // Save and populate cart
  await cart.save();
  cart = await Cart.findById(cart._id).populate({
    path: 'items.book',
    select: 'title author price coverImage discount'
  });
  res.status(200).json({
    success: true,
    data: cart
  });
});
// Remove item from cart
exports.removeItem = catchAsync(async (req, res, next) => {
  const {
    bookId
  } = req.params;
  // Find user cart
  let cart = await Cart.findOne({
    user: req.user.id
  });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }
  // Remove item
  cart.items = cart.items.filter(item => item.book.toString() !== bookId);
  // Save and populate cart
  await cart.save();
  cart = await Cart.findById(cart._id).populate({
    path: 'items.book',
    select: 'title author price coverImage discount'
  });
  res.status(200).json({
    success: true,
    data: cart
  });
});
// Clear cart
exports.clearCart = catchAsync(async (req, res, next) => {
  // Find user cart
  const cart = await Cart.findOne({
    user: req.user.id
  });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }
  // Clear items
  cart.items = [];
  await cart.save();
  res.status(200).json({
    success: true,
    data: cart
  });
});
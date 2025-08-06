const Book = require('../models/Book');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// Get all books with filters
exports.getAllBooks = catchAsync(async (req, res, next) => {
  const {
    category,
    featured,
    newArrival,
    minPrice,
    maxPrice,
    sort = '-createdAt'
  } = req.query;
  // Build filter object
  const filter = {};
  if (category) {
    filter.categoryName = category;
  }
  if (featured) {
    filter.featured = featured === 'true';
  }
  if (newArrival) {
    filter.newArrival = newArrival === 'true';
  }
  // Price range
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  // Execute query
  const books = await Book.find(filter).sort(sort).populate('category', 'name');
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});
// Get single book
exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id).populate('category', 'name');
  if (!book) {
    return next(new AppError('Book not found', 404));
  }
  res.status(200).json({
    success: true,
    data: book
  });
});
// Create new book (Admin only)
exports.createBook = catchAsync(async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(201).json({
    success: true,
    data: book
  });
});
// Update book (Admin only)
exports.updateBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!book) {
    return next(new AppError('Book not found', 404));
  }
  res.status(200).json({
    success: true,
    data: book
  });
});
// Delete book (Admin only)
exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return next(new AppError('Book not found', 404));
  }
  res.status(200).json({
    success: true,
    data: {}
  });
});
// Get featured books
exports.getFeaturedBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find({
    featured: true
  }).sort('-createdAt').limit(6);
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});
// Get new arrivals
exports.getNewArrivals = catchAsync(async (req, res, next) => {
  const books = await Book.find({
    newArrival: true
  }).sort('-createdAt').limit(8);
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});
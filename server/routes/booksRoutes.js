const asyncHandler = require('express-async-handler');
const authMiddleware = require('../middlewares/authMiddleware')
const Book = require('../models/Book');
const express = require('express')
const bookRouter = express.Router();

// Create Book
bookRouter.post('/', asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);

    if (book) {
        res.status(200).json(book)
    } else {
        res.status(500);

        throw new Error('Book could not be created')
    }
}))


// fetch Book
bookRouter.get('/', asyncHandler(async (req, res) => {
    const book = await Book.find({});

    if (book) {
        res.status(200).json(book)
    } else {
        res.status(500);

        throw new Error('there are no books found')
    }
}))

// update Book
bookRouter.put('/:id', authMiddleware, asyncHandler(async (req, res) => {
    const id = req.params.id;
    const book = await Book.findById(id)

    if (book) {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true,
                runValidators: true,
            });

        res.status(200).json(updatedBook);
    } else {
        res.status(500);
        throw new Error('update failed')
    }
}))
 
// delete Book
bookRouter.delete('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    // const book = await Book.findById(id)

    if (book) {
        await Book.findByIdAndDelete(id);

        res.status(200).json('Book successfully deleted');
    } else {
        res.status(500);
        throw new Error('invalid book')
    }
}))
module.exports = bookRouter;
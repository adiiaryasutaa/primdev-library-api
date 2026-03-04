import prisma from '../database/config.database.js';

export const getAllBooks = async (req, res) => {
  // /api/books?category=1
  const { category: categoryId } = req.params;
  let where = {};

  try {
    if (categoryId) {
      const category = await prisma.categories.findUnique({
        where: { id: parseInt(categoryId) },
      });

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      where.categoryId = parseInt(categoryId);
    }

    const books = await prisma.books.findMany(where);

    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching books', error: error.message });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await prisma.books.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching book', error: error.message });
  }
};

export const createBook = async (req, res) => {
  const bookData = {};
  Object.assign(bookData, req.body);

  try {
    const book = await prisma.books.create({
      data: bookData,
    });

    res.status(201).json({ message: 'Book added', book });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating book', error: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;

  // Check is book exists before attempting update
  const book = await prisma.books.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  Object.assign(book, req.body);

  try {
    const updatedBook = await prisma.books.update({
      where: {
        id: parseInt(id),
      },
      data: book,
    });

    if (!updatedBook) {
      return res.status(500).json({ message: 'Error updating book' });
    }

    res.json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating book', error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  // check if book exists before attempting delete
  const book = await prisma.books.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  try {
    const { error } = await prisma.books.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (error) {
      return res.status(500).json({ message: 'Error deleting book', error });
    }

    res.json({ message: `Book with ID: ${id} deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting book', error: error.message });
  }
};

import Books from "../models/books";
import Genres from "../models/genres";
import Borrowings from "../models/borrowings";

export const createBook = async(req, res) => {
    try {
        const { Title, Author, PublishedYear, Copies, Genre } = req.body;
        
        const genreFound = await Genres.find({ name: { $in: Genre } });
        
        const newBook = new Books({
            Title,
            Author,
            PublishedYear,
            Copies,
            Genre: genreFound.map((genre) => genre._id),
        });
  
        const bookSaved = await newBook.save();
  
      res.status(201).json(bookSaved);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
}

export const getBooks = async(req, res) => {
  const books = await Books.find();
  return res.json(books);
}

export const getBookById = async(req, res) => {
  const { bookId } = req.params;
    
  const book = await Books.findById(bookId);
  res.status(200).json(book);  
}

export const updateBookById = async(req, res) => {
    
  try {
    const updatedBook = await Books.findByIdAndUpdate(
        req.params.bookId,
        req.body,
        {
          new: true,
        }
    );
    res.status(200).json(updatedBook);
        
  } catch (error) {          
    console.log(error);
    return res.status(500).json(error);
  }
}

export const updateBookBorrowedById = async(req, res) => {
  try {
    const { bookId } = req.params;
    const { userId } = req.body;
        
    const newBorrowing = new Borrowings({
      bookId,
      userId
    });
    await newBorrowing.save();
    
    const book = await Books.findById(bookId);
    let copies = book.Copies - 1; 
    const updatedBook = await Books.findByIdAndUpdate(
        bookId,
        {"Copies": copies},
        {
          new: true,
        }
    );
    res.status(200).json(updatedBook);
        
  } catch (error) {          
    console.log(error);
    return res.status(500).json(error);
  }
}

export const updateBookReturnedById = async(req, res) => {
  try {
    const { bookId } = req.params;
    const { borrowingId } = req.body;
    
    await Books.findByIdAndUpdate(
      borrowingId,
      {"dueDate": Date.now}
    );

    const book = await Books.findById(bookId);
    let copies = book.Copies + 1; 
    const updatedBook = await Books.findByIdAndUpdate(
        bookId,
        {"Copies": copies},
        {
          new: true,
        }
    );

    res.status(200).json(updatedBook);
        
  } catch (error) {          
    console.log(error);
    return res.status(500).json(error);
  }
}

export const deleteBookById = async(req, res) => {
  try {
    const { bookId } = req.params;
    await Books.findByIdAndDelete(bookId);
    res.status(204).json();
  } catch (error) {
      console.log(error);
      return res.status(500).json(error);
  }
}
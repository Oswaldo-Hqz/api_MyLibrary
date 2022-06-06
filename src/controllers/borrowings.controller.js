import Borrowings from "../models/borrowings";

export const createBorrowing = async(req, res) => {
    try {
        const { BookId, userId } = req.body;
        
        const newBorrowing = new Borrowings({
            bookId,
            userId
        });
  
        const borrowingSaved = await newBorrowing.save();
  
        res.status(201).json(borrowingSaved);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const getBorrowings = async(req, res) => {
  const borrowings = await Borrowings.find();
  return res.json(borrowings);
}

export const getBorrowingById = async(req, res) => {
  const { borrowingId } = req.params;
    
  const borrowing = await Borrowings.findById(borrowingId);
  res.status(200).json(borrowing);  
}

export const updateBorrowingById = async(req, res) => {
    
  try {
    const updatedBorrowing = await Borrowings.findByIdAndUpdate(
        req.params.borrowingId,
        req.body,
        {
          new: true,
        }
    );
    res.status(200).json(updatedBorrowing);
        
  } catch (error) {          
    console.log(error);
    return res.status(500).json(error);
  }
}

export const deleteBorrowingById = async(req, res) => {
  try {
    const { borrowingId } = req.params;
    await Borrowings.findByIdAndDelete(borrowingId);
    res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
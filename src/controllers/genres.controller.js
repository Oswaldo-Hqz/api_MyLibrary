import Genres  from "../models/genres";

export const createGenre = async(req, res) => {
    try {
        const { name } = req.body;

        const newGenre = new Genres({
            name
        });  
        const genreSaved = await newGenre.save();  
        res.status(201).json(genreSaved);

    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
}

export const getGenres = async(req, res) => {
    const genres = await Genres.find();
    return res.json(genres);
}

export const getGenreById = async(req, res) => {
    const { genreId } = req.params;
    
    const genre = await Genres.findById(genreId);
    res.status(200).json(genre);    
}

export const updateGenreById = async(req, res) => {
    
    try {
        const updatedGenre = await Genres.findByIdAndUpdate(
            req.params.genreId,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).json(updatedGenre);
          
    } catch (error) {          
    console.log(error);
    return res.status(500).json(error);
    }
}

export const deleteGenreById = async(req, res) => {
    try {
        const { genreId } = req.params;
        await Genres.findByIdAndDelete(genreId);
        res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
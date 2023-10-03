import mongoose from "mongoose";

const SavedSchema = mongoose.Schema({
	userId: { type: String, required: true }, // User ID
	movies: [{ type: Number }], // Array of numbers for movies
	tvShows: [{ type: Number }], // Array of numbers for TV shows
});

const SavedModel = mongoose.model("saved", SavedSchema);

export default SavedModel;

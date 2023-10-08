import express from "express";
import SavedModel from "../models/Saved.js";

const router = express.Router();

router.post("/save", async (req, res) => {
	const { userId, content_type, id } = req.body;

	try {
		const user = await SavedModel.findOneAndUpdate(
			{ userId: userId },
			{ $set: { id, content_type } },
			{ upsert: true, new: true }
		);

		if (content_type === "movie" || content_type === "tv") {
			if (typeof id === "number" && !isNaN(id)) {
				if (content_type === "movie") {
					user.movies.push(id);
				} else {
					user.tvShows.push(id);
				}

				await user.save();

				return res
					.status(200)
					.json({ message: "Item added successfully.", user });
			} else {
				return res.status(400).json({ message: "Invalid ID." });
			}
		} else {
			return res.status(400).json({ message: "Invalid content type." });
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal server error." });
	}
});

router.post("/remove", async (req, res) => {
	const { userId, content_type, id } = req.body;

	try {
		const user = await SavedModel.findOne({ userId: userId });

		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		if (content_type === "movie" || content_type === "tv") {
			if (typeof id === "number" && !isNaN(id)) {
				if (content_type === "movie") {
					// Remove the ID from the "movies" array
					user.movies = user.movies.filter((movieId) => movieId !== id);
				} else {
					// Remove the ID from the "tvShows" array
					user.tvShows = user.tvShows.filter((tvShowId) => tvShowId !== id);
				}

				await user.save();

				return res
					.status(200)
					.json({ message: "Item removed successfully.", user });
			} else {
				return res.status(400).json({ message: "Invalid ID." });
			}
		} else {
			return res.status(400).json({ message: "Invalid content type." });
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal server error." });
	}
});

router.get("/getUserDetails", async (req, res) => {
	const userId  = req.query.userId; 
	try {
		// Find the user with the specified userId
		const user = await SavedModel.findOne({ userId });

		if (!user) {
			// If the user is not found, return an empty object
			return res.json({ message: "User not found." });
		}

		// Return the user's movie and TV details
		res.json({ movies: user.movies, tvShows: user.tvShows });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

export { router as savedRouter };

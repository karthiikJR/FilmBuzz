const API = import.meta.env.VITE_TMDB_API_KEY;

async function Requests(media, type) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/${media}/${type}?api_key=${API}`
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		return data.results;
	} catch (error) {
		// Handle errors (e.g., network errors, API errors)
		console.error("Error in Requests:", error);
		throw error; // Rethrow the error to handle it further up the call stack
	}
}

export default Requests;

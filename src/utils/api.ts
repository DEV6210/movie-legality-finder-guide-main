// ✅ OMDB API constants
export const OMDB_API_KEY = "c54d8190";
export const OMDB_BASE_URL = "https://www.omdbapi.com"; // Use HTTPS

// ✅ Types
export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}

export interface SearchResult {
  Search?: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

// ✅ Shared utility to fetch from OMDB
const fetchFromOMDB = async (queryParams: string): Promise<any> => {
  try {
    const res = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&${queryParams}`);
    if (!res.ok) throw new Error("Failed to fetch data from OMDB API");
    return await res.json();
  } catch (error) {
    console.error("OMDB API Error:", error);
    return { Response: "False", Error: "API call failed" };
  }
};

// 🔍 Search movies by title
export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<SearchResult> => {
  const queryParams = `s=${encodeURIComponent(query)}&page=${page}`;
  return await fetchFromOMDB(queryParams);
};

// 🎬 Get full details by IMDb ID
export const getMovieById = async (imdbId: string): Promise<MovieDetails> => {
  const queryParams = `i=${imdbId}&plot=full`;
  const result = await fetchFromOMDB(queryParams);

  // Provide fallback values if API fails
  return result.Response === "True"
    ? result
    : ({
        Title: "",
        Year: "",
        Rated: "",
        Released: "",
        Runtime: "",
        Genre: "",
        Director: "",
        Writer: "",
        Actors: "",
        Plot: "",
        Language: "",
        Country: "",
        Awards: "",
        Poster: "",
        Ratings: [],
        Metascore: "",
        imdbRating: "",
        imdbVotes: "",
        imdbID: imdbId,
        Type: "",
        Response: "False",
      } as MovieDetails);
};

// 🔍 Search with type filter (movie, series, episode)
export const searchMoviesByType = async (
  query: string,
  type: "movie" | "series" | "episode" = "movie",
  page: number = 1
): Promise<SearchResult> => {
  const queryParams = `s=${encodeURIComponent(query)}&type=${type}&page=${page}`;
  return await fetchFromOMDB(queryParams);
};
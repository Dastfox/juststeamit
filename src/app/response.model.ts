export interface ApiResponse {
	count: number;
	next: string;
	previous: string;
	results: {
		id: number;
		url: string;
		Imdb_url: string;
		title: string;
		year: 1894;
		imdb_score: string;
		votes: 154;
		image_url: string;
		directors: string[];
		actors: string[];
		writers: string[];
		genres: [];
	}[];
}

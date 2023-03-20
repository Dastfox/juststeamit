export interface ApiResponse {
	count: number;
	next: string;
	previous: string;
	results: Movie[];
}

export interface Movie {
	id: number;
	url: string;
	imdb_url: string;
	title: string;
	year: number;
	imdb_score: string;
	votes: number;
	image_url: string;
	directors: string[];
	actors: string[];
	duration: number;
	writers: string[];
	genres: [];
	countries: string[];
	worldwide_gross_income: string;
	description: string;
	date_published: string;
	long_description: string;
}

export interface ImageForCarrousel {
	image: string;
	thumbImage: string;
	alt: string;
	title?: string;
	order?: number;
	movie_id: number;
	score: number;
}

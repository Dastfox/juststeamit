export interface ApiResponse {
	count: number;
	next: string;
	previous: string;
	results: Movie[];
}

export interface Movie {
	id: number;
	url: string;
	Imdb_url: string;
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

// {
// 	image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
// 	thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
// 	title: 'Image title', //Optional: You can use this key if want to show image with title
// 	alt: 'Image alt', //Optional: You can use this key if want to show image with alt
// 	order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
// }

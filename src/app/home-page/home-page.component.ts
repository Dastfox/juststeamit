import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { ApiResponse, Movie, ImageForCarrousel } from '../api.models';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { HeaderComponent } from '../header/header.component';
import { ApiPullService } from '../services/api-pull.service';

const GENRES = [
	'adventure',
	'animation',
	'comedy',
	'crime',
	'drama',
	'fantasy',
	'history',
	'horror',
	'music',
	'mystery',
	'romance',
	'sci-fi',
	'sport',
	'thriller',
	'war',
	'western',
];

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	imports: [CommonModule, HeaderComponent, CarrouselComponent],
	standalone: true,
})
export class HomePageComponent {
	isLoading = true;
	releases = [];
	subscribeActive = true;
	films: any;
	movies: Movie[] = [];
	imagesBest: ImageForCarrousel[] = [];
	imagesBestByCategory1: ImageForCarrousel[] = [];
	imagesBestByCategory2: ImageForCarrousel[] = [];
	imagesBestByCategory3: ImageForCarrousel[] = [];
	titleCat1: string = '';
	titleCat2: string = '';
	titleCat3: string = '';
	genres: string[] = [];

	constructor(private apiPullService: ApiPullService) {
		const genres = this._getGenres();
		this.titleCat1 = this._capitalizeFirstLetter(genres[0]);
		this.titleCat2 = this._capitalizeFirstLetter(genres[1]);
		this.titleCat3 = this._capitalizeFirstLetter(genres[2]);

		// load best films
		this.apiPullService
			.loadBestFilms()
			.pipe(
				map((apiResponse) => apiResponse.slice(1, 8)),
				map((movies) => {
					return movies.reduce((images: ImageForCarrousel[], movie, idx) => {
						const image: ImageForCarrousel = {
							order: idx + 1,
							alt: movie.title,
							image: movie.image_url,
							thumbImage: movie.image_url,
							movie_id: movie.id,
							score: parseFloat(movie.imdb_score),
						};
						return [...images, image];
					}, []);
				}),
				tap((images) => {
					this.imagesBest = images.sort((a, b) => a.score - b.score);
				})
			)
			.subscribe();

		// load best films by category
		this.apiPullService
			.loadBestFilmsByGenre(this.titleCat1)
			.pipe(
				map((apiResponse) => apiResponse.slice(0, 7)),
				map((movies) => {
					return movies.reduce((images: ImageForCarrousel[], movie, idx) => {
						const image: ImageForCarrousel = {
							order: idx + 1,
							alt: movie.title,
							image: movie.image_url,
							thumbImage: movie.image_url,
							movie_id: movie.id,
							score: parseFloat(movie.imdb_score),
						};
						return [...images, image];
					}, []);
				}),
				tap((images) => {
					this.imagesBestByCategory1 = images.sort((a, b) => a.score - b.score);
				})
			)
			.subscribe();

		this.apiPullService
			.loadBestFilmsByGenre(this.titleCat2)
			.pipe(
				map((apiResponse) => apiResponse.slice(0, 7)),
				map((movies) => {
					console.log('res', { movies });
					return movies.reduce((images: ImageForCarrousel[], movie, idx) => {
						const image: ImageForCarrousel = {
							order: idx + 1,
							alt: movie.title,
							image: movie.image_url,
							thumbImage: movie.image_url,
							movie_id: movie.id,
							score: parseFloat(movie.imdb_score),
						};
						return [...images, image];
					}, []);
				}),
				tap((images) => {
					this.imagesBestByCategory2 = images.sort((a, b) => a.score - b.score);
				})
			)
			.subscribe();

		this.apiPullService
			.loadBestFilmsByGenre(this.titleCat3)
			.pipe(
				map((apiResponse) => apiResponse.slice(0, 7)),
				map((movies) => {
					console.log('res', { movies });
					return movies.reduce((images: ImageForCarrousel[], movie, idx) => {
						const image: ImageForCarrousel = {
							order: idx + 1,
							alt: movie.title,
							image: movie.image_url,
							thumbImage: movie.image_url,
							movie_id: movie.id,
							score: parseFloat(movie.imdb_score),
						};
						return [...images, image];
					}, []);
				}),
				tap((images) => {
					console.log('Genre', images);
					this.imagesBestByCategory3 = images.sort((a, b) => a.score - b.score);
					console.log('imagesBestByCategory3', this.imagesBestByCategory3);
				})
			)
			.subscribe();
	}

	private _getGenres() {
		let result = this.genres.slice(0, 3);
		if (result.length < 3) {
			let unusedGenres;
			while (result.length < 3) {
				unusedGenres = GENRES.filter((genre) => !result.includes(genre) || !this.genres.includes(genre));
				const randomIndex = Math.floor(Math.random() * unusedGenres.length);
				const genre = unusedGenres[randomIndex];
				result.push(genre);
			}
		}
		return result;
	}

	private _capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}

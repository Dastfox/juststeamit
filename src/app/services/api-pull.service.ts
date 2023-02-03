import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { ApiResponse, Movie } from '../api.models';
import { serviceUrl } from './api';

export const PARAMETERS = {
	main: serviceUrl + '/api/v1/titles/',
	pageSelector: 'page=',
	sortBy: {
		score: 'sort_by=-imdb_score',
	},
};
//http://localhost:8000/api/v1/titles/499549 example of movie pull
@Injectable({
	providedIn: 'root',
})
export class ApiPullService {
	makeGenreParam(genre?: string): string {
		return '&genre=' + genre;
	}

	constructor(private httpClient: HttpClient) {}
	loadBestFilms(pages: number = 2): Observable<Movie[]> {
		const p = PARAMETERS;
		let ObservableList: Observable<ApiResponse>[] = [
			this.httpClient.get<ApiResponse>(p.main + '?' + p.pageSelector + +'1' + '&' + p.sortBy.score),
			this.httpClient.get<ApiResponse>(p.main + '?' + p.pageSelector + '2' + '&' + p.sortBy.score),
		];

		return forkJoin(ObservableList).pipe(
			map((apiResponses) => {
				let allResults: Movie[] = [];
				apiResponses.forEach((response) => (allResults = allResults.concat(response.results)));
				return allResults;
			})
		);
	}

	getMovieById(id: string): Observable<Movie> {
		return this.httpClient.get<Movie>(PARAMETERS.main + id);
	}

	loadBestFilmsByGenre(parameter?: string): Observable<Movie[]> {
		let genre = '';
		if (parameter) {
			genre = this.makeGenreParam(parameter);
		} else {
			genre = '';
		}
		const returnedGenre = this.makeGenreParam(parameter);
		const p = PARAMETERS;
		console.log('p', genre);
		let ObservableList: Observable<ApiResponse>[] = [
			this.httpClient.get<ApiResponse>(p.main + '?' + p.pageSelector + +'1' + genre + '&' + p.sortBy.score),
			this.httpClient.get<ApiResponse>(p.main + '?' + p.pageSelector + '2' + genre + '&' + p.sortBy.score),
		];

		return forkJoin(ObservableList).pipe(
			map((apiResponses) => {
				let allResults: Movie[] = [];
				apiResponses.forEach((response) => (allResults = allResults.concat(response.results)));
				return allResults;
			})
		);
	}
}

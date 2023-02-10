import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { ApiResponse, Movie, ImageForCarrousel } from '../api.models';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { HeaderComponent } from '../header/header.component';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { ApiPullService } from '../services/api-pull.service';

const GENRES = [
	'Adventure',
	'Animation',
	'Comedy',
	'Crime',
	'Drama',
	'Fantasy',
	'History',
	'Horror',
	'Music',
	'Mystery',
	'Romance',
	'Sci-fi',
	'Sport',
	'Thriller',
	'War',
	'Western',
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
	bestMovie: ImageForCarrousel = {} as ImageForCarrousel;
	genres: string[] = [];
	allGenres = GENRES;

	constructor(public dialog: MatDialog) {
		const genresConst = this._getGenres();
		this.genres = genresConst;
	}

	private _getGenres() {
		let result = this.genres.slice(0, 3);
		if (result.length < 4) {
			let unusedGenres;
			result[0] = 'Best Movies';
			while (result.length < 4) {
				unusedGenres = GENRES.filter((genre) => !result.includes(genre) && !this.genres.includes(genre));
				const randomIndex = Math.floor(Math.random() * unusedGenres.length);
				const genre = unusedGenres[randomIndex];
				result.push(genre);
			}
		}
		console.log(result);
		return result;
	}

	public imageClick(image: ImageForCarrousel): void {
		console.log(image);
		if (image) {
			this.dialog.open(InfoModalComponent, { data: { id: image.movie_id }, autoFocus: false });
		}
	}
}

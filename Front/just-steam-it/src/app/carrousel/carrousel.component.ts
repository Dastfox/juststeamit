import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NgImageSliderModule } from 'ng-image-slider';
import { ImageForCarrousel, Movie } from '../api.models';
import { ApiPullService } from '../services/api-pull.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-carrousel',
	standalone: true,
	imports: [
		CommonModule,
		NgImageSliderModule,
		MatOptionModule,
		MatSelectModule,
		MatFormFieldModule,
		FormsModule,
		MatIconModule,
	],
	templateUrl: './carrousel.component.html',
	styleUrls: ['./carrousel.component.scss'],
})
export class CarrouselComponent implements AfterViewInit {
	_movies: Movie[] = [];
	modal: boolean = false;
	searchBool: boolean = false;
	@Output() imageEvent = new EventEmitter<ImageForCarrousel>();

	@Input() options?: string[];

	private _category: string | undefined;

	get category(): string | undefined {
		return this._category;
	}
	@Input()
	set category(value: string | undefined) {
		this._category = value;
		this._loadBestFilmsByCategory(value);
	}

	public images: ImageForCarrousel[] = [];

	constructor(private apiPullService: ApiPullService, public dialog: MatDialog) {
		// load best films
	}

	ngAfterViewInit(): void {
		if (this.category === 'Best Movies') {
			this._loadBestFilms();
		} else {
			this._loadBestFilmsByCategory(this.category);
		}
	}

	private _loadBestFilms() {
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
					this.images = images.sort((a, b) => a.score - b.score);
				})
			)
			.subscribe();
	}
	private _loadBestFilmsByCategory(category?: string) {
		console.log('category', category);
		this.apiPullService
			.loadBestFilmsByGenre(category)
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
					this.images = images.sort((a, b) => a.score - b.score);
				})
			)
			.subscribe();
	}

	public processImageEvent(index: number) {
		const image = this.images[index];
		this.imageEvent.emit(image);
	}

	switchSearch() {
		this.searchBool = !this.searchBool;
	}
}

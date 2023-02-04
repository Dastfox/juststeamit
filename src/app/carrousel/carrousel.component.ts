import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgImageSliderModule } from 'ng-image-slider';
import { ImageForCarrousel, Movie } from '../api.models';
import { ApiPullService } from '../services/api-pull.service';

@Component({
	selector: 'app-carrousel',
	standalone: true,
	imports: [CommonModule, NgImageSliderModule],
	templateUrl: './carrousel.component.html',
	styleUrls: ['./carrousel.component.scss'],
})
export class CarrouselComponent implements AfterViewInit {
	_movies: Movie[] = [];
	modal: boolean = false;
	@Output() imageEvent = new EventEmitter<ImageForCarrousel>();

	private _title: string | undefined;
	@Input()
	set title(value: string | undefined) {
		this._title = value;
	}

	get title(): string | undefined {
		if (this._title === undefined) {
			return 'Films';
		}
		return this._title;
	}

	private _images: ImageForCarrousel[] = [];
	@Input()
	set images(value: ImageForCarrousel[]) {
		this._images = value;
	}

	get images(): ImageForCarrousel[] {
		return this._images;
	}

	constructor(private apiPullService: ApiPullService, public dialog: MatDialog) {}

	ngAfterViewInit(): void {}

	processImageEvent(index: number) {
		const image = this.images[index];
		this.imageEvent.emit(image);
	}
	// public imageClick(index: number): void {
	// 	console.log(this.images[index]);
	// 	if (this.images[index]) {
	// 		this.dialog.open(InfoModalComponent, { data: { id: this.images[index].movie_id }, autoFocus: false });
	// 	}
	// }
}

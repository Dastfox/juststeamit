import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ModalService } from './info-modal.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ImageForCarrousel, Movie } from '../api.models';
import { ApiPullService } from '../services/api-pull.service';

@Component({
	selector: 'app-info-modal',
	templateUrl: './info-modal.component.html',
	styleUrls: ['./info-modal.component.scss'],
	imports: [MatDialogModule, MatIconModule, CommonModule, MatDividerModule],
	standalone: true,
})
export class InfoModalComponent {
	@Input() id?: string;
	movie: Movie = {} as Movie;
	extended: boolean = false;

	constructor(
		public dialogRef: MatDialogRef<InfoModalComponent>,
		private _apiPullService: ApiPullService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this._apiPullService.getMovieById(data.id).subscribe((data) => {
			this.movie = data;
		});
	}

	extend() {
		this.extended = !this.extended;
	}
	setDefaultImage(event: any) {
		event.target.src = 'assets/logocard.png';
	}
}

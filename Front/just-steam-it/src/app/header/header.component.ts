import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ImageForCarrousel } from '../api.models';
import { MatButtonModule } from '@angular/material/button';
import { ApiPullService } from '../services/api-pull.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	imports: [MatDividerModule, MatButtonModule],
	standalone: true,
})
export class HeaderComponent implements OnInit {
	@Output() imageEvent = new EventEmitter<ImageForCarrousel>();

	public image: ImageForCarrousel = {} as ImageForCarrousel;

	constructor(private _apiPullService: ApiPullService) {
		console.log('HeaderComponent', this.image);
		this._apiPullService.loadBestFilm().subscribe((movie) => {
			this.image = {
				order: 1,
				alt: movie.title,
				image: movie.image_url,
				thumbImage: movie.image_url,
				movie_id: movie.id,
				score: parseFloat(movie.imdb_score),
			};
		});
	}

	processImage() {
		this.imageEvent.emit(this.image);
	}

	ngOnInit(): void {}
}

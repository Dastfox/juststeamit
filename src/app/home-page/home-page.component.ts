import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { HeaderComponent } from '../header/header.component';
import { ApiPullService } from '../services/api-pull.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	imports: [CommonModule, HeaderComponent, CarrouselComponent],
	standalone: true,
})
export class HomePageComponent implements OnInit {
	isLoading = true;
	releases = [];
	subscribeActive = true;
	films: any;

	constructor(private apiPullService: ApiPullService, private router: Router) {}

	ngOnInit() {
		this.apiPullService
			.loadFilms()
			.pipe(
				tap((response) => {
					console.log(response.results);
					this.films = response;
					this.isLoading = false;
				})
			)
			.subscribe();
	}
}

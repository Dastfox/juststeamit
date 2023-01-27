import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgImageSliderModule } from 'ng-image-slider';

@Component({
	selector: 'app-carrousel',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './carrousel.component.html',
	styleUrls: ['./carrousel.component.scss'],
})
export class CarrouselComponent implements OnInit {
	squares = [1, 2, 3, 4, 5, 7, 8, 9];

	constructor() {}

	ngOnInit() {}
}

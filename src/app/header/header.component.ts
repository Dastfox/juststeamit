import { Component, Input, OnInit } from '@angular/core';
import { ImageForCarrousel } from '../api.models';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: true,
})
export class HeaderComponent implements OnInit {
	constructor() {}

	@Input() images: ImageForCarrousel[] = [];

	ngOnInit(): void {}
}

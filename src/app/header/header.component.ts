import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ImageForCarrousel } from '../api.models';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	imports: [MatDividerModule, MatButtonModule],
	standalone: true,
})
export class HeaderComponent implements OnInit {
	@Input() image: ImageForCarrousel = {} as ImageForCarrousel;
	@Output() imageEvent = new EventEmitter<ImageForCarrousel>();

	constructor() {
		console.log('HeaderComponent', this.image);
	}

	processImage() {
		this.imageEvent.emit(this.image);
	}

	ngOnInit(): void {}
}

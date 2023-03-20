import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageForCarrousel } from './api.models';
import { InfoModalComponent } from './info-modal/info-modal.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'just-steam-it';
	constructor(public dialog: MatDialog) {}
	public imageClick(): void {
		this.dialog.open(InfoModalComponent, { data: { id: '6735740' }, autoFocus: false });
	}
}

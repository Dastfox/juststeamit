import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serviceUrl } from './api';
import { Observable } from 'rxjs';
import { ApiResponse } from '../response.model';

@Injectable({
	providedIn: 'root',
})
export class ApiPullService {
	constructor(private httpClient: HttpClient) {}

	loadFilms(): Observable<ApiResponse> {
		return this.httpClient.get<ApiResponse>(`${serviceUrl}/api/v1/titles/`);
	}
}

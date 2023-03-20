import { TestBed } from '@angular/core/testing';

import { ApiPullService } from './api-pull.service';

describe('ApiPullServiceService', () => {
	let service: ApiPullService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ApiPullService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

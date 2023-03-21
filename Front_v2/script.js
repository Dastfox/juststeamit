const MAIN_URL = 'http://localhost:8000/api/v1/titles/';

///////////////////////////////
//                           //
//  Server logic functions   //
//                           //
///////////////////////////////

/**
 * Fetches the best movie from the API and displays it on the home page
 */
function fetchBestMovie() {
	let bestTitle = document.getElementById('top-title');
	let bestImg = document.getElementsByClassName('best-cover')[0].getElementsByTagName('img')[0];
	let bestButton = document.getElementsByClassName('button')[0];

	fetch(MAIN_URL + '?sort_by=-imdb_score')
		.then((response) => response.json())
		.then((data) => {
			bestTitle.innerHTML = data['results'][0]['title'];
			bestImg.src = data['results'][0]['image_url'];
			bestButton.setAttribute('onclick', `openModal("${data['results'][0]['id']}")`);
		});
}

/**
 *  Fetches the movies from the API and displays them on the home page
 * @param {*} id  - id of the movie to be displayed
 */
function openModal(id) {
	let modal = document.getElementById('modal');
	let span = document.getElementsByClassName('close')[0];

	fetchModalData(id);
	modal.style.display = 'block';
	span.onclick = function () {
		modal.style.display = 'none';
	};
	window.onclick = function (event) {
		if (event.target === modal) modal.style.display = 'none';
	};
}

/**
 *  Fetches the data of the movie to be displayed in the modal
 * @param {*} id  - id of the movie to be displayed
 */
async function fetchModalData(id) {
	try {
		const response = await fetch(MAIN_URL + id);
		const data = await response.json();
		let modalBoxOffice = document.getElementById('modal-box-office');
		if (data['worldwide_gross_income'] == null) {
			modalBoxOffice.innerHTML = 'No known box office';
		} else {
			modalBoxOffice.innerHTML = data['worldwide_gross_income'] + ' ' + data['budget_currency'];
		}

		if (data['long_description'].length > 5) {
			document.getElementById('modal-desc').innerHTML = data['long_description'];
		} else {
			document.getElementById('modal-desc').innerHTML = 'no description';
		}

		document.getElementById('modal-cover').src = data['image_url'];
		document.getElementById('modal-genres').innerHTML = data['genres'];
		document.getElementById('modal-title').innerHTML = data['title'];
		document.getElementById('modal-year').innerHTML = data['year'];
		document.getElementById('modal-duration').innerHTML = data['duration'] + ' min';
		document.getElementById('modal-directors').innerHTML = data['directors'];
		document.getElementById('modal-imdb').innerHTML = data['imdb_score'] + ' / 10';
		document.getElementById('modal-cast').innerHTML = data['actors'];
		document.getElementById('modal-country').innerHTML = data['countries'];
	} catch (error) {
		console.error('Error fetching modal data:', error);
	}
}

/**
 *  Fetches the movies from the API and displays them on the home page
 * @param {*} category
 * @param {*} skip
 * @param {*} total
 * @returns
 */
async function fetchCategories(category, skip, total = 7) {
	const results = await fetch(MAIN_URL + '?sort_by=-imdb_score&genre=' + category);

	if (!results.ok) return;
	const data = await results.json();
	let moviesData = Array(...data.results);

	if (skip > 0) moviesData.splice(0, skip);

	if (moviesData.length < total) {
		let results2 = await (await fetch(data.next)).json();
		moviesData.push(...Array(...results2.results).slice(0, total - moviesData.length));
	}

	return moviesData;
}

///////////////////////////////
//                           //
//  DOM manipulation logic   //
//                           //
///////////////////////////////

/**
 *  Moves the carousel to the left
 * @param {*} category  - category of the carousel
 */
const moveCarouselLeft = (category) => {
	const carouselContent = document.querySelector(`#${category}-movies`);
	const carouselLeftBtn = document.querySelector(`#${category}-left`);
	const carouselRightBtn = document.querySelector(`#${category}-right`);

	carouselContent.style.left = '-680px';
	carouselRightBtn.classList.remove('show');
	carouselLeftBtn.classList.add('show');
};

/**
 *  Moves the carousel to the right
 * @param {*} category  - category of the carousel
 */
const moveCarouselRight = (category) => {
	const carouselContent = document.querySelector(`#${category}-movies`);
	const carouselLeftBtn = document.querySelector(`#${category}-left`);
	const carouselRightBtn = document.querySelector(`#${category}-right`);

	carouselContent.style.left = '0px';
	carouselRightBtn.classList.add('show');
	carouselLeftBtn.classList.remove('show');
};

/**
 *  Builds the carousel
 * @param {*} category  - category of the carousel
 * @param {*} skip  - number of movies to skip
 */
async function buildCarousel(category, skip = 0) {
	// create DOM elements
	const section = document.createElement('section');
	section.classList.add('categories');

	const carousel = document.createElement('div');
	carousel.classList.add('container');
	const categoryTitle = document.createElement('h2');
	categoryTitle.innerHTML = `${category} movies`;
	const carouselContainer = document.createElement('div');
	carouselContainer.classList.add('carousel-container');
	const carouselContent = document.createElement('div');
	carouselContent.classList.add('carousel-content');
	carouselContent.setAttribute('id', `${category}-movies`);
	const controls = document.createElement('div');
	controls.classList.add('controls');
	const leftButton = document.createElement('button');
	leftButton.classList.add('arrowContainer', 'left');
	leftButton.setAttribute('aria-label', `${category} slide left`);
	leftButton.setAttribute('id', `${category}-left`);
	leftButton.addEventListener('click', () => moveCarouselRight(category));
	leftButton.innerHTML = '<div class="arrow left"></div>';
	const rightButton = document.createElement('button');
	rightButton.classList.add('arrowContainer', 'right', 'show');
	rightButton.setAttribute('id', `${category}-right`);
	rightButton.setAttribute('aria-label', `${category} slide right`);
	rightButton.addEventListener('click', () => moveCarouselLeft(category));
	rightButton.innerHTML = '<div class="arrow right"></div>';

	// fetch movies and append to DOM
	try {
		const movies = await fetchCategories(category === 'Best-movies' ? '' : category, skip);
		console.log(movies);
		movies.forEach((movie, i) => {
			const movieContainer = document.createElement('div');
			movieContainer.setAttribute('id', `${category}${i + 1}`);
			movieContainer.classList.add('movieContainer');
			const movieCover = document.createElement('img');
			movieCover.setAttribute('alt', movie.title);
			movieCover.setAttribute('onclick', `openModal("${movie.id}")`);
			movieCover.src = movie.image_url;
			movieContainer.appendChild(movieCover);
			carouselContent.appendChild(movieContainer);
		});
	} catch (error) {
		console.error(`Failed to fetch movies for category "${category}":`, error);
		carouselContent.innerHTML = '<p>Failed to load movies. Please try again later.</p>';
	}

	// assemble DOM elements
	carouselContainer.appendChild(carouselContent);
	controls.appendChild(leftButton);
	controls.appendChild(rightButton);
	carouselContainer.appendChild(controls);
	carousel.appendChild(categoryTitle);
	carousel.appendChild(carouselContainer);
	section.appendChild(carousel);
	document.querySelector('.carousels').appendChild(section);
}

const GENRES = ['Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Sci-fi', 'Sport', 'Thriller', 'War', 'Western'];

/**
 * Fetches the best movie from the API and displays it on the home page
 * its async to wait for the best movie section to be fetched before building the other carousels
 */
window.addEventListener('load', async () => {
	// buildCarousel('Best-movies', 1);

	const randomGenres = [];
	while (randomGenres.length < 3) {
		const randomGenre = GENRES[Math.floor(Math.random() * GENRES.length)];
		if (!randomGenres.includes(randomGenre)) {
			randomGenres.push(randomGenre);
		}
	}
	await buildCarousel('Best-movies', 1);
	// buildCarousel(randomGenres[0]);
	buildCarousel('Western');
	buildCarousel(randomGenres[1]);
	buildCarousel(randomGenres[2]);

	fetchBestMovie();
});

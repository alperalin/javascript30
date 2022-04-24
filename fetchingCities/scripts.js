/* DATA SCHEMA
city: "New York"
growth_from_2000_to_2013: "4.8%"
latitude: 40.7127837
longitude: -74.0059413
population: "8405837"
rank: "1"
state: "New York"
*/

const endpoint =
	'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const formEl = document.querySelector('.form');
const inputEl = formEl.querySelector('.form__input');
const cityDiv = document.querySelector('.cityContent');

// With Async await
async function getCities() {
	return await fetch(endpoint).then((response) => response.json());
}

// With Async await
getCities()
	.then((data) => {
		cities.push(...data);
	})
	.catch((error) => console.log(error));

// With Promise
// function getProCities() {
// 	return new Promise(function (resolve, reject) {
// 		resolve(fetch(endpoint));
// 		reject('Oh no');
// 	});
// }

// With Promise
// getProCities()
// 	.then((response) => response.json())
// 	.then((data) => {
// 		cities.push(...data);
// 	})
// 	.catch((error) => console.log(error));

// Array Reducer Function
// function reducer(acc, curr) {
// 	acc[curr.city] = { ...curr };
// 	return acc;
// }

// Within an Object
// getCities()
// 	.then((data) => {
// 		cities = response.reduce(reducer, cities);
// 	})
// 	.catch((error) => console.log(error));

function handleSubmit(event) {
	event.preventDefault();
}

function handleInput(event) {
	const inputVal = event.currentTarget.value;

	// With an Object
	// const city = cities.hasOwnProperty(inputVal) && cities[inputVal];
	// if (city) cityDiv.textContent = `${city.city} - ${city.population}`;

	if (inputVal) {
		const regex = new RegExp(inputVal, 'gi');

		const cityList = cities.filter((place) => place.city.match(regex));

		cityDiv.textContent = '';

		if (cityList) {
			cityList.forEach((item) => {
				const cityName = item.city.replace(
					regex,
					`<span class="hl">${inputVal}</span>`
				);

				const stateName = item.state.replace(
					regex,
					`<span class="hl">${inputVal}</span>`
				);

				cityDiv.insertAdjacentHTML(
					'beforeend',
					`<div class='city'>
						<span>${cityName}, ${stateName}</span> 
						<span>${item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
					</div>`
				);
			});
		}
	} else {
		cityDiv.textContent = '';
	}
}

inputEl.addEventListener('keyup', handleInput);
formEl.addEventListener('submit', handleSubmit);

/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
class Temp extends HTMLElement {

	connectedCallback() {
		let shadowRoot = this.attachShadow({mode: 'open'});

		let renderingContext = this.getAttribute('renderingContext');
		let hourly = this.hasAttribute('hourly');
		let summary = this.hasAttribute('summary');
		let latitude = this.getAttribute('latitude');
		let longitude = this.getAttribute('longitude');

		const myHeaders = new Headers();

		const myInit = { method: 'GET',
			headers: myHeaders,
			mode: 'cors'};

		shadowRoot.innerHTML=`
			<style>
			@keyframes pulse {
			  50% {
				background: black;
			  }
			}

			.loading {
				margin: 20px auto;
			 	position: relative;
			  	width: 6px;
			  	height: 24px;
			  	animation: pulse 750ms infinite;
			  	animation-delay: 250ms;
			}
			.loading:before, .loading:after {
			  	content: '';
			  	position: absolute;
			  	display: block;
			  	height: 16px;
			  	width: 6px;
			  	top: 50%;
			  	transform: translateY(-50%);
			  	animation: pulse 750ms infinite;
			}
			.loading:before {
			  	left: -12px;
			}
			.loading:after {
			  	left: 12px;
			  	animation-delay: 500ms;
			}

			h1 {
				text-align: center;
			}
			</style>
			<div class="loading">
				Loading Forecast data
			</div>`;

			fetch(`https://api.weather.gov/points/${latitude},${longitude}`, myInit).then((res) => {
				return res.json();
			}).then((data) => {
				const city = data.properties.relativeLocation.properties.city;
				const state = data.properties.relativeLocation.properties.state;
				shadowRoot.innerHTML = `
					<style>
						.time strong {
							color: blue;
							}
						.tempcontainer {
							width: 75px;
							height: 40px;
							border: 1px solid #000000;
							border-radius: 5px;
							background-color: #000000;
							color: white;
							text-align: center;
							font-size: 2em;
							padding: 5px;
							font-family: 'Roboto', sans-serif;
							margin: 20px auto;
							background-image: url('https://api.weather.gov/icons/land/night/rain,90?size=medium');
						}
						.temp {
							display: inline-block;
							vertical-align: middle;
						}
						.unit {
							font-size: .55em;
							vertical-align: text-top;

						}
						.forecast-container {
							padding: 10px;
							display: inline-block;
						}

						p {
							text-align: center
						}

						h1, h2 {
							text-align: center;
						}

						.wrapper {
							width: fit-content;
							margin: 0 auto;
						}
					</style>
					<h1>${city}, ${state}</h1>
				`;
			}).then(function(){

				if (hourly) {
					shadowRoot.innerHTML += `
						<h2>Hourly forecast</h2>
						`;

						fetch(`https://api.weather.gov/points/${latitude},${longitude}/forecast/hourly`, myInit).then((res) => {
							return res.json();
						}).then((data) => {
							const periods = data.properties.periods;
							let index = 0;
							for (index; index < 12; index++) {
								shadowRoot.innerHTML+= `<div class="forecast-container"><p>${new Date(periods[index].startTime).toDateString().substring(0,3)} ${new Date(periods[index].startTime).toLocaleTimeString()} </p><div class="tempcontainer"><span class="temp">${periods[index].temperature}</span><span class="unit">&#176;${periods[index].temperatureUnit}</span></div><p>${periods[index].shortForecast}</p><div>`;
							}
						});
				} else if (summary) {
					//https://api.weather.gov/points/${latitude},${longitude}/forecast
					//get the weather forcast for the selected location.
					fetch(`https://api.weather.gov/points/${latitude},${longitude}/forecast`, myInit).then((res) => {
						return res.json();
					}).then((data) => {
						shadowRoot.innerHTML += `
							<h2>Forecast summary</h2>
							`;
						const periods = data.properties.periods;
						let index = 0;
						for (index; index < 2; index++) {
							shadowRoot.innerHTML+= `<div class="forecast-container"><p>${periods[index].name}</p><div class="tempcontainer"><span class="temp">${periods[index].temperature}</span><span class="unit">&#176;${periods[index].temperatureUnit}</span></div><p>${periods[index].shortForecast}</p><div>`;
						}
					});
				} else {
					//get the weather forcast for the selected location.
					fetch(`https://api.weather.gov/points/${latitude},${longitude}/forecast/hourly`, myInit).then((res) => {
						return res.json();
					}).then((data) => {
						const temp = data.properties.periods[0].temperature;
						const unit = data.properties.periods[0].temperatureUnit;

						shadowRoot.innerHTML += `
							<div class="tempcontainer"><span class="temp">${temp}</span><span class="unit">&#176;${unit}</span></div>
							`;

					});
				}
			}).catch((e) => {
				shadowRoot.innerHTML = `
					<style>
						.error {
							color: red;
						}
					</style>
					<div class="error">Could not load the forecast ${e}</div>
					`;

			});
	}

	constructor() {
		// If you define a ctor, always call super() first!
		// This is specific to CE and required by the spec.
		super();
	}

}

window.customElements.define('temp-component', Temp);

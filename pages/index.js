//getting html elements by their id as consts
const render = document.getElementById("render");
const result = document.getElementById("result");
const calculate = document.getElementById("calculate");

//fetching API, structure was given by the website documentation
const response = fetch(
	"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/san%20salvador/last7days?unitGroup=metric&elements=datetime%2Cname%2Ctemp%2Cicon&include=days&key=SNQGW3UHTFCSCSV33MAG56QKK&contentType=json",
	{
		method: "GET",
		headers: {},
	}
)
	.then((response) => {
		console.log(response);
		if (!response.ok) {
			throw response; //check the http response code and if isn't ok then throw the response as an error
		}

		return response.json(); //parse the result as JSON
	})
	.then((response) => {
		//response now contains parsed JSON ready for use
		processWeatherData(response);
		//event listener for button click
		calculate.addEventListener("click", function (e) {
			gettingHigher(response);
		});
	})
	.catch((errorResponse) => {
		if (errorResponse.text) {
			//additional error information
			errorResponse.text().then((errorMessage) => {
				//errorMessage now returns the response body which includes the full error message
			});
		} else {
			//no additional error information
		}
	});

//shows the temperature info
function processWeatherData(response) {
	var days = response.days;
	console.log(days);
	render.innerHTML = `<div class="row">
    <div class="col-sm-2">
<div class="card">
  <div class="card-body text-black">
    <h5 class="card-title">Fecha: ${days[0].datetime}</h5>
    <p class="card-text">Temperatura: ${days[0].temp} °C</p>
  </div>
</div>
</div>
<div class="col-sm-2">
<div class="card">
  <div class="card-body text-black">
    <h5 class="card-title">Fecha: ${days[1].datetime}</h5>
    <p class="card-text">Temperatura: ${days[1].temp} °C</p>
  </div>
</div>
</div>
<div class="col-sm-2">
<div class="card">
  <div class="card-body text-black">
    <h5 class="card-title">Fecha: ${days[2].datetime}</h5>
    <p class="card-text">Temperatura: ${days[2].temp} °C</p>
  </div>
</div>
</div>
<div class="col-sm-2">
<div class="card">
  <div class="card-body text-black">
    <h5 class="card-title">Fecha: ${days[3].datetime}</h5>
    <p class="card-text">Temperatura: ${days[3].temp} °C</p>
  </div>
</div>
</div>
<div class="col-sm-2">
<div class="card">
  <div class="card-body text-black">
    <h5 class="card-title">Fecha: ${days[4].datetime}</h5>
    <p class="card-text">Temperatura: ${days[4].temp} °C</p>
  </div>
</div>
</div>
<div class="col-sm-2">
<div class="card">
  <div class="card-body text-black">
    <h5 class="card-title">Fecha: ${days[5].datetime}</h5>
    <p class="card-text">Temperatura: ${days[5].temp} °C</p>
  </div>
</div>
</div>
<div class="col-sm-2"></div>
<div class="col-sm-2"></div>
<div class="col-sm-2">
<div class="card">
  <div class="card-body text-black">
    <h5 class="card-title">Fecha: ${days[6].datetime}</h5>
    <p class="card-text">Temperatura: ${days[6].temp} °C</p>
  </div>
</div>
</div>
<div class="col-sm-2">
<div class="card">
  <div class="card-body text-black">
    <h5 class="card-title">Fecha: ${days[7].datetime}</h5>
    <p class="card-text">Temperatura: ${days[7].temp} °C</p>
  </div>
</div>
</div>
</div>`;
}
//gets the higher temperature and shows it
function gettingHigher(response) {
	var days = response.days;
	var maxTemp = 0;

	for (i = 0; i < days.length; i++) {
		if (days[i].temp > maxTemp) {
			maxTemp = days[i].temp;
		}
	}
	console.log(maxTemp);
	result.innerHTML = `<div class="text-center mb-5">La temperatura máxima es: <span class="text-primary"> ${maxTemp} °C</span></div>`;
}

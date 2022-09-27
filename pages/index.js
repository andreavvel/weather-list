fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/san%20salvador/last7days?unitGroup=us&include=days&key=R4MJ285W29V7Z6EU59WLMD6GP&contentType=json", {
  "method": "GET",
  "headers": {
  }
  })
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});


//using the API response
function processWeatherData(response) {
  
    var location=response.resolvedAddress;
    var days=response.days;
    console.log("Location: "+location);
    for (var i=0;i<days.length;i++) {
      console.log(days[i].datetime+": tempmax="+days[i].tempmax+", tempmin="+days[i].tempmin);
    }
  }
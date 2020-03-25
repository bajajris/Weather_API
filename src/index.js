import "./styles.css";

(() => {
  const get = url => {
    return new Promise((resolve, reject) => {
      var apikey = "c6f491916199631ea7b48610d4798e6e";
      var httpRequest = new XMLHttpRequest();
      httpRequest.open("GET", url + "&appid=" + apikey);
      httpRequest.onload = () => {
        if (httpRequest.status === 200) {
          resolve(httpRequest.responseText);
        } else {
          reject(Error(httpRequest.status));
        }
      };
      httpRequest.send();
    });
  };

  const locations = [
    "Toronto,Canada",
    "Sydney,Australia",
    "Delhi,India",
    "Beijing,China",
    "Mumbai,India",
    "Brisbane,Australia",
    "Nigeria,Africa"
  ];

  const urls = locations.map(location => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}`;
  });
  var divBox = document.getElementById("app");

  // Promise.all([get(urls[0]), get(urls[1]), get(urls[2]), get(urls[3])])
  //   .then(results => {
  //     console.log("results");
  //     return results.map(res => {
  //       return updateUISuccess(res);
  //     });
  //   })
  //   .then(result => {
  //     console.log(result);
  //     divBox.innerHTML = `<h1>Hello</h1>${result.join("")}`;
  //   })
  //   .catch(error => {
  //     console.log(error.toString());
  //   });

  (async () => {
    try {
      let responses = [];
      for (var i = 0; i < locations.length; i++) {
        responses.push(await get(urls[i]));
      }

      let literals = responses.map(response => {
        return updateUISuccess(response);
      });

      divBox.innerHTML = `<h1>Weather API</h1>${literals.join("")}`;
    } catch (status) {
      console.log(status);
    }
  })();

  const updateUISuccess = responseText => {
    console.log(responseText);
    var response = JSON.parse(responseText);
    var conditions = response.weather;
    var name = response.name;
    var degC = response.main.temp - 273.15;
    var degCInt = Math.floor(degC);
    var degF = degC * 1.8 + 32;
    var degFInt = Math.floor(degF);
    var displayString = `<p>Weather of ${name}<br>
      <br>Temperature in Celcius:
      ${degCInt}
      <br /> <p>Temperature in Fahrenheit:
      ${degFInt}
      <br />
      ${conditions[0].main}
      <br />
      ${conditions[0].description}`;
    return displayString;
  };
})();

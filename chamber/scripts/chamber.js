const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=40.5622&lon=-111.9297&units=imperial&appid=bffc1268a841c65ca4d168a3ad81c4e5`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) throw Error(await response.text());
    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    console.error("Weather fetch error:", err);
  }
}

function displayWeather(data) {
  const currentTemp = Math.round(data.list[0].main.temp);
  const description = data.list[0].weather[0].description;
  const icon = data.list[0].weather[0].icon;

  document.querySelector("#current-temp").innerHTML = `${currentTemp}°F`;
  document.querySelector("#weather-desc").textContent = description.charAt(0).toUpperCase() + description.slice(1);
  document.querySelector("#weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
  document.querySelector("#weather-icon").setAttribute("alt", description);

  const forecastDiv = document.querySelector("#forecast-content");
  forecastDiv.innerHTML = "<h4>3-Day Forecast</h4>";

  let count = 0;
  for (const item of data.list) {
    if (item.dt_txt.includes("12:00:00") && count < 3) {
      const day = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(item.main.temp);
      forecastDiv.innerHTML += `<p>${day}: ${temp}°F</p>`;
      count++;
    }
  }
}
async function fetchSpotlights() {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw Error(await response.text());
      const members = await response.json();
      displaySpotlights(members);
    } catch (err) {
      console.error("Spotlights fetch error:", err);
    }
}
  
function displaySpotlights(members) {
    const goldSilver = members.filter(m => m.membership === "gold" || m.membership === "silver");
    const shuffled = goldSilver.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
  
    const container = document.querySelector("#spotlights");
    container.innerHTML = "";
  
    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h4>${member.name}</h4>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership: ${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)}</p>
      `;
      container.appendChild(card);
    });
}
fetchWeather();
fetchSpotlights();
